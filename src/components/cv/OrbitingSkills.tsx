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

const OrbitItem = memo(({ config, angle }: { config: SkillConfig; angle: number }) => {
  const [hovered, setHovered] = useState(false);
  const { orbitRadius, size, icon, iconColor, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-transform duration-200 ease-out"
      style={{
        width: size,
        height: size,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: hovered ? 30 : 10,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full h-full rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-200"
        style={{
          transform: hovered ? "scale(1.3)" : "scale(1)",
          boxShadow: hovered ? `0 0 24px ${iconColor}60, 0 0 48px ${iconColor}30` : undefined,
          fontSize: size * 0.52,
          color: iconColor,
        }}
      >
        {icon}
        <div className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none text-white font-bold" style={{ top: "100%", marginTop: 4, fontSize: 9 }}>
          {label}
        </div>
      </div>
    </div>
  );
});
OrbitItem.displayName = "OrbitItem";

const INNER = 700;

export function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [size, setSize] = useState(() =>
    typeof window !== "undefined" ? Math.min(window.innerWidth - 40, INNER) : INNER
  );

  useEffect(() => {
    const onResize = () => setSize(Math.min(window.innerWidth - 40, INNER));
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (paused) return;
    let rafId: number;
    let last = performance.now();
    const tick = (now: number) => {
      setTime((t) => t + (now - last) / 1000);
      last = now;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [paused]);

  const scale = size / INNER;

  const orbitRings: { radius: number; glowColor: GlowColor; delay: number }[] = [
    { radius: 90,  glowColor: "cyan",   delay: 0 },
    { radius: 165, glowColor: "purple", delay: 1 },
    { radius: 250, glowColor: "orange", delay: 2 },
    { radius: 335, glowColor: "green",  delay: 3 },
  ];

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ height: size }}
    >
      <div
        style={{ width: INNER, height: INNER, transform: `scale(${scale})`, transformOrigin: "center" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
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

          {/* Orbit rings */}
          {orbitRings.map((r) => (
            <OrbitPath key={r.radius} radius={r.radius} glowColor={r.glowColor} delay={r.delay} />
          ))}

          {/* Orbiting icons */}
          {skillsConfig.map((cfg) => (
            <OrbitItem
              key={cfg.id}
              config={cfg}
              angle={time * cfg.speed + cfg.phaseShift}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
