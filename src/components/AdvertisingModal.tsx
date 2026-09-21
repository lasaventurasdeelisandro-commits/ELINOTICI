import React, { useState, useEffect } from 'react';
import { 
  X, DollarSign, Megaphone, Sparkles, CheckCircle2, 
  ExternalLink, Building2, Phone, Mail, FileText, 
  Layers, BarChart3, Settings2, Globe, ShieldCheck, 
  CreditCard, ArrowRight, Eye, MousePointer, Copy, 
  Check, RefreshCw, AlertCircle
} from 'lucide-react';
import { 
  AdPlacement, AdvertiserCampaign, AdSenseConfig, 
  DirectAdPlan, AdNetworkMode 
} from '../types';

interface AdvertisingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlacement?: AdPlacement;
  rateCard: DirectAdPlan[];
  campaigns: AdvertiserCampaign[];
  adSenseConfig: AdSenseConfig;
  onCampaignCreated: (campaign: AdvertiserCampaign) => void;
  onConfigUpdated: (config: AdSenseConfig) => void;
}

const PRESET_CREATIVES = [
  {
    name: 'Bienes Raíces & Hogar',
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    title: 'Apartamentos Nuevos con Tasa Preferencial',
    category: 'Inmobiliaria & Finanzas',
    cta: 'Ver Proyectos'
  },
  {
    name: 'Tecnología & Conectividad',
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    title: 'Fibra Óptica para Empresas y Hogar',
    category: 'Telecomunicaciones',
    cta: 'Ver Planes'
  },
  {
    name: 'Supermercado & Consumo',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    title: 'Feria de Ahorro y Calidad Gourmet',
    category: 'Comercio & Retail',
    cta: 'Ver Ofertas'
  },
  {
    name: 'Turismo & Playas RD',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    title: 'Escapadas de Fin de Semana en Samaná',
    category: 'Turismo & Hoteles',
    cta: 'Reservar Ahora'
  },
  {
    name: 'Seguros & Protección',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    title: 'Póliza de Salud Internacional y Viajes',
    category: 'Seguros',
    cta: 'Cotizar Póliza'
  },
  {
    name: 'Restaurante & Gastronomía',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    title: 'Experiencia Culinaria Caribeña Auténtica',
    category: 'Gastronomía & Ocio',
    cta: 'Ver Menú y Reservar'
  }
];

