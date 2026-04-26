import React, { useEffect, useState, memo } from "react";
import {
  SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign,
  SiWordpress, SiFigma, SiCanva,
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact,
  SiTailwindcss, SiVite, SiNodedotjs,
  SiGithub,
  SiFacebook, SiInstagram, SiTiktok,
  SiGoogleanalytics,
  SiSlack, SiAsana, SiZendesk, SiGoogledrive,
  SiMysql, SiMongodb, SiWix,
} from "react-icons/si";
import { TbScissors, TbMovie, TbBrandWindows, TbSparkles } from "react-icons/tb";
import { useIsMobile } from "../../hooks/useIsMobile";

type GlowColor = "cyan" | "purple" | "orange" | "green";

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  icon: React.ReactNode;
  iconColor: string;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

const TAU = 2 * Math.PI;

const skillsConfig: SkillConfig[] = [
  // ── Orbit 1 · Core web (r=90, cyan, 5) ──────────────────────────────
  { id: "html",     orbitRadius: 90,  size: 34, speed:  0.8,  icon: <SiHtml5 />,          iconColor: "#E34F26", phaseShift: 0,          glowColor: "cyan",   label: "HTML5" },
  { id: "css",      orbitRadius: 90,  size: 34, speed:  0.8,  icon: <SiCss3 />,           iconColor: "#1572B6", phaseShift: TAU/5,      glowColor: "cyan",   label: "CSS3" },
  { id: "js",       orbitRadius: 90,  size: 34, speed:  0.8,  icon: <SiJavascript />,     iconColor: "#F7DF1E", phaseShift: (2*TAU)/5,  glowColor: "cyan",   label: "JavaScript" },
  { id: "ts",       orbitRadius: 90,  size: 34, speed:  0.8,  icon: <SiTypescript />,     iconColor: "#3178C6", phaseShift: (3*TAU)/5,  glowColor: "cyan",   label: "TypeScript" },
  { id: "github",   orbitRadius: 90,  size: 34, speed:  0.8,  icon: <SiGithub />,         iconColor: "#ffffff", phaseShift: (4*TAU)/5,  glowColor: "cyan",   label: "GitHub" },

  // ── Orbit 2 · React ecosystem + DB (r=165, purple, 7) ───────────────
  { id: "react",    orbitRadius: 165, size: 36, speed: -0.5,  icon: <SiReact />,          iconColor: "#61DAFB", phaseShift: 0,          glowColor: "purple", label: "React" },
  { id: "tailwind", orbitRadius: 165, size: 36, speed: -0.5,  icon: <SiTailwindcss />,    iconColor: "#06B6D4", phaseShift: TAU/7,      glowColor: "purple", label: "Tailwind" },
  { id: "vite",     orbitRadius: 165, size: 36, speed: -0.5,  icon: <SiVite />,           iconColor: "#646CFF", phaseShift: (2*TAU)/7,  glowColor: "purple", label: "Vite" },
  { id: "node",     orbitRadius: 165, size: 36, speed: -0.5,  icon: <SiNodedotjs />,      iconColor: "#339933", phaseShift: (3*TAU)/7,  glowColor: "purple", label: "Node.js" },
  { id: "mysql",    orbitRadius: 165, size: 36, speed: -0.5,  icon: <SiMysql />,          iconColor: "#4479A1", phaseShift: (4*TAU)/7,  glowColor: "purple", label: "MySQL" },
  { id: "mongodb",  orbitRadius: 165, size: 36, speed: -0.5,  icon: <SiMongodb />,        iconColor: "#47A248", phaseShift: (5*TAU)/7,  glowColor: "purple", label: "MongoDB" },
  { id: "wp",       orbitRadius: 165, size: 36, speed: -0.5,  icon: <SiWordpress />,      iconColor: "#21759B", phaseShift: (6*TAU)/7,  glowColor: "purple", label: "WordPress" },

  // ── Orbit 3 · Design (r=250, orange, 9) ─────────────────────────────
  { id: "ps",       orbitRadius: 250, size: 38, speed:  0.3,  icon: <SiAdobephotoshop />, iconColor: "#31A8FF", phaseShift: 0,          glowColor: "orange", label: "Photoshop" },
  { id: "ai",       orbitRadius: 250, size: 38, speed:  0.3,  icon: <SiAdobeillustrator />,iconColor:"#FF9A00", phaseShift: TAU/9,      glowColor: "orange", label: "Illustrator" },
  { id: "indd",     orbitRadius: 250, size: 38, speed:  0.3,  icon: <SiAdobeindesign />,  iconColor: "#FF3366", phaseShift: (2*TAU)/9,  glowColor: "orange", label: "InDesign" },
  { id: "figma",    orbitRadius: 250, size: 38, speed:  0.3,  icon: <SiFigma />,          iconColor: "#F24E1E", phaseShift: (3*TAU)/9,  glowColor: "orange", label: "Figma" },
  { id: "canva",    orbitRadius: 250, size: 38, speed:  0.3,  icon: <SiCanva />,          iconColor: "#00C4CC", phaseShift: (4*TAU)/9,  glowColor: "orange", label: "Canva" },
  { id: "mj",       orbitRadius: 250, size: 38, speed:  0.3,  icon: <TbSparkles />,       iconColor: "#9B59B6", phaseShift: (5*TAU)/9,  glowColor: "orange", label: "Midjourney" },
  { id: "capcut",   orbitRadius: 250, size: 38, speed:  0.3,  icon: <TbScissors />,       iconColor: "#cccccc", phaseShift: (6*TAU)/9,  glowColor: "orange", label: "CapCut" },
  { id: "fcp",      orbitRadius: 250, size: 38, speed:  0.3,  icon: <TbMovie />,          iconColor: "#aaaaaa", phaseShift: (7*TAU)/9,  glowColor: "orange", label: "Final Cut" },
  { id: "wix",      orbitRadius: 250, size: 38, speed:  0.3,  icon: <SiWix />,            iconColor: "#cccccc", phaseShift: (8*TAU)/9,  glowColor: "orange", label: "Wix" },

  // ── Orbit 4 · Ads + Productividad (r=335, green, 9) ─────────────────
  { id: "fb",       orbitRadius: 335, size: 36, speed: -0.2,  icon: <SiFacebook />,       iconColor: "#1877F2", phaseShift: 0,          glowColor: "green",  label: "Facebook Ads" },
  { id: "ig",       orbitRadius: 335, size: 36, speed: -0.2,  icon: <SiInstagram />,      iconColor: "#E4405F", phaseShift: TAU/9,      glowColor: "green",  label: "Instagram Ads" },
  { id: "tiktok",   orbitRadius: 335, size: 36, speed: -0.2,  icon: <SiTiktok />,         iconColor: "#cccccc", phaseShift: (2*TAU)/9,  glowColor: "green",  label: "TikTok Ads" },
  { id: "ga",       orbitRadius: 335, size: 36, speed: -0.2,  icon: <SiGoogleanalytics />,iconColor: "#E37400", phaseShift: (3*TAU)/9,  glowColor: "green",  label: "Google Analytics" },
  { id: "slack",    orbitRadius: 335, size: 36, speed: -0.2,  icon: <SiSlack />,          iconColor: "#4A154B", phaseShift: (4*TAU)/9,  glowColor: "green",  label: "Slack" },
  { id: "asana",    orbitRadius: 335, size: 36, speed: -0.2,  icon: <SiAsana />,          iconColor: "#F06A6A", phaseShift: (5*TAU)/9,  glowColor: "green",  label: "Asana" },
  { id: "zendesk",  orbitRadius: 335, size: 36, speed: -0.2,  icon: <SiZendesk />,        iconColor: "#03363D", phaseShift: (6*TAU)/9,  glowColor: "green",  label: "Zendesk" },
  { id: "gdrive",   orbitRadius: 335, size: 36, speed: -0.2,  icon: <SiGoogledrive />,    iconColor: "#4285F4", phaseShift: (7*TAU)/9,  glowColor: "green",  label: "Google Suite" },
  { id: "ms365",    orbitRadius: 335, size: 36, speed: -0.2,  icon: <TbBrandWindows />,   iconColor: "#00A4EF", phaseShift: (8*TAU)/9,  glowColor: "green",  label: "Microsoft 365" },
];

