import React, { useState, useEffect } from 'react';
import { 
  Tv, Video, Radio, Users, Mic, MicOff, Volume2, VolumeX, 
  Maximize2, Eye, MessageSquare, Send, Sparkles, AlertCircle, 
  CheckCircle2, Play, Pause, RefreshCw, LayoutGrid, Monitor
} from 'lucide-react';
import { PodcastEpisode, StudioCameraFeed, StudioCommentator, StudioGuest } from '../types';

interface StudioLiveStreamPlayerProps {
  episode: PodcastEpisode;
  isPlaying: boolean;
  onTogglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

interface ChatMessage {
  id: string;
  author: string;
  location: string;
  text: string;
  timestamp: string;
  isHost?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm-1',
    author: 'Carlos Gómez',
    location: 'Santiago de los Caballeros',
    text: 'Saludos al Lic. Elisandro Alvarez y a la Lic. Esthefany Pichardo. Excelente análisis en cabina.',
    timestamp: 'Hace 3 min'
  },
  {
    id: 'm-2',
    author: 'Dra. Miriam Peña',
    location: 'Santo Domingo Este',
    text: 'Pregunta para el Ing. Herrera: ¿Cómo beneficiará la expansión del aeropuerto a los pequeños productores agrícolas?',
    timestamp: 'Hace 2 min'
  },
  {
    id: 'm-3',
    author: 'Pedro Almonte',
    location: 'Boston, MA (Diáspora)',
    text: 'Sintonizando el canal en vivo desde la diáspora. Orgullo dominicano ver esta calidad de transmisión.',
    timestamp: 'Hace 1 min'
  },
  {
    id: 'm-4',
    author: 'ELINOTICIA Producción',
    location: 'Cabina Master',
    text: 'En el próximo bloque abriremos las líneas telefónicas y WhatsApp para preguntas a los invitados.',
    timestamp: 'Ahora mismo',
    isHost: true
  }
];

