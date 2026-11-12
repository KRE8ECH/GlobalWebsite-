"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Navigation,
  Compass,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
} from "lucide-react";

interface Chapter {
  label: string;
  sub: string;
  timeSec: number;
}

const TOUR_CHAPTERS: Chapter[] = [
  { label: "Campus Gateway", sub: "20-Acre Green Entry", timeSec: 0 },
  { label: "Academic Blocks", sub: "Lecture Theatres", timeSec: 15 },
  { label: "Computing & AI Labs", sub: "High-End Workstations", timeSec: 35 },
  { label: "Sports & Athletics", sub: "Cricket & Courts", timeSec: 65 },
  { label: "Central Library", sub: "DELNET & Research", timeSec: 85 },
];

interface CampusVideoPlayerProps {
  onBackToMap?: () => void;
  className?: string;
  autoPlay?: boolean;
}

export default function CampusVideoPlayer({
  onBackToMap,
  className = "",
  autoPlay = true,
}: CampusVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true); // Default muted for browser autoplay policy
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(95.5);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      // Determine active chapter
      for (let i = TOUR_CHAPTERS.length - 1; i >= 0; i--) {
        if (video.currentTime >= TOUR_CHAPTERS[i].timeSec) {
          setActiveChapter(i);
          break;
        }
      }
    };

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    if (autoPlay) {
      video.play().catch(() => {
        // Autoplay may be blocked if unmuted
        setIsPlaying(false);
      });
    }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, [autoPlay]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const jumpToChapter = (timeSec: number, index: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = timeSec;
    setActiveChapter(index);
    if (!isPlaying) {
      video.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-md overflow-hidden border-2 border-amber-500/40 bg-black shadow-2xl flex flex-col group/video ${className}`}
    >
      {/* HTML5 Native Video Tag */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src="/videos/gitm_campus_tour.mp4"
          poster="/videos/thumb_2s.jpg"
          playsInline
          muted={isMuted}
          className="w-full h-full object-cover cursor-pointer"
          onClick={togglePlay}
        />

        {/* Unmute Prompt Banner (If muted on autoplay) */}
        {isMuted && isPlaying && (
          <div className="absolute top-4 right-4 z-30">
            <button
              type="button"
              onClick={toggleMute}
              className="bg-amber-600/90 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xs border border-white/25 shadow-lg flex items-center gap-1.5 backdrop-blur-md cursor-pointer transition-colors"
            >
              <VolumeX className="h-4 w-4 animate-bounce" />
              <span>Click to Unmute Tour Audio</span>
            </button>
          </div>
        )}

        {/* Top Floating Badge Bar */}
        <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none z-20">
          <span className="bg-[#881337] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs shadow-md border border-amber-400/30 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-300" />
            <span>Official GITM Campus Tour</span>
          </span>

          <span className="bg-black/80 text-amber-300 text-[10px] font-mono px-2 py-1 rounded-xs border border-white/20">
            {TOUR_CHAPTERS[activeChapter]?.label}
          </span>
        </div>

        {/* Centered Play/Pause Button overlay on hover or when paused */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer z-20"
          >
            <div className="h-16 w-16 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-2xl border-2 border-white hover:scale-110 transition-transform">
              <Play className="h-8 w-8 ml-1 fill-stone-950" />
            </div>
          </div>
        )}
      </div>

      {/* Video Controls Bar */}
      <div className="bg-[#0b1e32] p-3 text-white border-t border-white/15 space-y-2">
        {/* Progress Scrubber */}
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={duration || 95}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-amber-500 cursor-pointer h-1.5 bg-stone-700 rounded-lg"
          />
          <span className="text-[11px] font-mono text-stone-300 whitespace-nowrap">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Left Buttons: Play/Pause, Mute, Back to Map */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xs text-white transition-colors cursor-pointer"
              title={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xs text-white transition-colors cursor-pointer flex items-center gap-1"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-4 w-4 text-amber-400" /> : <Volume2 className="h-4 w-4" />}
            </button>

            {onBackToMap && (
              <button
                type="button"
                onClick={onBackToMap}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white rounded-xs font-mono text-xs uppercase flex items-center gap-1 transition-colors cursor-pointer ml-1"
              >
                <Navigation className="h-3 w-3 text-amber-400" />
                <span>Back to Map Flight</span>
              </button>
            )}
          </div>

          {/* Right Buttons: Fullscreen & Status */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-stone-400">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              <span>AICTE & Gurugram Univ Verified</span>
            </span>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xs text-white transition-colors cursor-pointer"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tour Chapters Quick Jump Toolbar */}
        <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] uppercase font-bold text-amber-400 font-mono shrink-0 mr-1 flex items-center gap-1">
            <Layers className="h-3 w-3" /> Jump:
          </span>
          {TOUR_CHAPTERS.map((chap, idx) => {
            const isActive = idx === activeChapter;
            return (
              <button
                key={chap.label}
                type="button"
                onClick={() => jumpToChapter(chap.timeSec, idx)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded-xs whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "bg-amber-600 text-white font-bold shadow-xs"
                    : "bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white"
                }`}
              >
                {chap.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
