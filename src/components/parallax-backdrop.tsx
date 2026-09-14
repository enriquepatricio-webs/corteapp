import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ParallaxBackdrop() {
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  return (
    <div className="parallax-backdrop" ref={target} aria-hidden="true">
      <motion.img
        src="/media/software-studio.webp"
        alt=""
        width="1659"
        height="948"
        loading="lazy"
        decoding="async"
        style={{ y }}
      />
    </div>
  );
}
