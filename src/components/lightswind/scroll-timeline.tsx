"use client";
import React, { useRef, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { cn } from "../../lib/utils";
import { Card, CardContent } from "./card";
import { Calendar } from "lucide-react";

export interface TimelineEvent {
  id?: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
  alignment?: "left" | "right" | "both";
  href?: string;
  iconUrl?: string;
  noIcon?: boolean;
  right?: {
    year?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    href?: string;
    iconUrl?: string;
    iconUrls?: string[];
    icon?: React.ReactNode;
    noIcon?: boolean;
  };
}

export interface ScrollTimelineProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
  leftTitle?: string;
  rightTitle?: string;
  animationOrder?: "sequential" | "staggered" | "simultaneous";
  cardAlignment?: "alternating" | "left" | "right";
  lineColor?: string;
  activeColor?: string;
  progressIndicator?: boolean;
  cardVariant?: "default" | "elevated" | "outlined" | "filled";
  cardEffect?: "none" | "glow" | "shadow" | "bounce";
  parallaxIntensity?: number;
  progressLineWidth?: number;
  progressLineCap?: "round" | "square";
  dateFormat?: "text" | "badge";
  className?: string;
  revealAnimation?: "fade" | "slide" | "scale" | "flip" | "none";
  connectorStyle?: "dots" | "line" | "dashed";
  perspective?: boolean;
  darkMode?: boolean;
  smoothScroll?: boolean;
}

const DEFAULT_EVENTS: TimelineEvent[] = [
  {
    year: "2023",
    title: "Major Achievement",
    subtitle: "Organization Name",
    description:
      "Description of the achievement or milestone reached during this time period.",
  },
  {
    year: "2022",
    title: "Important Milestone",
    subtitle: "Organization Name",
    description: "Details about this significant milestone and its impact.",
  },
  {
    year: "2021",
    title: "Key Event",
    subtitle: "Organization Name",
    description: "Information about this key event in the timeline.",
  },
];

const TimelineItem = memo(function TimelineItem({
  event, index, cardAlignment, timelineRefs,
}: {
  event: TimelineEvent;
  index: number;
  cardAlignment: string;
  timelineRefs: React.RefObject<(HTMLDivElement | null)[]>;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true });

  const effectiveAlignment: "left" | "right" | "both" = event.alignment
    ?? (cardAlignment === "alternating" ? (index % 2 === 0 ? "left" : "right") : cardAlignment as "left" | "right");

  const buildInner = (data: {
    year?: string; title?: string; subtitle?: string;
    description?: string; iconUrl?: string; iconUrls?: string[]; icon?: React.ReactNode; href?: string; noIcon?: boolean;
  }) => {
    const card = (
      <Card className="bg-white/80 border border-gray-200">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-sm text-slate-800" style={{ fontFamily: "'Boldonse', sans-serif" }}>{data.year}</span>
            {!data.noIcon && (
              <div className="flex items-center gap-3">
                {data.iconUrls
                  ? data.iconUrls.map((url, i) => <img key={i} src={url} alt="" className="h-6 w-auto object-contain" />)
                  : data.iconUrl
                    ? <img src={data.iconUrl} alt="" className="h-5 w-auto object-contain" />
                    : <Calendar className="h-4 w-4 text-slate-800" />
                }
              </div>
            )}
          </div>
          <h3 className="text-base mb-1 text-gray-800" style={{ fontFamily: "'Boldonse', sans-serif" }}>{data.title}</h3>
          {data.subtitle && <p className="text-gray-500 font-medium mb-2 text-sm">{data.subtitle}</p>}
          {data.description && <p className="text-gray-400 text-sm">{data.description}</p>}
        </CardContent>
      </Card>
    );
    return data.href ? (
      <a href={data.href} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
        {card}
      </a>
    ) : card;
  };

  const leftData = { year: event.year, title: event.title, subtitle: event.subtitle, description: event.description, iconUrl: event.iconUrl, icon: event.icon, href: event.href, noIcon: event.noIcon };
  const rightData = event.right ? { ...leftData, iconUrls: undefined, ...event.right } : leftData;

  const cardContent = buildInner(leftData);
  const rightCardContent = buildInner(rightData);

  const cardClass = "relative z-30 rounded-lg bg-card/50 backdrop-blur border-2 border-primary/20 w-[calc(50%-12px)] mt-0";

  const dot = (
    <div className="absolute top-1/2 transform -translate-y-1/2 z-30 left-1/2 -translate-x-1/2">
      <div className="w-6 h-6 rounded-full border-4 bg-background border-primary" />
    </div>
  );

  const cardMotion = (content: React.ReactNode, extraClass: string) => (
    <motion.div
      className={cn(cardClass, extraClass)}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      style={{ opacity: 0 }}
    >
      {content}
    </motion.div>
  );

  if (effectiveAlignment === "both") {
    return (
      <div
        ref={(el) => { timelineRefs.current[index] = el; }}
        className="relative flex items-center mb-8 py-1 flex-row justify-between"
      >
        <div ref={itemRef} className="absolute inset-0 pointer-events-none" />
        {dot}
        {cardMotion(cardContent, "mr-[12px]")}
        {cardMotion(rightCardContent, "ml-[12px]")}
      </div>
    );
  }

  return (
    <div
      ref={(el) => { timelineRefs.current[index] = el; }}
      className={cn(
        "relative flex items-center mb-8 py-1 flex-row",
        effectiveAlignment === "left" ? "justify-start" : "flex-row-reverse justify-start"
      )}
    >
      <div ref={itemRef} className="absolute inset-0 pointer-events-none" />
      {dot}
      {cardMotion(cardContent, effectiveAlignment === "left" ? "mr-[calc(50%+12px)]" : "ml-[calc(50%+12px)]")}
    </div>
  );
});

