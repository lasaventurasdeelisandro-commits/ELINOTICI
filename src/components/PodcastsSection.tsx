import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, 
  Headphones, Clock, Sparkles, FileText, ChevronDown, ChevronUp 
} from 'lucide-react';
import { PodcastEpisode } from '../types';

interface PodcastsSectionProps {
  podcasts: PodcastEpisode[];
}

export const PodcastsSection: React.FC<PodcastsSectionProps> = ({ podcasts }) => {
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode>(podcasts[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.log(e));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = parseFloat(e.target.value);
    setCurrentTime(target);
    if (audioRef.current) {
      audioRef.current.currentTime = target;
    }
  };

  const skipSeconds = (sec: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + sec));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectEpisode = (ep: PodcastEpisode) => {
    setCurrentEpisode(ep);
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.src = ep.audioUrl;
      audioRef.current.load();
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <section className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-xl overflow-hidden relative">
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">
            <Headphones className="w-4 h-4" />
            <span>ELINOTICIA Radio & Audio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Boletines Informativos y Análisis en Audio
          </h2>
        </div>
        <span className="text-xs text-stone-400 bg-stone-800 px-3 py-1.5 rounded-full">
          Actualizado diariamente • Santo Domingo
        </span>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentEpisode?.audioUrl}
        onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Player Card */}
        <div className="lg:col-span-7 bg-stone-950/80 rounded-xl p-5 sm:p-6 border border-stone-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-4 mb-4">
              <img
                src={currentEpisode?.imageUrl}
                alt={currentEpisode?.title}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover shadow border border-stone-800 shrink-0"
              />
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  {currentEpisode?.show} • {currentEpisode?.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-white leading-snug mt-1">
                  {currentEpisode?.title}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Con: <span className="text-stone-300 font-medium">{currentEpisode?.host}</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-300 font-reading leading-relaxed mb-4">
              {currentEpisode?.summary}
            </p>

            {/* Key Takeaways */}
            <div className="p-3 bg-stone-900/90 rounded-lg border border-stone-800 text-xs text-stone-300 mb-4">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Puntos clave del episodio:</span>
              </div>
              <ul className="space-y-1">
                {currentEpisode?.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-stone-300">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Player Controls & Waveform */}
          <div className="space-y-3 pt-2">
            {/* Scrubber */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || currentEpisode?.durationSeconds || 0)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {/* Speed buttons */}
                {[1, 1.25, 1.5].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setPlaybackRate(rate)}
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      playbackRate === rate ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>

              {/* Main Playback Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => skipSeconds(-15)}
                  className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition"
                  title="Retroceder 15s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center font-bold shadow-lg transition transform active:scale-95"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <button
                  onClick={() => skipSeconds(15)}
                  className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition"
                  title="Avanzar 15s"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              {/* Transcript toggle */}
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-xs font-semibold text-stone-400 hover:text-amber-400 flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Transcripción</span>
              </button>
            </div>

            {/* Transcript Drawer */}
            {showTranscript && (
              <div className="mt-3 p-3 bg-stone-900 rounded-lg text-xs text-stone-300 font-reading max-h-40 overflow-y-auto leading-relaxed border border-stone-800">
                <p className="font-bold text-amber-400 mb-1">Transcripción íntegra:</p>
                <p>{currentEpisode?.transcript}</p>
              </div>
            )}
          </div>
        </div>

        {/* Playlist of Episodes */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Episodios y Boletines Disponibles
          </span>

          <div className="space-y-2.5 overflow-y-auto max-h-[460px] pr-1">
            {podcasts.map((ep) => {
              const active = currentEpisode?.id === ep.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => handleSelectEpisode(ep)}
                  className={`p-3 rounded-xl border transition cursor-pointer flex items-center gap-3 ${
                    active 
                      ? 'bg-amber-500/10 border-amber-500/50 text-white' 
                      : 'bg-stone-950/60 border-stone-800/80 hover:bg-stone-800/60 text-stone-300'
                  }`}
                >
                  <img
                    src={ep.imageUrl}
                    alt={ep.title}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase text-amber-400 block truncate">
                      {ep.show}
                    </span>
                    <h4 className="text-xs font-bold font-serif line-clamp-2 text-stone-100">
                      {ep.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ep.duration}
                      </span>
                      <span>•</span>
                      <span className="truncate">{ep.host}</span>
                    </div>
                  </div>

                  <button
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      active && isPlaying ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-200'
                    }`}
                  >
                    {active && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
