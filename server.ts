import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { dataStore } from './server/dataStore';
import { syncAllFeeds, startThreeHourRssScheduler } from './server/rssService';
import { verifyAndEnhanceNews, translateArticle } from './server/aiService';
import { fetchLiveMarketRates } from './server/marketService';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ----------------------------------------------------
  // API Routes
  // ----------------------------------------------------

  // 1. Get News Articles
  app.get('/api/news', (req, res) => {
    try {
      const { category, search, tag, country, limit, offset } = req.query;
      const result = dataStore.getArticles({
        category: category as string,
        search: search as string,
        tag: tag as string,
        country: country as any,
        limit: limit ? parseInt(limit as string, 10) : 50,
        offset: offset ? parseInt(offset as string, 10) : 0,
      });

      res.json({
        success: true,
        data: result.items,
        total: result.total,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 2. Get Single News Article
  app.get('/api/news/:id', (req, res) => {
    try {
      const article = dataStore.getArticleById(req.params.id);
      if (!article) {
        res.status(404).json({ success: false, error: 'Artículo no encontrado' });
        return;
      }
      res.json({ success: true, data: article });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. Trigger RSS & AI Refresh
  app.post('/api/news/refresh', async (req, res) => {
    try {
      console.log('[API] Manual sync triggered');
      const result = await syncAllFeeds('manual');
      const state = dataStore.getState();
      res.json({
        success: true,
        message: result.totalAdded > 0
          ? `Sincronización completada. Se añadieron ${result.totalAdded} noticias nuevas verificadas de ${result.totalFeeds} fuentes RSS.`
          : `Sincronización completada. No se encontraron noticias nuevas en las ${result.totalFeeds} fuentes en este ciclo.`,
        data: result,
        newArticlesCount: result.totalAdded,
        stats: state.stats,
        lastSyncTime: state.lastSyncTime,
        nextScheduledSync: state.nextScheduledSync,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. Feeds Management
  app.get('/api/feeds', (req, res) => {
    const state = dataStore.getState();
    res.json({
      success: true,
      data: dataStore.getFeeds(),
      stats: state.stats,
      lastSyncTime: state.lastSyncTime,
      nextScheduledSync: state.nextScheduledSync,
      syncIntervalHours: state.syncIntervalHours,
      lastSyncNewArticlesCount: state.lastSyncNewArticlesCount,
      syncHistory: state.syncHistory,
    });
  });

  app.post('/api/feeds', (req, res) => {
    try {
      const { name, url, category, country, reliability } = req.body;
      if (!name || !url) {
        res.status(400).json({ success: false, error: 'Nombre y URL requeridos' });
        return;
      }

      const newFeed = dataStore.addFeed({
        name,
        url,
        category: category || 'rd',
        country: country || 'DO',
        enabled: true,
        reliability: reliability || 'trusted',
      });

      res.status(201).json({ success: true, data: newFeed });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  const handleToggleFeed = (req: express.Request, res: express.Response) => {
    const isEnabled = dataStore.toggleFeed(req.params.id);
    res.json({ success: true, enabled: isEnabled, data: dataStore.getFeeds() });
  };
  app.patch('/api/feeds/:id/toggle', handleToggleFeed);
  app.post('/api/feeds/:id/toggle', handleToggleFeed);

  app.delete('/api/feeds/:id', (req, res) => {
    const deleted = dataStore.deleteFeed(req.params.id);
    res.json({ success: deleted, data: dataStore.getFeeds() });
  });

  // 5. AI Verification on Demand
  app.post('/api/ai/verify', async (req, res) => {
    try {
      const { title, content, sourceName, category } = req.body;
      if (!title || !content) {
        res.status(400).json({ success: false, error: 'Título y contenido requeridos' });
        return;
      }

      const result = await verifyAndEnhanceNews(
        title,
        content,
        sourceName || 'Fuente Externa',
        category || 'rd'
      );
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 6. AI Translation
  app.post('/api/ai/translate', async (req, res) => {
    try {
      const { title, summary, content, targetLang } = req.body;
      if (!title || !targetLang) {
        res.status(400).json({ success: false, error: 'Datos de traducción incompletos' });
        return;
      }

      const translated = await translateArticle(
        title,
        Array.isArray(summary) ? summary : [],
        content || '',
        targetLang
      );
      res.json({ success: true, data: translated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 7. Live Currency & Crypto Market Rates (USD, EUR, CAD, GBP, CHF, Bitcoin, Ethereum, Solana, USDT)
  app.get('/api/market/rates', async (req, res) => {
    try {
      const rates = await fetchLiveMarketRates();
      res.json({ success: true, data: rates });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8. Podcasts & Audio
  app.get('/api/podcasts', (req, res) => {
    res.json({
      success: true,
      data: dataStore.getPodcasts(),
    });
  });

  // 8. Subscription & Newsletter
  app.post('/api/subscribe', (req, res) => {
    const { email, tier, topics } = req.body;
    if (!email || !email.includes('@')) {
      res.status(400).json({ success: false, error: 'Correo electrónico no válido' });
      return;
    }

    res.json({
      success: true,
      message: `¡Suscripción confirmada para ${email}! Recibirás las alertas más destacadas y el boletín matinal.`,
      tier: tier || 'digital_plus',
      email,
      topics: topics || ['rd', 'economia', 'deportes'],
    });
  });

  // 9. System Status & Health
  const handleSystemStatus = (req: express.Request, res: express.Response) => {
    const state = dataStore.getState();
    res.json({
      success: true,
      system: 'El Faro Quisqueya Core v2.0',
      lastSyncTime: state.lastSyncTime,
      nextScheduledSync: state.nextScheduledSync,
      syncIntervalHours: state.syncIntervalHours || 3,
      lastSyncNewArticlesCount: state.lastSyncNewArticlesCount || 0,
      syncHistory: state.syncHistory || [],
      articlesCount: state.articles.length,
      feedsCount: state.feeds.length,
      stats: state.stats,
      data: {
        stats: state.stats,
        lastSyncTime: state.lastSyncTime,
        nextScheduledSync: state.nextScheduledSync,
        syncIntervalHours: state.syncIntervalHours || 3,
        lastSyncNewArticlesCount: state.lastSyncNewArticlesCount || 0,
      },
      aiEngine: process.env.GEMINI_API_KEY ? 'Gemini 3.8 Flash (Active)' : 'Intelligent Heuristics (Fallback)',
    });
  };

  app.get('/api/status', handleSystemStatus);
  app.get('/api/stats', handleSystemStatus);

  // ----------------------------------------------------
  // Vite & Static Asset Handling
  // ----------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Start server
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[El Faro Quisqueya Server] Running on http://0.0.0.0:${PORT}`);
  });

  // Start background 3-hour RSS scheduler
  startThreeHourRssScheduler();

  // Perform initial live sync on startup to pull all current news immediately
  setTimeout(() => {
    console.log('[Startup] Initiating immediate sync of all current live news from RSS feeds...');
    syncAllFeeds('startup')
      .then((res) => {
        console.log(`[Startup] Initial sync completed: ${res.totalAdded} news items added from ${res.totalFeeds} feeds.`);
      })
      .catch((err) => {
        console.error('[Startup] Initial sync encountered an error:', err);
      });
  }, 1000);
}

startServer().catch((err) => {
  console.error('[Server Error]', err);
});
