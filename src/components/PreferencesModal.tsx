import React from 'react';
import { 
  X, Sliders, Bell, Moon, Sun, Check, Globe, Shield, 
  Flame, Heart, Briefcase, Trophy, Cpu, Landmark 
} from 'lucide-react';
import { UserPreferences, NewsCategory, SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, t } from '../utils/translations';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onUpdate: (prefs: Partial<UserPreferences>) => void;
  onRequestPushPermission: () => Promise<void>;
  pushPermissionState: NotificationPermission | 'unsupported';
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onUpdate,
  onRequestPushPermission,
  pushPermissionState,
}) => {
  if (!isOpen) return null;

  const allTopics: { id: NewsCategory; label: string; icon: string; desc: string }[] = [
    { id: 'rd', label: 'República Dominicana', icon: '🇩🇴', desc: 'Política, obras públicas, turismo y provincias' },
    { id: 'mundo', label: 'Internacionales / Mundo', icon: '🌎', desc: 'Geopolítica, América Latina y sucesos globales' },
    { id: 'deportes', label: 'Deportes & LIDOM', icon: '⚾', desc: 'Pelota invernal, MLB, fútbol y polideportivo' },
    { id: 'economia', label: 'Economía & Finanzas', icon: '💼', desc: 'Banco Central, tipo de cambio, inversión y remesas' },
    { id: 'opinion', label: 'Opinión & Editoriales', icon: '✍️', desc: 'Columnas de análisis y debate de fondo' },
    { id: 'tecnologia', label: 'Tecnología & Ciencia', icon: '🤖', desc: 'Inteligencia artificial, salud y avances digitales' },
    { id: 'cultura', label: 'Cultura & Sociedad', icon: '🎨', desc: 'Arte, literatura caribeña y patrimonio histórico' },
  ];

  const toggleTopic = (cat: NewsCategory) => {
    let updated: NewsCategory[];
    if (preferences.topics.includes(cat)) {
      if (preferences.topics.length === 1) return; // keep at least one
      updated = preferences.topics.filter(t => t !== cat);
    } else {
      updated = [...preferences.topics, cat];
    }
    onUpdate({ topics: updated });
  };

  const toggleAlertCategory = (cat: NewsCategory) => {
    let updated: NewsCategory[];
    if (preferences.alertCategories.includes(cat)) {
      updated = preferences.alertCategories.filter(t => t !== cat);
    } else {
      updated = [...preferences.alertCategories, cat];
    }
    onUpdate({ alertCategories: updated });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white dark:bg-stone-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 rounded-lg">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-stone-950 dark:text-stone-50">
                Preferencias de Lectura y Alertas
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Personaliza las noticias de tu feed y ajusta tus notificaciones push en tiempo real.
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

        {/* Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* 1. Topics of Interest */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-amber-600" />
                Temas de Interés (Filtro Inteligente de Noticias)
              </h4>
              <span className="text-[11px] text-stone-500">
                {preferences.topics.length} seleccionados
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {allTopics.map((topic) => {
                const isSelected = preferences.topics.includes(topic.id);
                return (
                  <div
                    key={topic.id}
                    onClick={() => toggleTopic(topic.id)}
                    className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/60 text-stone-900 dark:text-stone-50'
                        : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800 text-stone-500'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{topic.icon}</span>
                      <div>
                        <span className="text-xs font-bold block">{topic.label}</span>
                        <span className="text-[10px] text-stone-400 block">{topic.desc}</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                      isSelected ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-300 dark:border-stone-700'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Real-Time Push Notifications */}
          <div className="p-4 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-amber-600" />
                  Notificaciones Push en Tiempo Real
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Recibe avisos inmediatos en tu navegador cuando ocurra un hecho trascendental.
                </p>
              </div>

              {pushPermissionState === 'granted' ? (
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  Permitidas
                </span>
              ) : (
                <button
                  onClick={onRequestPushPermission}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-md shadow-xs transition"
                >
                  Activar en Navegador
                </button>
              )}
            </div>

            {/* Alert categories */}
            <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-700/70">
              <span className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block">
                Selecciona qué categorías de alertas urgentes deseas recibir:
              </span>
              <div className="flex flex-wrap gap-2">
                {['rd', 'deportes', 'economia', 'mundo'].map((cat) => {
                  const active = preferences.alertCategories.includes(cat as any);
                  const labels: Record<string, string> = {
                    rd: '🇩🇴 Urgentes RD',
                    deportes: '⚾ Deportes & LIDOM',
                    economia: '💼 Economía & Dólar',
                    mundo: '🌎 Alertas Internacionales',
                  };
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleAlertCategory(cat as any)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        active
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      {labels[cat]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Appearance & Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dark Mode */}
            <div className="p-4 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                  Modo Oscuro
                </span>
                <span className="text-[11px] text-stone-500">
                  Mejora la lectura nocturna
                </span>
              </div>
              <button
                onClick={() => onUpdate({ darkMode: !preferences.darkMode })}
                className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
                  preferences.darkMode ? 'bg-amber-600 justify-end' : 'bg-stone-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
              </button>
            </div>

            {/* Default Reading Language */}
            <div className="p-4 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                  Idioma Predeterminado
                </span>
                <span className="text-[11px] text-stone-500">
                  Español por defecto
                </span>
              </div>
              <select
                value={preferences.language}
                onChange={(e) => onUpdate({ language: e.target.value as any })}
                className="text-xs font-bold bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded px-2.5 py-1 text-stone-800 dark:text-stone-200"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-stone-950 font-bold text-xs shadow transition"
          >
            Guardar y Aplicar Preferencias
          </button>
        </div>
      </div>
    </div>
  );
};
