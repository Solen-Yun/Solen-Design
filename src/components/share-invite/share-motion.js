/* Motion constants and a damped-spring ease for the share panel.
   Widths: open 320px / collapsed 200px. Durations in seconds. */
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

export const SHARE_MOTION = {
  open: {
    width: { stiffness: 306.25, damping: 28, duration: 0.7, delay: 0 },
    height: { stiffness: 196, damping: 18.34, duration: 0.86, delay: 0.057 },
  },
  close: {
    width: { stiffness: 400, damping: 33, duration: 0.64, delay: 0.07 },
    height: { stiffness: 600.25, damping: 43.365, duration: 0.62, delay: 0 },
  },
  resize: { stiffness: 196, damping: 18.34, duration: 0.45 },
};

/* A GSAP ease that follows the analytic response of an underdamped spring:
   x(t) = 1 - e^(-ζω₀t)·(cos(ωt) + ζω₀/ω·sin(ωt)), sampled into a CustomEase. */
let counter = 0;
export function springEase(stiffness = 200, damping = 20, duration = 1) {
  const omega0 = Math.sqrt(stiffness);
  const zeta = damping / (2 * omega0);
  const omega = omega0 * Math.sqrt(Math.max(0, 1 - zeta * zeta));
  const steps = 64;
  const span = Math.max(duration, 0.001) * 1.9;
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * span;
    let p;
    if (omega > 0) {
      p = 1 - Math.exp(-zeta * omega0 * t) * (Math.cos(omega * t) + (zeta * omega0 / omega) * Math.sin(omega * t));
    } else {
      p = 1 - (1 + omega0 * t) * Math.exp(-omega0 * t);
    }
    p = Math.max(0, Math.min(1.12, p));
    points.push(`${((i / steps) * 100).toFixed(3)},${(p * 100).toFixed(3)}`);
  }
  return CustomEase.create(`spring-${stiffness}-${damping}-${duration}-${counter++}`, `M${points.join(' L')}`);
}