export const StudioLiveStreamPlayer: React.FC<StudioLiveStreamPlayerProps> = ({
  episode,
  isPlaying,
  onTogglePlay,
  audioRef
}) => {
  const streamData = episode.streamData;
  const cameras = streamData?.cameras || [];
  
  const [activeCameraId, setActiveCameraId] = useState<string>(cameras[0]?.id || 'cam-1');
  const [isSwitching, setIsSwitching] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [userInput, setUserInput] = useState('');
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);
  const [viewers, setViewers] = useState(streamData?.viewerCount || 2840);

  // Rotate ticker messages periodically
  useEffect(() => {
    if (!streamData?.tickerNews || streamData.tickerNews.length === 0) return;
    const timer = setInterval(() => {
      setCurrentTickerIndex((prev) => (prev + 1) % streamData.tickerNews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [streamData?.tickerNews]);

  // Subtle viewer count fluctuation to simulate live broadcast
  useEffect(() => {
    const timer = setInterval(() => {
      setViewers((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.max(2500, prev + delta);
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeCamera = cameras.find((c) => c.id === activeCameraId) || cameras[0];

  const handleCameraChange = (cameraId: string) => {
    if (cameraId === activeCameraId) return;
    setIsSwitching(true);
    setActiveCameraId(cameraId);
    setTimeout(() => {
      setIsSwitching(false);
    }, 350);
  };

  const handleToggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const newMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      author: 'Tú (Lector Verificado)',
      location: 'República Dominicana',
      text: userInput.trim(),
      timestamp: 'Ahora mismo'
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setUserInput('');
  };

  if (!streamData) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Top Stream Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-950 p-3 rounded-xl border border-stone-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-red-600 text-white font-bold text-xs tracking-wider uppercase animate-pulse shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span>TRANSMISIÓN EN VIVO</span>
          </div>
          <div className="text-xs text-stone-300">
            <strong className="text-white font-serif">{streamData.channelName}</strong>
            <span className="mx-2 text-stone-600">•</span>
            <span className="text-stone-400">{streamData.programSchedule}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-stone-300">
            <Eye className="w-3.5 h-3.5 text-red-500" />
            <span className="font-mono font-bold text-white">{viewers.toLocaleString()}</span>
            <span className="text-stone-400">espectadores en vivo</span>
          </div>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-stone-800 text-[11px] font-mono font-medium text-emerald-400 border border-stone-700">
            {streamData.streamResolution}
          </span>
        </div>
      </div>

      {/* Main Broadcast Studio Viewport */}
      <div className="relative aspect-video sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black border border-stone-800 shadow-2xl group">
        {/* Active Camera Feed */}
        <div className={`w-full h-full relative transition-opacity duration-300 ${isSwitching ? 'opacity-30' : 'opacity-100'}`}>
          {activeCamera?.cameraType === 'split' ? (
            /* Split Screen Layout */
            <div className="w-full h-full grid grid-cols-2 gap-1 bg-stone-950 p-1">
              {/* Left Screen: Comentaristas */}
              <div className="relative h-full overflow-hidden rounded bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1000&q=80"
                  alt="Mesa de Comentaristas"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur px-2 py-0.5 rounded text-[11px] font-mono text-amber-400 border border-stone-700">
                  CABINA • CONDUCTORES
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-stone-950/90 backdrop-blur p-2 rounded border border-stone-700/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold text-xs text-white">Lic. Elisandro Alvarez & Lic. Esthefany Pichardo</span>
                  </div>
                  <p className="text-[10px] text-stone-300">Conductores en Cabina • En el aire</p>
                </div>
              </div>

              {/* Right Screen: Invitado en Vivo */}
              <div className="relative h-full overflow-hidden rounded bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80"
                  alt="Panel de Invitados"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur px-2 py-0.5 rounded text-[11px] font-mono text-sky-400 border border-stone-700">
                  PANEL • INVITADO ESPECIAL
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-stone-950/90 backdrop-blur p-2 rounded border border-stone-700/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold text-xs text-white">Ing. Roberto Herrera</span>
                  </div>
                  <p className="text-[10px] text-stone-300">Cámara de Comercio • Presencial</p>
                </div>
              </div>
            </div>
          ) : (
            /* Single Feed View */
            <div className="w-full h-full relative">
              <img
                src={activeCamera?.previewImageUrl}
                alt={activeCamera?.name}
                className="w-full h-full object-cover"
              />
              {/* Studio lighting & vignette gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-stone-950/40 pointer-events-none"></div>
            </div>
          )}
        </div>

        {/* Video Switching Transition Indicator */}
        {isSwitching && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs z-30">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs font-mono font-bold text-amber-400">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              <span>CONMUTANDO A {activeCamera?.label}...</span>
            </div>
          </div>
        )}

        {/* Top-Left Channel Bug & Watermark */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <div className="bg-stone-950/85 backdrop-blur border border-stone-700/80 px-3 py-1 rounded-lg shadow-lg flex items-center gap-2">
            <Tv className="w-4 h-4 text-red-500" />
            <span className="font-serif font-bold text-xs text-white tracking-wider">ELINOTICIA TV</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-red-600/90 backdrop-blur px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold text-white shadow">
            <span>🔴 ON AIR:</span>
            <span>{activeCamera?.label}</span>
          </div>
        </div>

        {/* Top-Right Studio VU Meter & Audio Status */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {/* Simulated VU Audio Bars */}
          <div className="hidden sm:flex items-center gap-1 bg-stone-950/80 backdrop-blur px-2.5 py-1.5 rounded-lg border border-stone-800">
            <span className="text-[10px] font-mono text-stone-400 mr-1">AUDIO CH1/2</span>
            <div className="flex items-end gap-0.5 h-4">
              {[60, 90, 40, 80, 100, 70, 85].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-xs transition-all duration-150 ${
                    isPlaying 
                      ? i > 4 ? 'bg-red-500' : i > 2 ? 'bg-amber-400' : 'bg-emerald-500' 
                      : 'bg-stone-700'
                  }`}
                  style={{ height: isPlaying ? `${h}%` : '20%' }}
                ></div>
              ))}
            </div>
          </div>

          {/* Audio Play/Pause Button on Overlay */}
          <button
            onClick={onTogglePlay}
            className="p-2 rounded-lg bg-stone-950/85 hover:bg-stone-850 text-white border border-stone-700/80 shadow transition"
            title={isPlaying ? 'Pausar transmisión de audio' : 'Reproducir audio de cabina'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 ml-0.5 text-amber-400" />}
          </button>

          <button
            onClick={handleToggleMute}
            className="p-2 rounded-lg bg-stone-950/85 hover:bg-stone-850 text-white border border-stone-700/80 shadow transition"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-white" />}
          </button>
        </div>

        {/* Television Lower Third (Zócalo televisivo en vivo) */}
        <div className="absolute bottom-8 left-4 right-4 z-20 pointer-events-none">
          <div className="max-w-2xl bg-stone-950/95 border-l-4 border-amber-500 rounded-r-xl p-3 shadow-2xl backdrop-blur-md border-y border-r border-stone-800 pointer-events-auto">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-bold text-[10px] uppercase tracking-wider">
                PROGRAMA ESTELAR MATUTINO
              </span>
              <span className="text-[11px] text-stone-400 font-mono">
                {activeCamera?.viewAngle}
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold font-serif text-white leading-tight">
              {streamData.currentSegment}
            </h4>
            <div className="flex items-center gap-3 text-xs text-stone-300 mt-1">
              <span className="text-amber-400 font-medium">Conductores: Lic. Elisandro Alvarez Baez & Lic. Esthefany Pichardo Ramirez</span>
              <span className="text-stone-600 hidden sm:inline">•</span>
              <span className="text-sky-300 hidden sm:inline">Invitado: Ing. Roberto Herrera</span>
            </div>
          </div>
        </div>

        {/* Bottom Scrolling News Ticker */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-stone-950/95 border-t border-stone-800 flex items-center overflow-hidden z-20">
          <div className="bg-red-600 text-white font-bold text-[11px] uppercase tracking-wider px-3 h-full flex items-center shrink-0 z-10">
            ELINOTICIA AL DÍA
          </div>
          <div className="px-3 text-xs font-mono text-stone-200 truncate flex-1 animate-fadeIn">
            {streamData.tickerNews[currentTickerIndex]}
          </div>
        </div>
      </div>

      {/* Multi-Camera Switcher Controls (Consola de Realización de Cámaras) */}
      <div className="bg-stone-950 rounded-2xl p-4 sm:p-5 border border-stone-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Control de Cámaras del Estudio (Multi-Cam Switcher)
            </span>
          </div>
          <span className="text-[11px] text-stone-400">
            Haz clic en una cámara para cambiar la toma en directo
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {cameras.map((cam) => {
            const isCurrent = cam.id === activeCameraId;
            return (
              <button
                key={cam.id}
                onClick={() => handleCameraChange(cam.id)}
                className={`relative rounded-xl overflow-hidden p-2.5 text-left border transition group ${
                  isCurrent 
                    ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/40 shadow-lg' 
                    : 'bg-stone-900 border-stone-800 hover:bg-stone-850 hover:border-stone-700'
                }`}
              >
                {/* Thumbnail Preview */}
                <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-stone-950">
                  <img
                    src={cam.previewImageUrl}
                    alt={cam.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {isCurrent && (
                    <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-red-600 text-white text-[9px] font-bold font-mono px-1.5 py-0.5 rounded shadow">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      <span>EN EL AIRE</span>
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 bg-stone-950/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-stone-300">
                    {cam.label}
                  </div>
                </div>

                <h5 className="text-xs font-bold text-white truncate">
                  {cam.name}
                </h5>
                <p className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">
                  {cam.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Roster of Commentators and Studio Guests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Comentaristas & Invitados de Este Canal (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Section: Comentaristas en Cabina */}
          <div className="bg-stone-950/90 rounded-2xl p-5 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Comentaristas del Programa en Cabina
                </h3>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300">
                Mesa Principal
              </span>
            </div>

            <div className="space-y-3">
              {streamData.commentators.map((comm) => (
                <div
                  key={comm.id}
                  className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 hover:border-stone-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={comm.avatarUrl}
                        alt={comm.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-stone-700"
                      />
                      {comm.isSpeaking && (
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-stone-900 flex items-center justify-center shadow">
                          <Mic className="w-2.5 h-2.5 text-stone-950" />
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{comm.name}</h4>
                        {comm.isSpeaking ? (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                            Hablando
                          </span>
                        ) : (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-800 text-stone-400 font-medium">
                            En espera
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-amber-400 font-medium">{comm.role}</p>
                      <p className="text-[11px] text-stone-400 mt-0.5">{comm.notes}</p>
                    </div>
                  </div>

                  {/* Switch to this commentator's camera */}
                  <button
                    onClick={() => handleCameraChange(comm.cameraRef)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition ${
                      activeCameraId === comm.cameraRef
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>{activeCameraId === comm.cameraRef ? 'En Pantalla' : 'Enfocar Cámara'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Invitados Especiales del Día */}
          <div className="bg-stone-950/90 rounded-2xl p-5 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Invitados Especiales de la Jornada
                </h3>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                Panel Exclusivo
              </span>
            </div>

            <div className="space-y-3">
              {streamData.guests.map((guest) => (
                <div
                  key={guest.id}
                  className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 hover:border-sky-700/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={guest.avatarUrl}
                        alt={guest.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-sky-600/60"
                      />
                      {guest.isSpeaking && (
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-stone-900 flex items-center justify-center shadow">
                          <Mic className="w-2.5 h-2.5 text-stone-950" />
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-white">{guest.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-sky-300 font-mono">
                          {guest.connectionType}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 font-medium">
                        {guest.title} • <span className="text-amber-400">{guest.organization}</span>
                      </p>
                      <p className="text-[11px] text-stone-400 mt-1 font-reading">
                        <strong>Tema:</strong> "{guest.topic}"
                      </p>
                    </div>
                  </div>

                  {/* Switch to this guest's camera */}
                  <button
                    onClick={() => handleCameraChange(guest.cameraRef)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition ${
                      activeCameraId === guest.cameraRef
                        ? 'bg-sky-500 text-stone-950 font-bold'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>{activeCameraId === guest.cameraRef ? 'En Pantalla' : 'Enfocar Cámara'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Chat & Audience Interaction (5 Cols) */}
        <div className="lg:col-span-5 bg-stone-950/90 rounded-2xl p-5 border border-stone-800 flex flex-col justify-between h-[560px]">
          <div>
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Interacción con la Audiencia en Directo
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                CHAT EN VIVO
              </span>
            </div>
            <p className="text-[11px] text-stone-400 mb-3">
              Envía tus preguntas y opiniones en tiempo real a los comentaristas e invitados en cabina.
            </p>

            {/* Messages Scroll Area */}
            <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1 font-sans">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2.5 rounded-xl text-xs border ${
                    msg.isHost
                      ? 'bg-amber-500/10 border-amber-500/40 text-stone-200'
                      : 'bg-stone-900/80 border-stone-800 text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`font-bold ${msg.isHost ? 'text-amber-400' : 'text-white'}`}>
                      {msg.author}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono">{msg.timestamp}</span>
                  </div>
                  <span className="text-[10px] text-stone-400 block mb-1">
                    📍 {msg.location}
                  </span>
                  <p className="text-stone-200 leading-relaxed font-reading">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="mt-3 pt-3 border-t border-stone-800 flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Escribe una pregunta para la cabina..."
              className="flex-1 bg-stone-900 border border-stone-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition shrink-0"
              title="Enviar pregunta"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
