import React, { useState, useEffect } from 'react';
import { 
  X, Rss, Plus, RefreshCw, ShieldCheck, AlertTriangle, 
  Trash2, ToggleLeft, ToggleRight, CheckCircle, Clock, Zap, Cpu,
  History, Calendar, ArrowUpRight, Check
} from 'lucide-react';
import { RssFeedSource, SyncLogEntry } from '../types';

interface RssConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  feeds: RssFeedSource[];
  stats: {
    totalProcessed: number;
    verifiedPublished: number;
    spamFiltered: number;
    duplicatesMerged: number;
  };
  lastSyncTime: string;
  nextScheduledSync: string;
  syncIntervalHours?: number;
  lastSyncNewArticlesCount?: number;
  syncHistory?: SyncLogEntry[];
  isSyncing: boolean;
  onTriggerSync: () => Promise<void>;
  onToggleFeed: (id: string) => Promise<void>;
  onDeleteFeed: (id: string) => Promise<void>;
  onAddFeed: (feed: { name: string; url: string; category: any; country: 'DO' | 'GLOBAL' }) => Promise<void>;
}

export const RssConfigModal: React.FC<RssConfigModalProps> = ({
  isOpen,
  onClose,
  feeds,
  stats,
  lastSyncTime,
  nextScheduledSync,
  syncIntervalHours = 3,
  lastSyncNewArticlesCount = 0,
  syncHistory = [],
  isSyncing,
  onTriggerSync,
  onToggleFeed,
  onDeleteFeed,
  onAddFeed,
}) => {
  if (!isOpen) return null;

  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('rd');
  const [country, setCountry] = useState<'DO' | 'GLOBAL'>('DO');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');

  // Live countdown to next 3-hour scheduled sync
  useEffect(() => {
    const updateCountdown = () => {
      if (!nextScheduledSync) return;
      const diff = new Date(nextScheduledSync).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft('En proceso o en cualquier instante');
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextScheduledSync]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return;
    setIsSubmitting(true);
    try {
      await onAddFeed({ name, url, category, country });
      setName('');
      setUrl('');
      setShowAddForm(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualSync = async () => {
    setSyncMessage('Comprobando feeds y subiendo noticias actuales si las hay...');
    try {
      await onTriggerSync();
      setSyncMessage('¡Ciclo de comprobación finalizado con éxito! Noticias verificadas y publicadas.');
    } catch (e) {
      setSyncMessage('Error al contactar los servidores de noticias.');
    }
    setTimeout(() => setSyncMessage(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white dark:bg-stone-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 rounded-lg">
              <Rss className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-stone-950 dark:text-stone-50 flex items-center gap-2">
                Motor de Noticias & Programador Cada 3 Horas
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Ingestión automática de noticias actuales de República Dominicana y el mundo cada 3 horas con verificación de IA.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* AI Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700/70 text-center">
              <span className="text-[11px] font-bold text-stone-500 uppercase block mb-1">Procesadas</span>
              <span className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">{stats.totalProcessed}</span>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-center">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase block mb-1 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Verificadas
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-800 dark:text-emerald-200">{stats.verifiedPublished}</span>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-800/60 text-center">
              <span className="text-[11px] font-bold text-red-700 dark:text-red-400 uppercase block mb-1">Spam Filtrado</span>
              <span className="text-xl sm:text-2xl font-black text-red-800 dark:text-red-200">{stats.spamFiltered}</span>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60 text-center">
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 uppercase block mb-1">Duplicadas</span>
              <span className="text-xl sm:text-2xl font-black text-amber-800 dark:text-amber-200">{stats.duplicatesMerged}</span>
            </div>
          </div>

          {/* 3-Hour Automation Schedule Card */}
          <div className="p-4 bg-linear-to-r from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/40 dark:via-stone-900 dark:to-stone-900 rounded-xl border border-amber-300/60 dark:border-amber-700/60 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-sm shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-stone-950 dark:text-stone-50">
                      Ciclo Automático Programado: Cada 3 Horas
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      Activo 24/7
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                    El sistema comprueba todas las fuentes cada 3 horas y sube automáticamente las noticias nuevas si las hay.
                  </p>
                </div>
              </div>

              <button
                onClick={handleManualSync}
                disabled={isSyncing}
                className="px-4 py-2 rounded-lg bg-stone-950 hover:bg-stone-800 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-stone-950 font-bold text-xs flex items-center gap-2 shadow-sm transition disabled:opacity-50 ml-auto sm:ml-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Comprobando...' : 'Comprobar Noticias Nuevas Ahora'}</span>
              </button>
            </div>

            {/* Timing Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-amber-200/50 dark:border-amber-800/40 text-xs">
              <div className="p-2 rounded bg-white/70 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                <span className="text-stone-500 block text-[10px] uppercase font-semibold">Frecuencia del Cron</span>
                <span className="font-bold text-stone-900 dark:text-stone-100">Cada 3 horas (180 min)</span>
              </div>
              <div className="p-2 rounded bg-white/70 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                <span className="text-stone-500 block text-[10px] uppercase font-semibold">Última comprobación</span>
                <span className="font-medium text-stone-800 dark:text-stone-200">
                  {lastSyncTime ? new Date(lastSyncTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Reciente'}
                </span>
              </div>
              <div className="p-2 rounded bg-white/70 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                <span className="text-stone-500 block text-[10px] uppercase font-semibold">Próxima comprobación</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  {timeLeft || 'Calculando...'}
                </span>
              </div>
            </div>
          </div>

          {syncMessage && (
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{syncMessage}</span>
            </div>
          )}

          {/* Sync History Logs */}
          {syncHistory && syncHistory.length > 0 && (
            <div className="p-4 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wide flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-amber-600" />
                  Historial de Ciclos (Comprobaciones y Subida de Noticias)
                </h4>
                <span className="text-[10px] text-stone-500">Últimos eventos</span>
              </div>

              <div className="space-y-1.5 max-h-36 overflow-y-auto text-xs">
                {syncHistory.map((item) => (
                  <div 
                    key={item.id}
                    className="p-2 bg-white dark:bg-stone-800 rounded border border-stone-200/80 dark:border-stone-700/60 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.articlesAdded > 0 ? 'bg-emerald-500' : 'bg-stone-400'}`}></span>
                      <span className="text-stone-500 text-[11px]">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="font-medium text-stone-800 dark:text-stone-200">
                        {item.message}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-700 shrink-0">
                      {item.trigger === 'automatic_3h' ? 'Automático (3h)' : item.trigger === 'manual' ? 'Manual' : 'Arranque'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feeds List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                Fuentes RSS Actuales Integradas ({feeds.length})
              </h4>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3 py-1 rounded text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Fuente RSS</span>
              </button>
            </div>

            {/* Add Feed Form */}
            {showAddForm && (
              <form onSubmit={handleAddSubmit} className="p-4 bg-stone-50 dark:bg-stone-800/80 rounded-xl border border-stone-200 dark:border-stone-700 mb-4 space-y-3">
                <h5 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase">
                  Nueva Fuente de Noticias RSS
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                      Nombre del Medio o Agencia
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Noticias SIN, El Nacional..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                      URL del Feed XML / RSS
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://ejemplo.com/rss.xml"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                      Categoría Primaria
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    >
                      <option value="rd">República Dominicana</option>
                      <option value="mundo">Internacional / Mundo</option>
                      <option value="deportes">Deportes & LIDOM</option>
                      <option value="economia">Economía</option>
                      <option value="opinion">Opinión</option>
                      <option value="tecnologia">Tecnología</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                      Alcance Geográfico
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    >
                      <option value="DO">🇩🇴 República Dominicana</option>
                      <option value="GLOBAL">🌎 Internacional / Global</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1 text-xs rounded text-stone-600 hover:bg-stone-200 dark:hover:bg-stone-700"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-1.5 text-xs font-bold rounded bg-amber-600 hover:bg-amber-700 text-white shadow"
                  >
                    {isSubmitting ? 'Verificando...' : 'Guardar y Probar Feed'}
                  </button>
                </div>
              </form>
            )}

            {/* List of active feeds */}
            <div className="space-y-2.5">
              {feeds.map((feed) => (
                <div
                  key={feed.id}
                  className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700/80 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {feed.country === 'DO' ? '🇩🇴' : '🌎'}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-stone-900 dark:text-stone-100">
                          {feed.name}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                          {feed.category}
                        </span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          feed.status === 'healthy' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-red-100 text-red-800'
                        }`}>
                          {feed.status === 'healthy' ? 'En línea' : 'Error'}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400 font-mono truncate block max-w-sm sm:max-w-md">
                        {feed.url}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleFeed(feed.id)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
                        feed.enabled ? 'bg-emerald-600 text-white' : 'bg-stone-300 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                      }`}
                      title={feed.enabled ? 'Desactivar feed' : 'Activar feed'}
                    >
                      {feed.enabled ? 'Activo' : 'Pausado'}
                    </button>

                    <button
                      onClick={() => onDeleteFeed(feed.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 transition"
                      title="Eliminar fuente"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