const glowColors = {
  cyan:   { primary: "rgba(6,182,212,0.35)",   secondary: "rgba(6,182,212,0.15)",   border: "rgba(6,182,212,0.25)" },
  purple: { primary: "rgba(147,51,234,0.35)",  secondary: "rgba(147,51,234,0.15)",  border: "rgba(147,51,234,0.25)" },
  orange: { primary: "rgba(251,146,60,0.35)",  secondary: "rgba(251,146,60,0.15)",  border: "rgba(251,146,60,0.25)" },
  green:  { primary: "rgba(34,197,94,0.35)",   secondary: "rgba(34,197,94,0.15)",   border: "rgba(34,197,94,0.25)" },
};

// Orbit definitions: period = 2π / |speed|, reverse = speed < 0
const orbitDefs = [
  { radius: 90,  period: TAU / 0.8,  reverse: false, glowColor: "cyan"   as GlowColor, delay: 0 },
  { radius: 165, period: TAU / 0.5,  reverse: true,  glowColor: "purple" as GlowColor, delay: 1 },
  { radius: 250, period: TAU / 0.3,  reverse: false, glowColor: "orange" as GlowColor, delay: 2 },
  { radius: 335, period: TAU / 0.2,  reverse: true,  glowColor: "green"  as GlowColor, delay: 3 },
];

