import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Send } from 'lucide-react';
import { NewsArticle } from '../types';

interface SocialShareBarProps {
  article: NewsArticle;
  variant?: 'compact' | 'full';
}

export const SocialShareBar: React.FC<SocialShareBarProps> = ({
  article,
  variant = 'compact',
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/#article-${article.id}` : '';
  const shareText = `📰 ${article.title} - Vía ELINOTICIA`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: shareUrl,
        });
      } catch (err) {
        // user cancelled
      }
    } else {
      handleCopy(e);
    }
  };

  const shareWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareTwitter = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}&hashtags=ELINOTICIA,RDNoticias,Mundo`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareFacebook = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareLinkedIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 text-xs">
        <button
          onClick={shareWhatsApp}
          title="Compartir en WhatsApp"
          className="p-1.5 rounded-full hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-950/60 dark:hover:text-emerald-400 transition"
        >
          <MessageCircle className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={shareTwitter}
          title="Compartir en X / Twitter"
          className="p-1.5 rounded-full hover:bg-stone-200 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-stone-100 transition"
        >
          <span className="font-bold text-xs leading-none">𝕏</span>
        </button>
        <button
          onClick={shareFacebook}
          title="Compartir en Facebook"
          className="p-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-950/60 dark:hover:text-blue-400 transition"
        >
          <span className="font-bold text-xs leading-none">f</span>
        </button>
        <button
          onClick={handleCopy}
          title="Copiar enlace"
          className="p-1.5 rounded-full hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-950/60 dark:hover:text-amber-300 transition flex items-center gap-1"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 bg-stone-100 dark:bg-stone-800/70 rounded-lg border border-stone-200 dark:border-stone-700 flex flex-wrap items-center justify-between gap-3">
      <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
        <Share2 className="w-4 h-4 text-amber-600" />
        Compartir esta noticia:
      </span>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={shareWhatsApp}
          className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          WhatsApp
        </button>

        <button
          onClick={shareTwitter}
          className="px-2.5 py-1 text-xs font-semibold rounded bg-stone-900 hover:bg-stone-800 dark:bg-stone-700 dark:hover:bg-stone-600 text-white flex items-center gap-1.5 shadow-sm transition"
        >
          <span className="font-bold">𝕏</span>
          Post
        </button>

        <button
          onClick={shareFacebook}
          className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-1.5 shadow-sm transition"
        >
          <span className="font-bold">f</span>
          Facebook
        </button>

        <button
          onClick={shareLinkedIn}
          className="px-2.5 py-1 text-xs font-semibold rounded bg-sky-800 hover:bg-sky-900 text-white flex items-center gap-1.5 shadow-sm transition"
        >
          LinkedIn
        </button>

        <button
          onClick={handleCopy}
          className="px-2.5 py-1 text-xs font-semibold rounded bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 flex items-center gap-1.5 transition"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              ¡Copiado!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copiar enlace
            </>
          )}
        </button>
      </div>
    </div>
  );
};
