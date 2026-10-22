'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface CoffeeVideoProps {
  className?: string;
  showControls?: boolean;
}

export function CoffeeVideo({
  className = '',
  showControls = true,
}: CoffeeVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure audio starts muted for reliable browser autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 1.0;

    // Attempt autoplay
    const tryPlay = () => {
      const p = video.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    };
    tryPlay();

    // Sync React state from DOM events as the single source of truth
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVolume = () => {
      if (videoRef.current) {
        setIsMuted(videoRef.current.muted);
      }
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('volumechange', onVolume);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('volumechange', onVolume);
      video.pause();
    };
  }, []);

  // ── Toggle play / pause ───────────────────────────────────────────────────

  const togglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        video.muted = true;
        video.defaultMuted = true;
        setIsMuted(true);
        try {
          await video.play();
        } catch {
          /* swallow */
        }
      }
    } else {
      video.pause();
    }
  }, []);

  // ── Toggle mute ───────────────────────────────────────────────────────────

  const toggleMute = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    video.defaultMuted = nextMuted;

    if (!nextMuted) {
      video.volume = 1.0;
      // Many browsers require re-triggering play() under the click event to unlock audio
      try {
        await video.play();
      } catch (err) {
        console.warn('Playback resume error:', err);
      }
    }

    setIsMuted(video.muted);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 w-full h-full overflow-hidden select-none z-0 bg-black ${className}`}
        aria-label="Coffee pouring background video"
      >
        <video
          ref={videoRef}
          src="/videos/coffee-pour.mp4"
          autoPlay
          loop
          playsInline
          preload="auto"
          muted
          className="w-full h-full object-cover"
        />

        {/* Warm vignette */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-black/20 to-black/40"
          style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)' }}
        />

        {/* Warm amber lighting accent */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#3E271D]/25 via-transparent to-[#C87D32]/15 mix-blend-overlay" />
      </div>

      {/* Audio & Playback Controls — Elevated to z-40 outside z-0 so it is never occluded */}
      {showControls && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 bg-[#2C1E16]/85 backdrop-blur-md border border-[#E8E3D9]/25 rounded-full px-3 py-1.5 shadow-xl text-[#FAF8F5] pointer-events-auto select-none">
          <span className="text-[10px] font-mono tracking-wider text-[#E8E3D9]/70 pr-2 border-r border-[#E8E3D9]/20 uppercase">
            COFFEE POUR
          </span>

          <button
            type="button"
            onClick={togglePlay}
            className="p-1.5 text-[#E8E3D9] hover:text-[#FAF8F5] transition-colors rounded-full focus:outline-none cursor-pointer"
            title={isPlaying ? 'Pause Video' : 'Play Video'}
            aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 text-[#C87D32]" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="p-1.5 text-[#E8E3D9] hover:text-[#FAF8F5] transition-colors rounded-full focus:outline-none cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#C87D32]" />
            )}
          </button>
        </div>
      )}
    </>
  );
}
