import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/** A local silent film with a static first paint and explicit playback control. */
export function HeroFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const update = () => {
      const shouldPlay =
        !media.matches && !connection?.saveData && window.innerWidth > 760;
      setEnabled(shouldPlay);
      if (!shouldPlay) setReady(false);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || !video.current || !frame.current) return;
    const element = video.current;
    let visible = true;
    const update = () => {
      if (visible && !document.hidden && !pausedByUser) {
        void element.play().catch(() => setPlaying(false));
      } else element.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { threshold: 0.15 },
    );
    observer.observe(frame.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      element.pause();
    };
  }, [enabled, pausedByUser]);

  function toggle() {
    if (playing) {
      setPausedByUser(true);
      video.current?.pause();
    } else {
      setEnabled(true);
      setPausedByUser(false);
      void video.current?.play().catch(() => setPlaying(false));
    }
  }

  return (
    <div ref={frame} className={`hero-film ${ready ? "film-ready" : ""}`}>
      <img
        className="hero-screen film-poster"
        src="/projects/edisol.webp"
        width="1920"
        height="1080"
        alt="Vista del software de Edisol. La secuencia muestra también el CRM de Aenogen y las operaciones de Dorado Telecom."
        fetchPriority="high"
      />
      {enabled && (
        <video
          ref={video}
          className="film-video"
          src="/media/product-tour.mp4"
          poster="/projects/edisol.webp"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => {
            setReady(true);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          onError={() => {
            setEnabled(false);
            setReady(false);
            setPlaying(false);
          }}
        />
      )}
      <div className="film-caption" aria-hidden="true">
        <span className="film-indicator" /> SOFTWARE REAL, EN PRIMER PLANO
      </div>
      <button
        type="button"
        className="film-toggle"
        onClick={toggle}
        aria-label={
          playing
            ? "Pausar vídeo de proyectos"
            : "Reproducir vídeo de proyectos"
        }
      >
        {playing ? <Pause size={14} /> : <Play size={14} />}
        <span>{playing ? "Pausar" : "Ver vídeo"}</span>
      </button>
    </div>
  );
}