export const ScrollTimeline = ({
  events = DEFAULT_EVENTS,
  title = "Timeline",
  subtitle = "Scroll to explore the journey",
  leftTitle,
  rightTitle,
  animationOrder: _animationOrder = "sequential",
  cardAlignment = "alternating",
  lineColor = "bg-primary/30",
  activeColor: _activeColor = "bg-primary",
  progressIndicator = true,
  cardVariant: _cardVariant = "default",
  cardEffect: _cardEffect = "none",
  parallaxIntensity: _parallaxIntensity = 0.2,
  progressLineWidth = 2,
  progressLineCap = "round",
  dateFormat: _dateFormat = "badge",
  revealAnimation: _revealAnimation = "fade",
  className = "",
  connectorStyle = "line",
  perspective: _perspective = false,
  darkMode = false,
  smoothScroll: _smoothScroll = true,
}: ScrollTimelineProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);


  const getConnectorClasses = () => {
    const baseClasses = cn(
      "absolute left-1/2 transform -translate-x-1/2",
      lineColor
    );
    const widthStyle = `w-[${progressLineWidth}px]`;
    switch (connectorStyle) {
      case "dots":
        return cn(baseClasses, "w-1 rounded-full");
      case "dashed":
        return cn(
          baseClasses,
          widthStyle,
          `[mask-image:linear-gradient(to_bottom,black_33%,transparent_33%,transparent_66%,black_66%)] [mask-size:1px_12px]`
        );
      case "line":
      default:
        return cn(baseClasses, widthStyle);
    }
  };


  return (
    <div
      ref={scrollRef}
      className={cn(
        "relative min-h-screen w-full",
        darkMode ? "bg-background text-foreground" : "",
        className
      )}
    >
      {leftTitle || rightTitle ? (
        <div className="relative max-w-6xl mx-auto px-4 pt-8 pb-16 flex justify-between">
          <div className="w-[calc(50%-40px)]">
            {leftTitle && <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Boldonse', sans-serif", color: "#ffffff", fontSize: "clamp(1.305rem, 2.94vw, 3.27rem)" }}>{leftTitle}</h2>}
          </div>
          <div className="w-[calc(50%+20px)]" style={{ marginLeft: "-0.5rem" }}>
            {rightTitle && (
              <h2
                className="font-bold"
                style={{
                  fontFamily: "'Boldonse', sans-serif",
                  fontSize: "clamp(1.305rem, 2.94vw, 3.27rem)",
                  background: "linear-gradient(135deg, #22c55e, #ffffff, #a855f7, #22c55e)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  animation: "aurora-text 5s ease infinite",
                }}
              >
                {rightTitle}
              </h2>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-500 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}

      <div className="relative max-w-6xl mx-auto px-4 pb-12">
        <div className="relative mx-auto">
          <div
            className={cn(getConnectorClasses(), "h-full absolute top-0 z-10")}
          ></div>

          {/* === MODIFICATION START === */}
          {/* Enhanced Progress Indicator with Traveling Glow */}
          {progressIndicator && (
            <>
              {/* The main filled progress line */}
              <motion.div
                className="absolute top-0 z-10"
                style={{
                  height: progressHeight,
                  width: progressLineWidth,
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius:
                    progressLineCap === "round" ? "9999px" : "0px",
                  background: `linear-gradient(to bottom, #22d3ee, #6366f1, #a855f7)`,
                  // Enhanced shadow for a constant glow effect along the path
                  boxShadow: `
                    0 0 15px rgba(99,102,241,0.5),
                    0 0 25px rgba(168,85,247,0.3)
                  `,
                }}
              />
              {/* The traveling glow "comet" at the head of the line */}
              <motion.div
                className="absolute z-20"
                style={{
                  top: progressHeight,
                  left: "50%",
                  translateX: "-50%",
                  translateY: "-50%", // Center the comet on the line's end point
                }}
              >
                <motion.div
                  className="w-5 h-5 rounded-full" // Size of the comet core
                  style={{
                    background:
                      "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(99,102,241,0.5) 40%, rgba(34,211,238,0) 70%)",
                    // Intense, layered glow effect for the comet
                    boxShadow: `
                      0 0 15px 4px rgba(168, 85, 247, 0.6),
                      0 0 25px 8px rgba(99, 102, 241, 0.4),
                      0 0 40px 15px rgba(34, 211, 238, 0.2)
                    `,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </>
          )}
          {/* === MODIFICATION END === */}

          <div className="relative z-20">
            {events.map((event, index) => (
              <TimelineItem
                key={event.id || index}
                event={event}
                index={index}
                cardAlignment={cardAlignment}
                timelineRefs={timelineRefs}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
