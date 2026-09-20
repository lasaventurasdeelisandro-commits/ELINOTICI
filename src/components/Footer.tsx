import React from 'react';
import { ShieldCheck, Heart, Rss, Mail, Globe, Award, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenSubscription: () => void;
  onOpenRssManager: () => void;
  onOpenPreferences: () => void;
  onCategorySelect: (cat: any) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSubscription,
  onOpenRssManager,
  onOpenPreferences,
  onCategorySelect,
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t-4 border-blue-600 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Editorial Mission */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="footer" />
            <p className="text-xs text-stone-400 font-reading leading-relaxed">
              ELINOTICIA es el periódico digital de información verídica y en tiempo real de la República Dominicana y el mundo. Comprometidos con el rigor periodístico, la independencia editorial y el uso ético de inteligencia artificial.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-900/60">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Compromiso de Veracidad: 0% desinformación, 0% spam.</span>
            </div>
          </div>

          {/* Col 2: Sections */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Secciones Informativas
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onCategorySelect('portada')} className="hover:text-white transition">
                  Portada & Última Hora
                </button>
              </li>
              <li>
                <button onClick={() => onCategorySelect('rd')} className="hover:text-white transition">
                  República Dominicana (Nacionales)
                </button>
              </li>
              <li>
                <button onClick={() => onCategorySelect('mundo')} className="hover:text-white transition">
                  Internacionales & Geopolítica
                </button>
              </li>
              <li>
                <button onClick={() => onCategorySelect('deportes')} className="hover:text-white transition">
                  Deportes Quisqueya (LIDOM & MLB)
                </button>
              </li>
              <li>
                <button onClick={() => onCategorySelect('economia')} className="hover:text-white transition">
                  Economía, Banco Central & Mercados
                </button>
              </li>
              <li>
                <button onClick={() => onCategorySelect('opinion')} className="hover:text-white transition">
                  Opinión, Columnas & Editoriales
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Tech */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Plataforma Digital
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenRssManager} className="hover:text-white flex items-center gap-1.5 transition">
                  <Rss className="w-3.5 h-3.5 text-amber-500" />
                  Feeds RSS & Motor IA
                </button>
              </li>
              <li>
                <button onClick={onOpenPreferences} className="hover:text-white transition">
                  Preferencias & Alertas Push
                </button>
              </li>
              <li>
                <button onClick={onOpenSubscription} className="hover:text-white flex items-center gap-1.5 transition">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  Suscripción Digital Plus
                </button>
              </li>
              <li>
                <span className="text-stone-500">Hemeroteca Digital</span>
              </li>
              <li>
                <span className="text-stone-500">Boletines Matutinos</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Quick Signup */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              Boletín Matinal Diario
            </h3>
            <p className="text-xs text-stone-400">
              Recibe cada mañana a las 7:00 AM el resumen ejecutivo de las noticias más trascendentales de Quisqueya y el mundo.
            </p>
            <div className="space-y-2">
              <button
                onClick={onOpenSubscription}
                className="w-full py-2 px-3 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 transition shadow"
              >
                Suscribirme Gratis al Boletín
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 ELINOTICIA. Todos los derechos reservados. Santo Domingo, República Dominicana.</p>
          <div className="flex items-center gap-4">
            <span>Periodismo Transparente con Inteligencia Artificial</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-stone-400">
              Hecho con <Heart className="w-3 h-3 text-red-500" /> para la República Dominicana
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