const CSS_KEYFRAMES = `
@keyframes orbit-cw  { to { transform: rotate(360deg)  } }
@keyframes orbit-ccw { to { transform: rotate(-360deg) } }
`;

const OrbitPath = memo(({ radius, glowColor, delay = 0 }: { radius: number; glowColor: GlowColor; delay?: number }) => {
  const c = glowColors[glowColor];
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${c.secondary} 70%, ${c.primary} 100%)`,
          boxShadow: `0 0 40px ${c.primary}, inset 0 0 40px ${c.secondary}`,
          animation: `pulse 4s ease-in-out ${delay}s infinite`,
        }}
      />
      <div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${c.border}` }} />
    </div>
  );
});
OrbitPath.displayName = "OrbitPath";

const OrbitItem = memo(({ config, isMobile }: { config: SkillConfig; isMobile: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const { size, icon, iconColor, label } = config;

  return (
    <div
      style={{ width: size, height: size, position: "relative", zIndex: hovered ? 30 : 10 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full h-full rounded-full bg-gray-900/80 flex items-center justify-center cursor-pointer transition-all duration-200"
        style={{
          backdropFilter: isMobile ? "none" : "blur(4px)",
          WebkitBackdropFilter: isMobile ? "none" : "blur(4px)",
          transform: hovered ? "scale(1.3)" : "scale(1)",
          boxShadow: hovered ? `0 0 24px ${iconColor}60, 0 0 48px ${iconColor}30` : undefined,
          fontSize: size * 0.52,
          color: iconColor,
        }}
      >
        {icon}
        <div
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none text-zinc-200 font-bold"
          style={{ top: "100%", marginTop: 4, fontSize: 12 }}
        >
          {label}
        </div>
      </div>
    </div>
  );
});
OrbitItem.displayName = "OrbitItem";

const INNER = 700;

export function OrbitingSkills() {
  const isMobile = useIsMobile();
  const [inView, setInView] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.4) setInView(true);
        else if (entry.intersectionRatio < 0.1) setInView(false);
      },
      { threshold: [0.1, 0.4] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const calcSize = (w: number) => {
    const base = Math.min(w - 40, INNER);
    return w < 768 ? Math.min(base * 1.3, INNER) : base;
  };

  const [size, setSize] = useState(() =>
    typeof window !== "undefined" ? calcSize(window.innerWidth) : INNER
  );

  useEffect(() => {
    const onResize = () => setSize(calcSize(window.innerWidth));
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scale = size / INNER;
  const playState = inView ? "running" : "paused";

  return (
    <>
      <style>{CSS_KEYFRAMES}</style>
      <div
        ref={containerRef}
        className="flex items-center justify-center w-full"
        style={{ height: size }}
      >
        <div
          style={{ width: INNER, height: INNER, transform: `scale(${scale})`, transformOrigin: "center" }}
        >
          <div className="relative w-full h-full flex items-center justify-center">

            {/* Center icon */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center z-10 relative shadow-2xl">
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#orb-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                <defs>
                  <linearGradient id="orb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#9333EA" />
                  </linearGradient>
                </defs>
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>

            {/* Orbit rings (decorative) */}
            {orbitDefs.map(o => (
              <OrbitPath key={o.radius} radius={o.radius} glowColor={o.glowColor} delay={o.delay} />
            ))}

            {/* CSS-driven orbiting items */}
            {orbitDefs.map(orb => {
              const skills = skillsConfig.filter(s => s.orbitRadius === orb.radius);
              const spinAnim  = orb.reverse ? "orbit-ccw" : "orbit-cw";
              const counterAnim = orb.reverse ? "orbit-cw" : "orbit-ccw";
              const duration = `${orb.period.toFixed(2)}s`;

              return (
                <div
                  key={orb.radius}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: orb.radius * 2,
                    height: orb.radius * 2,
                    marginLeft: -orb.radius,
                    marginTop: -orb.radius,
                    animation: `${spinAnim} ${duration} linear infinite`,
                    animationPlayState: playState,
                  }}
                >
                  {skills.map(cfg => {
                    const x = Math.cos(cfg.phaseShift) * orb.radius;
                    const y = Math.sin(cfg.phaseShift) * orb.radius;
                    return (
                      <div
                        key={cfg.id}
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                        }}
                      >
                        <div
                          style={{
                            animation: `${counterAnim} ${duration} linear infinite`,
                            animationPlayState: playState,
                          }}
                        >
                          <OrbitItem config={cfg} isMobile={isMobile} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </>
  );
}
