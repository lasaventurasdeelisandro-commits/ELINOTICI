import React, { useState } from 'react';
import { 
  X, Check, Sparkles, Award, ShieldCheck, Mail, ArrowRight, Zap 
} from 'lucide-react';
import { UserPreferences, SubscriptionPlan } from '../types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSubscribe: (tier: 'free' | 'digital_plus' | 'patron', email: string) => Promise<void>;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSubscribe,
}) => {
  if (!isOpen) return null;

  const [selectedTier, setSelectedTier] = useState<'digital_plus' | 'patron'>('digital_plus');
  const [email, setEmail] = useState(preferences.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Acceso Estándar',
      priceDOP: 0,
      period: 'Siempre gratuito',
      features: [
        'Lectura de hasta 10 artículos al mes',
        'Boletín dominical de resumen',
        'Filtro básico de noticias',
      ],
    },
    {
      id: 'digital_plus',
      name: 'Digital Plus',
      priceDOP: 290,
      period: 'mensual (RD$ 290/mes)',
      badge: 'Más Popular',
      isPopular: true,
      features: [
        'Acceso 100% ilimitado a todas las noticias',
        'Resúmenes ejecutivos en 3 viñetas generados por IA',
        'Podcasts y boletines de audio completos',
        'Alertas Push prioritarias de última hora',
        'Lectura sin interrupciones publicitarias',
        'Traducción multi-idioma instantánea',
      ],
    },
    {
      id: 'patron',
      name: 'Acceso Total & Patrono',
      priceDOP: 550,
      period: 'mensual (RD$ 550/mes)',
      badge: 'Compromiso Editorial',
      features: [
        'Todos los beneficios de Digital Plus',
        'Participación en debates del Consejo Editorial',
        'Acceso a la Hemeroteca Histórica Dominicana',
        'Insignia de Suscriptor Fundador en comentarios',
        'Descarga de reportajes de investigación en PDF',
      ],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    try {
      await onSubscribe(selectedTier, email);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white dark:bg-stone-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="p-6 bg-stone-950 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl"></div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Suscripción Digital ELINOTICIA
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-serif">
            Apoya el Periodismo Riguroso e Independiente
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mt-1 font-reading">
            Infórmate con rigor, sin sesgos y con la verificación de hechos más avanzada de la República Dominicana y el mundo.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {success ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-serif text-emerald-900 dark:text-emerald-200">
                ¡Bienvenido a ELINOTICIA Digital Plus!
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 max-w-md mx-auto">
                Tu suscripción ha sido activada para <strong>{email}</strong>. Ya disfrutas de acceso ilimitado, resúmenes con IA y podcasts exclusivos.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.filter(p => p.id !== 'free').map((plan) => {
                  const isSelected = selectedTier === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedTier(plan.id as any)}
                      className={`p-5 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between relative ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 shadow-md'
                          : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-800/60'
                      }`}
                    >
                      {plan.badge && (
                        <span className="absolute -top-3 right-4 bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                          {plan.badge}
                        </span>
                      )}

                      <div>
                        <h4 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
                          {plan.name}
                        </h4>
                        <div className="mt-2 mb-4">
                          <span className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-stone-50">
                            RD$ {plan.priceDOP}
                          </span>
                          <span className="text-xs text-stone-500 ml-1">/ mes</span>
                        </div>

                        <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5 pt-3 border-t border-stone-200 dark:border-stone-700/80 flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                          {isSelected ? 'Plan Seleccionado' : 'Seleccionar este plan'}
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Form to activate */}
              <form onSubmit={handleSubmit} className="p-4 bg-stone-50 dark:bg-stone-800/70 rounded-xl border border-stone-200 dark:border-stone-700 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800 dark:text-stone-200 uppercase">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span>Ingresa tu correo para activar tu membresía y boletines matutinos:</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 text-xs font-bold rounded-lg bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-stone-950 flex items-center justify-center gap-1.5 shadow transition disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Procesando...' : 'Comenzar Suscripción'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  🔒 Pago simulado seguro. Puedes cancelar en cualquier momento desde tu panel de usuario sin cargos adicionales.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