export const AdvertisingModal: React.FC<AdvertisingModalProps> = ({
  isOpen,
  onClose,
  initialPlacement = 'header_top',
  rateCard,
  campaigns,
  adSenseConfig,
  onCampaignCreated,
  onConfigUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'rate_card' | 'publish_ad' | 'adsense_config' | 'analytics'>('publish_ad');
  
  // Booking Form State
  const [selectedPlacement, setSelectedPlacement] = useState<AdPlacement>(initialPlacement);
  const [advertiserName, setAdvertiserName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('Comercio & Retail');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [rncTaxId, setRncTaxId] = useState('');
  const [adTitle, setAdTitle] = useState('');
  const [adSubtitle, setAdSubtitle] = useState('');
  const [targetUrl, setTargetUrl] = useState('https://');
  const [imageUrl, setImageUrl] = useState(PRESET_CREATIVES[0].url);
  const [callToAction, setCallToAction] = useState('Más Información');
  const [durationDays, setDurationDays] = useState<number>(7);
  const [paymentMethod, setPaymentMethod] = useState<'banco_popular' | 'banreservas' | 'banco_bhd' | 'card' | 'whatsapp_billing'>('banco_popular');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<AdvertiserCampaign | null>(null);
  const [copiedAdsTxt, setCopiedAdsTxt] = useState(false);

  // AdSense Settings State
  const [adSenseForm, setAdSenseForm] = useState<AdSenseConfig>({ ...adSenseConfig });
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [configSuccessMsg, setConfigSuccessMsg] = useState('');

  useEffect(() => {
    if (initialPlacement) {
      setSelectedPlacement(initialPlacement);
    }
  }, [initialPlacement]);

  useEffect(() => {
    setAdSenseForm({ ...adSenseConfig });
  }, [adSenseConfig]);

  if (!isOpen) return null;

  // Pricing calculation
  const currentPlan = rateCard.find((p) => p.placement === selectedPlacement) || rateCard[0];
  const discountRate = durationDays >= 30 ? 0.25 : durationDays >= 15 ? 0.15 : 0;
  const subtotalDOP = (currentPlan?.pricePerDayDOP || 2000) * durationDays;
  const totalDOP = Math.round(subtotalDOP * (1 - discountRate));
  const subtotalUSD = (currentPlan?.pricePerDayUSD || 35) * durationDays;
  const totalUSD = Math.round(subtotalUSD * (1 - discountRate));

  const handleApplyPreset = (preset: typeof PRESET_CREATIVES[0]) => {
    setImageUrl(preset.url);
    if (!adTitle) setAdTitle(preset.title);
    setBusinessCategory(preset.category);
    setCallToAction(preset.cta);
  };

  const handlePublishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advertiserName || !contactEmail || !adTitle || !targetUrl) {
      alert('Por favor complete los campos obligatorios del anuncio.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/ads/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          advertiserName,
          businessCategory,
          contactEmail,
          contactPhone,
          rncTaxId,
          adTitle,
          adSubtitle,
          targetUrl,
          imageUrl,
          callToAction,
          placement: selectedPlacement,
          days: durationDays,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setSuccessReceipt(data.data);
        onCampaignCreated(data.data);
      } else {
        alert(data.error || 'Error al registrar la campaña publicitaria.');
      }
    } catch (err: any) {
      alert('Ocurrió un error al procesar la pauta: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAdSenseConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    setConfigSuccessMsg('');
    try {
      const res = await fetch('/api/ads/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adSenseForm),
      });
      const data = await res.json();
      if (data.success && data.data) {
        onConfigUpdated(data.data);
        setConfigSuccessMsg('Configuración de Google AdSense guardada exitosamente.');
      }
    } catch (err: any) {
      alert('Error guardando configuración: ' + err.message);
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleCopyAdsTxt = () => {
    const cleanPubId = adSenseForm.publisherId.replace(/^ca-/, '');
    const line = `google.com, ${cleanPubId || 'pub-9842510294719283'}, DIRECT, f08c47fec0942fa0`;
    navigator.clipboard.writeText(line);
    setCopiedAdsTxt(true);
    setTimeout(() => setCopiedAdsTxt(false), 3000);
  };

  // KPIs
  const totalDirectDOP = campaigns.reduce((acc, c) => acc + (c.totalPriceDOP || 0), 0);
  const totalDirectUSD = campaigns.reduce((acc, c) => acc + (c.totalPriceUSD || 0), 0);
  const totalImpressions = campaigns.reduce((acc, c) => acc + (c.impressionsCount || 0), 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + (c.clicksCount || 0), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white dark:bg-stone-900 w-full max-w-5xl rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-5 py-4 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
                  Centro de Monetización & Publicidad Digital
                </h2>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                  Google AdSense + Pauta Directa
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Pauta tu marca directamente en ELINOTICIA o gestiona la monetización automática con Google.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 bg-stone-100/70 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('publish_ad')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'publish_ad'
                ? 'border-amber-600 text-amber-700 dark:text-amber-400 bg-white/60 dark:bg-stone-800/60'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Publicar Anuncio (Pautar Aquí)</span>
          </button>

          <button
            onClick={() => setActiveTab('rate_card')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'rate_card'
                ? 'border-amber-600 text-amber-700 dark:text-amber-400 bg-white/60 dark:bg-stone-800/60'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tarifario & Espacios 2026</span>
          </button>

          <button
            onClick={() => setActiveTab('adsense_config')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'adsense_config'
                ? 'border-amber-600 text-amber-700 dark:text-amber-400 bg-white/60 dark:bg-stone-800/60'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Configurar Google AdSense</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-amber-600 text-amber-700 dark:text-amber-400 bg-white/60 dark:bg-stone-800/60'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Campañas & Métricas</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
              {campaigns.length}
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">

          {/* ==================================================== */}
          {/* TAB 1: PUBLICAR ANUNCIO DIRECTO (SELF-SERVE PORTAL) */}
          {/* ==================================================== */}
          {activeTab === 'publish_ad' && (
            <div className="space-y-6">
              {successReceipt ? (
                /* Success Confirmation Receipt */
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-2xl p-6 space-y-5 text-center max-w-2xl mx-auto animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
                      ¡Anuncio Publicado y Activado con Éxito!
                    </h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      Tu anuncio para <strong>{successReceipt.advertiserName}</strong> ya se encuentra en rotación activa en la sección seleccionada de ELINOTICIA.
                    </p>
                  </div>

                  {/* Receipt Voucher */}
                  <div className="bg-white dark:bg-stone-900 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800/70 text-left text-xs space-y-2.5 font-mono shadow-xs">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-stone-500">ID de Campaña:</span>
                      <span className="font-bold text-stone-900 dark:text-stone-100">{successReceipt.id}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-stone-500">Espacio Contratado:</span>
                      <span className="font-bold text-stone-900 dark:text-stone-100">{successReceipt.placement}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-stone-500">Duración:</span>
                      <span className="font-bold text-stone-900 dark:text-stone-100">{successReceipt.days} días</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-stone-500">Monto Total Facturado:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        RD$ {successReceipt.totalPriceDOP.toLocaleString()} (~US$ {successReceipt.totalPriceUSD})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Estado de Pauta:</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">100% En Vivo</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setSuccessReceipt(null);
                        onClose();
                      }}
                      className="px-5 py-2.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold rounded-xl shadow transition hover:opacity-90"
                    >
                      Ver mi anuncio en el periódico
                    </button>
                    <button
                      onClick={() => setSuccessReceipt(null)}
                      className="px-4 py-2 bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold rounded-xl hover:bg-stone-300 transition"
                    >
                      Publicar otro anuncio
                    </button>
                  </div>
                </div>
              ) : (
                /* Booking Form */
                <form onSubmit={handlePublishSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Form: Details */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3.5 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2.5">
                      <Sparkles className="w-5 h-5 shrink-0 text-amber-600" />
                      <span>
                        Pauta directamente en el diario líder de noticias verificadas de República Dominicana. Tu anuncio se mostrará a miles de lectores cada hora.
                      </span>
                    </div>

                    {/* Step 1: Select Placement */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center justify-between">
                        <span>1. Selecciona el Espacio Publicitario:</span>
                        <span className="text-[11px] text-amber-600 dark:text-amber-400 font-normal">
                          Tarifa por día: RD$ {currentPlan?.pricePerDayDOP.toLocaleString()}
                        </span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {rateCard.map((plan) => (
                          <button
                            type="button"
                            key={plan.id}
                            onClick={() => setSelectedPlacement(plan.placement)}
                            className={`p-3 rounded-xl border text-left transition relative ${
                              selectedPlacement === plan.placement
                                ? 'border-amber-600 bg-amber-500/10 dark:bg-amber-500/10 shadow-xs'
                                : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 bg-white dark:bg-stone-900'
                            }`}
                          >
                            {plan.badge && (
                              <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-600 text-white">
                                {plan.badge}
                              </span>
                            )}
                            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 pr-12">
                              {plan.name}
                            </h4>
                            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                              {plan.dimensions}
                            </p>
                            <div className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                              RD$ {plan.pricePerDayDOP.toLocaleString()} / día
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Advertiser Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 block">
                          Nombre de la Empresa o Marca *
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                          <input
                            type="text"
                            required
                            placeholder="Ej. Restaurante El Quisqueyano"
                            value={advertiserName}
                            onChange={(e) => setAdvertiserName(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 block">
                          Sector / Categoría Comercial
                        </label>
                        <select
                          value={businessCategory}
                          onChange={(e) => setBusinessCategory(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        >
                          <option value="Comercio & Retail">Comercio & Retail</option>
                          <option value="Banca & Finanzas">Banca & Finanzas</option>
                          <option value="Inmobiliaria & Bienes Raíces">Inmobiliaria & Bienes Raíces</option>
                          <option value="Turismo & Hotelería">Turismo & Hotelería</option>
                          <option value="Restaurantes & Gastronomía">Restaurantes & Gastronomía</option>
                          <option value="Automóviles & Concesionarios">Automóviles & Concesionarios</option>
                          <option value="Tecnología & Servicios">Tecnología & Servicios</option>
                          <option value="Salud & Medicina">Salud & Medicina</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 block">
                          Correo Electrónico de Contacto *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                          <input
                            type="email"
                            required
                            placeholder="contacto@empresa.com.do"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 block">
                          Teléfono / WhatsApp de Ventas
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                          <input
                            type="tel"
                            placeholder="+1 (809) 555-0123"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Creative Banner Content */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-stone-800 dark:text-stone-200">
                          2. Contenido del Anuncio:
                        </label>
                        <span className="text-[10px] text-stone-400">O elige una plantilla rápida abajo</span>
                      </div>

                      {/* Presets Row */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                        {PRESET_CREATIVES.map((preset, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => handleApplyPreset(preset)}
                            className="px-2.5 py-1 text-[11px] rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 hover:bg-amber-100 hover:text-amber-900 dark:hover:bg-stone-700 whitespace-nowrap transition"
                          >
                            + {preset.name}
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 block">
                          Título Principal del Anuncio *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Oferta Especial: 20% de Descuento en tu Primera Compra"
                          value={adTitle}
                          onChange={(e) => setAdTitle(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 block">
                          Subtítulo o Descripción Comercial
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Calidad garantizada, envíos gratis a todo Santo Domingo y Santiago."
                          value={adSubtitle}
                          onChange={(e) => setAdSubtitle(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 block">
                            Enlace / URL de Destino (Web o WhatsApp) *
                          </label>
                          <input
                            type="url"
                            required
                            placeholder="https://empresa.com.do o https://wa.me/..."
                            value={targetUrl}
                            onChange={(e) => setTargetUrl(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 block">
                            Texto del Botón (Llamado a la Acción)
                          </label>
                          <select
                            value={callToAction}
                            onChange={(e) => setCallToAction(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          >
                            <option value="Ver Ofertas">Ver Ofertas</option>
                            <option value="Comprar Ahora">Comprar Ahora</option>
                            <option value="Solicitar Información">Solicitar Información</option>
                            <option value="Contactar por WhatsApp">Contactar por WhatsApp</option>
                            <option value="Calcular Préstamo">Calcular Préstamo</option>
                            <option value="Reservar Cita">Reservar Cita</option>
                            <option value="Explorar Catálogo">Explorar Catálogo</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 block">
                          URL de Imagen Creativa (Banner)
                        </label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono text-[11px]"
                        />
                      </div>
                    </div>

                    {/* Step 4: Duration & Pricing */}
                    <div className="space-y-2 pt-2">
                      <label className="text-xs font-bold text-stone-800 dark:text-stone-200">
                        3. Duración de la Campaña:
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { days: 3, label: '3 Días', desc: 'Prueba Rápida', discount: '' },
                          { days: 7, label: '7 Días', desc: '1 Semana', discount: '' },
                          { days: 15, label: '15 Días', desc: 'Quincena', discount: '15% OFF' },
                          { days: 30, label: '30 Días', desc: '1 Mes Completo', discount: '25% OFF' },
                        ].map((d) => (
                          <button
                            type="button"
                            key={d.days}
                            onClick={() => setDurationDays(d.days)}
                            className={`p-2.5 rounded-xl border text-center transition ${
                              durationDays === d.days
                                ? 'border-amber-600 bg-amber-500/10 text-amber-900 dark:text-amber-200 font-bold'
                                : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                            }`}
                          >
                            <div className="text-xs">{d.label}</div>
                            <div className="text-[10px] text-stone-500">{d.desc}</div>
                            {d.discount && (
                              <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                                {d.discount}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 5: Payment Method */}
                    <div className="space-y-2 pt-2">
                      <label className="text-xs font-bold text-stone-800 dark:text-stone-200">
                        4. Método de Pago Seguro:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <label className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between text-xs ${paymentMethod === 'banco_popular' ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/20' : 'border-stone-200 dark:border-stone-800'}`}>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === 'banco_popular'}
                              onChange={() => setPaymentMethod('banco_popular')}
                            />
                            <span className="font-bold">Banco Popular RD</span>
                          </div>
                          <span className="text-[10px] text-stone-500 mt-1">Transferencia ACH / LBTR</span>
                        </label>

                        <label className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between text-xs ${paymentMethod === 'banreservas' ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/20' : 'border-stone-200 dark:border-stone-800'}`}>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === 'banreservas'}
                              onChange={() => setPaymentMethod('banreservas')}
                            />
                            <span className="font-bold">Banreservas</span>
                          </div>
                          <span className="text-[10px] text-stone-500 mt-1">Depósito o Banca en Línea</span>
                        </label>

                        <label className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between text-xs ${paymentMethod === 'card' ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/20' : 'border-stone-200 dark:border-stone-800'}`}>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === 'card'}
                              onChange={() => setPaymentMethod('card')}
                            />
                            <span className="font-bold">Tarjeta de Crédito</span>
                          </div>
                          <span className="text-[10px] text-stone-500 mt-1">Visa / Mastercard Instantánea</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Mockup & Summary */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="sticky top-2 space-y-4">
                      {/* Live Banner Preview Box */}
                      <div className="bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                            Vista Previa en Vivo
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold">
                            {currentPlan?.dimensions}
                          </span>
                        </div>

                        {/* Simulated Banner Display */}
                        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-300 dark:border-stone-700 overflow-hidden shadow-xs">
                          <div className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-[10px] text-stone-500 flex justify-between">
                            <span className="font-bold text-amber-600 uppercase">Patrocinado</span>
                            <span>{advertiserName || 'Tu Empresa'}</span>
                          </div>
                          <div className="p-3 flex items-center gap-3">
                            <div className="w-16 h-16 rounded-lg bg-stone-200 dark:bg-stone-800 shrink-0 overflow-hidden">
                              <img
                                src={imageUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80';
                                }}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                                {businessCategory}
                              </span>
                              <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-2 leading-tight">
                                {adTitle || 'Escribe el título de tu anuncio aquí'}
                              </h5>
                              <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                                {adSubtitle || 'Descripción breve de tu producto o servicio'}
                              </p>
                              <div className="mt-1.5">
                                <span className="inline-block px-2.5 py-1 bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-950 text-[10px] font-bold rounded">
                                  {callToAction} →
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-[10px] text-stone-400 italic text-center">
                          Así se verá tu anuncio en "{currentPlan?.name}" ante miles de lectores.
                        </p>
                      </div>

                      {/* Cost Summary Breakdown */}
                      <div className="bg-stone-900 text-stone-100 dark:bg-stone-950 rounded-2xl p-5 space-y-3 shadow-md">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                          Resumen de Inversión Publicitaria
                        </h4>

                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between text-stone-300">
                            <span>Tarifa Base ({durationDays} días):</span>
                            <span className="font-mono">RD$ {subtotalDOP.toLocaleString()}</span>
                          </div>

                          {discountRate > 0 && (
                            <div className="flex justify-between text-emerald-400 font-semibold">
                              <span>Descuento Especial ({Math.round(discountRate * 100)}%):</span>
                              <span className="font-mono">- RD$ {Math.round(subtotalDOP * discountRate).toLocaleString()}</span>
                            </div>
                          )}

                          <div className="border-t border-stone-800 pt-2 flex items-baseline justify-between">
                            <span className="font-bold text-sm">Total a Invertir:</span>
                            <div className="text-right">
                              <div className="text-lg font-black text-amber-400 font-mono">
                                RD$ {totalDOP.toLocaleString()}
                              </div>
                              <div className="text-[11px] text-stone-400 font-mono">
                                (~US$ {totalUSD.toLocaleString()})
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 text-[11px] text-stone-400 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Activación inmediata tras confirmación. Factura con NCF disponible.</span>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Activando Campaña...</span>
                            </>
                          ) : (
                            <>
                              <span>Confirmar y Publicar mi Anuncio</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: TARIFARIO & ALCANCE AUDIENCIA 2026 */}
          {/* ==================================================== */}
          {activeTab === 'rate_card' && (
            <div className="space-y-6">
              {/* Audience Reach Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center">
                  <div className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 font-serif">
                    320K+
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">Lectores Mensuales</div>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center">
                  <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 font-serif">
                    68%
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">República Dominicana</div>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center">
                  <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 font-serif">
                    24%
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">Diáspora (NY, FL, MA, ES)</div>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center">
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-serif">
                    3.8m
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">Tiempo Promedio en Nota</div>
                </div>
              </div>

              {/* Rate Card Grid */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                  Espacios Publicitarios Disponibles & Tarifas Oficiales
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rateCard.map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 space-y-3 shadow-xs hover:border-amber-500/60 transition"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                              {plan.name}
                            </h4>
                            {plan.badge && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-600 text-white">
                                {plan.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-stone-500 font-mono mt-0.5 block">
                            {plan.dimensions}
                          </span>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-base font-black text-emerald-700 dark:text-emerald-400 font-mono">
                            RD$ {plan.pricePerDayDOP.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-stone-400">
                            ~US$ {plan.pricePerDayUSD} / día
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 dark:text-stone-400 font-reading leading-relaxed">
                        {plan.description}
                      </p>

                      <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                        <span className="text-stone-500 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-stone-400" />
                          <span>{plan.estimatedImpressionsDay}</span>
                        </span>

                        <button
                          onClick={() => {
                            setSelectedPlacement(plan.placement);
                            setActiveTab('publish_ad');
                          }}
                          className="px-3 py-1.5 bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-950 font-bold rounded-lg hover:opacity-90 transition flex items-center gap-1"
                        >
                          <span>Pautar Aquí</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: CONFIGURACIÓN GOOGLE ADSENSE */}
          {/* ==================================================== */}
          {activeTab === 'adsense_config' && (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-blue-900 dark:text-blue-200">
                  <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Monetización con Google AdSense para el Periódico</span>
                </div>
                <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed font-reading">
                  Google AdSense te permite ganar dinero mostrando anuncios contextuales automáticos. Cuando no haya un patrocinador directo contratando un espacio, Google llenará el banner generando ingresos por impresiones (CPM) y clics (CPC).
                </p>
              </div>

              {configSuccessMsg && (
                <div className="p-3 bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{configSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveAdSenseConfig} className="space-y-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5">
                {/* Publisher ID */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center justify-between">
                    <span>Google AdSense Publisher ID (ID de Editor) *</span>
                    <span className="text-[11px] text-stone-400 font-mono">Formato: ca-pub-XXXXXXXXXXXXXXXX</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ca-pub-9842510294719283"
                    value={adSenseForm.publisherId}
                    onChange={(e) => setAdSenseForm({ ...adSenseForm, publisherId: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-stone-500">
                    Encuéntralo en tu panel de Google AdSense en: <strong>Cuenta &gt; Configuración &gt; Información de la cuenta</strong>.
                  </p>
                </div>

                {/* Monetization Mode Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    Modo de Operación de la Red Publicitaria:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        mode: 'hybrid' as AdNetworkMode,
                        title: 'Híbrido Inteligente (Recomendado)',
                        desc: 'Muestra anuncios de patrocinadores directos primero; si el espacio está libre, muestra Google AdSense.',
                      },
                      {
                        mode: 'direct_only' as AdNetworkMode,
                        title: 'Solo Anuncios Directos',
                        desc: 'Cobras el 100% de la pauta directamente a clientes en tus cuentas bancarias de República Dominicana.',
                      },
                      {
                        mode: 'adsense_only' as AdNetworkMode,
                        title: 'Solo Google AdSense',
                        desc: 'Monetización 100% pasiva automatizada gestionada por Google.',
                      },
                    ].map((m) => (
                      <label
                        key={m.mode}
                        className={`p-3.5 rounded-xl border cursor-pointer space-y-1 transition ${
                          adSenseForm.monetizationMode === m.mode
                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 shadow-xs'
                            : 'border-stone-200 dark:border-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="monetizationMode"
                            checked={adSenseForm.monetizationMode === m.mode}
                            onChange={() => setAdSenseForm({ ...adSenseForm, monetizationMode: m.mode })}
                          />
                          <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                            {m.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 font-reading pl-5">
                          {m.desc}
                        </p>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Slot IDs */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    Identificadores de Bloque de Anuncios de Google AdSense (Slot IDs)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 block">
                        Slot ID: Cabecera Principal (Leaderboard)
                      </label>
                      <input
                        type="text"
                        value={adSenseForm.slots.header_top}
                        onChange={(e) =>
                          setAdSenseForm({
                            ...adSenseForm,
                            slots: { ...adSenseForm.slots, header_top: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 block">
                        Slot ID: Entre Noticias (In-Feed)
                      </label>
                      <input
                        type="text"
                        value={adSenseForm.slots.in_feed}
                        onChange={(e) =>
                          setAdSenseForm({
                            ...adSenseForm,
                            slots: { ...adSenseForm.slots, in_feed: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 block">
                        Slot ID: Columna Lateral (Sidebar)
                      </label>
                      <input
                        type="text"
                        value={adSenseForm.slots.sidebar}
                        onChange={(e) =>
                          setAdSenseForm({
                            ...adSenseForm,
                            slots: { ...adSenseForm.slots, sidebar: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 block">
                        Slot ID: Lectura de Noticia (Article Modal)
                      </label>
                      <input
                        type="text"
                        value={adSenseForm.slots.article_modal}
                        onChange={(e) =>
                          setAdSenseForm({
                            ...adSenseForm,
                            slots: { ...adSenseForm.slots, article_modal: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                      />
                    </div>
                  </div>
                </div>

                {/* ads.txt verification box */}
                <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      <span>Archivo de Verificación ads.txt (Activo en este servidor)</span>
                    </span>
                    <a
                      href="/ads.txt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>Abrir /ads.txt</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 font-reading">
                    Google exige que tu sitio web contenga una línea autorizada en `/ads.txt` para validar tu propiedad. El servidor ya lo genera automáticamente con tu ID de editor:
                  </p>
                  <div className="p-2 bg-stone-900 text-stone-100 rounded text-[11px] font-mono flex items-center justify-between">
                    <code>google.com, {adSenseForm.publisherId.replace(/^ca-/, '') || 'pub-9842510294719283'}, DIRECT, f08c47fec0942fa0</code>
                    <button
                      type="button"
                      onClick={handleCopyAdsTxt}
                      className="text-stone-400 hover:text-white transition p-1"
                      title="Copiar línea de ads.txt"
                    >
                      {copiedAdsTxt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSavingConfig}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow transition disabled:opacity-50"
                  >
                    {isSavingConfig ? 'Guardando...' : 'Guardar Configuración de AdSense'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 4: MÉTRICAS DE CAMPAÑAS & INGRESOS EN VIVO */}
          {/* ==================================================== */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Revenue KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                    Ingresos Directos Totales
                  </span>
                  <div className="text-xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                    RD$ {totalDirectDOP.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono">
                    ~US$ {totalDirectUSD.toLocaleString()}
                  </div>
                </div>

                <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                    Impresiones Servidas
                  </span>
                  <div className="text-xl font-black text-stone-900 dark:text-stone-100 font-mono">
                    {totalImpressions.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-600">Visualizaciones reales</div>
                </div>

                <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                    Clics Registrados
                  </span>
                  <div className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono">
                    {totalClicks.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-stone-500">Hacia sitios de clientes</div>
                </div>

                <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                    CTR Promedio
                  </span>
                  <div className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono">
                    {totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '2.15'}%
                  </div>
                  <div className="text-[10px] text-stone-500">Conversión de lectura</div>
                </div>
              </div>

              {/* Campaigns Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                    Campañas de Anunciantes en Rotación ({campaigns.length})
                  </h4>
                  <button
                    onClick={() => setActiveTab('publish_ad')}
                    className="px-3 py-1 bg-amber-500 text-stone-950 font-bold text-xs rounded-lg hover:bg-amber-400 transition"
                  >
                    + Nueva Pauta Directa
                  </button>
                </div>

                <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden bg-white dark:bg-stone-900">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-700">
                        <tr>
                          <th className="p-3">Anunciante & Título</th>
                          <th className="p-3">Ubicación</th>
                          <th className="p-3">Impresiones</th>
                          <th className="p-3">Clics</th>
                          <th className="p-3">Inversión (DOP)</th>
                          <th className="p-3">Estado</th>
                          <th className="p-3 text-right">Destino</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                        {campaigns.map((camp) => (
                          <tr key={camp.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-800/40 transition">
                            <td className="p-3">
                              <div className="font-bold text-stone-900 dark:text-stone-100">
                                {camp.advertiserName}
                              </div>
                              <div className="text-[11px] text-stone-500 line-clamp-1">
                                {camp.adTitle}
                              </div>
                            </td>
                            <td className="p-3 font-mono text-[11px] text-stone-600 dark:text-stone-400">
                              {camp.placement}
                            </td>
                            <td className="p-3 font-mono text-stone-700 dark:text-stone-300">
                              {camp.impressionsCount.toLocaleString()}
                            </td>
                            <td className="p-3 font-mono text-blue-600 dark:text-blue-400 font-semibold">
                              {camp.clicksCount.toLocaleString()}
                            </td>
                            <td className="p-3 font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                              RD$ {camp.totalPriceDOP.toLocaleString()}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  camp.status === 'active'
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                    : 'bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-400'
                                }`}
                              >
                                {camp.status === 'active' ? 'Activo' : 'Pausado'}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <a
                                href={camp.targetUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-stone-400 hover:text-amber-600 inline-block p-1"
                                title={camp.targetUrl}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
