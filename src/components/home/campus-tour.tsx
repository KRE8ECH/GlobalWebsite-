"use client";

import * as React from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

/**
 * Official campus tour video.
 * ---------------------------------------------------------------------------
 * The previous player autoplayed a 18 MB MP4 on page load, which is brutal on a
 * mobile connection and hurts Core Web Vitals. This shows the poster until the
 * visitor asks for the video, then streams it with metadata preload only.
 *
 * Trade-off accepted: one extra click for visitors who want the video, in
 * exchange for not shipping 18 MB to everyone who doesn't.
 */
export function CampusTour() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [started, setStarted] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const start = () => {
    setStarted(true);
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().then(() => setPlaying(true));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void container.requestFullscreen?.().catch(() => {});
    }
  };

  return (
    <figure id="tour" className="scroll-mt-32">
      <div
        ref={containerRef}
        className="group relative aspect-video overflow-hidden rounded-md border border-stone-200 bg-navy"
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster="/images/web/banner/10_Banner-1.webp"
          preload="none"
          playsInline
          muted={muted}
          onTimeUpdate={(event) => {
            const video = event.currentTarget;
            setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
          }}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          aria-label="Official GITM Gurugram campus tour"
        >
          <source src="/videos/gitm_campus_tour.mp4" type="video/mp4" />
          Your browser cannot play this video. You can{" "}
          <a href="/videos/gitm_campus_tour.mp4" className="underline">
            download the campus tour
          </a>
          .
        </video>

        {/* Poster overlay — only before the visitor starts playback. */}
        {!started && (
          <button
            type="button"
            onClick={start}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy/45 transition-colors hover:bg-navy/30"
            aria-label="Play the official campus tour video"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-navy shadow-xl transition-transform group-hover:scale-105">
              <Play className="ml-1 h-7 w-7 fill-navy" aria-hidden="true" />
            </span>
            <span className="rounded-sm bg-navy/85 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
              Campus tour · 1 min 35 s
            </span>
          </button>
        )}

        {/* Controls, only once playback has begun. */}
        {started && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-3">
            <div
              className="h-1 w-full overflow-hidden rounded-full bg-white/25"
              role="progressbar"
              aria-label="Video progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <div className="h-full bg-gold" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggle}
                className="rounded-sm bg-white/15 p-2 text-white hover:bg-white/25"
                aria-label={playing ? "Pause video" : "Play video"}
              >
                {playing ? (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Play className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="rounded-sm bg-white/15 p-2 text-white hover:bg-white/25"
                aria-label={muted ? "Unmute video" : "Mute video"}
              >
                {muted ? (
                  <VolumeX className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Volume2 className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
              <span className="ml-1 font-mono text-[11px] text-stone-200" aria-hidden="true">
                {formatTime(progress, duration)}
              </span>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="ml-auto rounded-sm bg-white/15 p-2 text-white hover:bg-white/25"
                aria-label="Toggle fullscreen"
              >
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>

      <figcaption className="mt-2 text-[11px] text-stone-500">
        Official campus tour filmed at GITM Gurugram, Farrukhnagar.{" "}
        <a
          href="/videos/gitm_campus_tour.mp4"
          className="font-semibold text-navy underline"
          download
        >
          Download
        </a>{" "}
        (MP4, 18 MB).
      </figcaption>
    </figure>
  );
}

function formatTime(percent: number, duration: number) {
  if (!duration) return "0:00";
  const seconds = Math.round((percent / 100) * duration);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const total = Math.floor(duration / 60);
  return `${m}:${String(s).padStart(2, "0")} / ${total}:${String(Math.floor(duration % 60)).padStart(2, "0")}`;
}
