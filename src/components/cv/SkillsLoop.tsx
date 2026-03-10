import { LogoLoop } from "../common/LogoLoop";
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

const logos = [
  // Diseño
  { node: <SiAdobephotoshop color="#31A8FF" />, title: "Photoshop" },
  { node: <SiAdobeillustrator color="#FF9A00" />, title: "Illustrator" },
  { node: <SiAdobeindesign color="#FF3366" />, title: "InDesign" },
  { node: <TbMovie color="#555" />, title: "Final Cut" },

  { node: <SiFigma />, title: "Figma" },
  { node: <SiCanva color="#00C4CC" />, title: "Canva" },
  { node: <TbSparkles color="#9B59B6" />, title: "Midjourney" },
  { node: <TbScissors color="#000" />, title: "CapCut" },
  // Web & CMS
  { node: <SiWix color="#000" />, title: "Wix" },
  { node: <SiWordpress color="#21759B" />, title: "WordPress" },
  // IT / Dev
  { node: <SiHtml5 color="#E34F26" />, title: "HTML" },
  { node: <SiCss3 color="#1572B6" />, title: "CSS" },
  { node: <SiJavascript color="#F7DF1E" />, title: "JavaScript" },
  { node: <SiTypescript color="#3178C6" />, title: "TypeScript" },
  { node: <SiReact color="#61DAFB" />, title: "React" },
  { node: <SiTailwindcss color="#06B6D4" />, title: "Tailwind" },
  { node: <SiVite color="#646CFF" />, title: "Vite" },
  { node: <SiNodedotjs color="#339933" />, title: "Node.js" },
  { node: <SiGithub color="#181717" />, title: "GitHub" },
  { node: <SiMysql color="#4479A1" />, title: "MySQL" },
  { node: <SiMongodb color="#47A248" />, title: "MongoDB" },
  // Ads
  { node: <SiFacebook color="#1877F2" />, title: "Facebook Ads" },
  { node: <SiInstagram color="#E4405F" />, title: "Instagram Ads" },
  { node: <SiTiktok color="#000000" />, title: "TikTok Ads" },
  { node: <SiGoogleanalytics color="#E37400" />, title: "Google Analytics" },
  // Productividad
  { node: <SiSlack color="#4A154B" />, title: "Slack" },
  { node: <SiAsana color="#F06A6A" />, title: "Asana" },
  { node: <SiZendesk color="#03363D" />, title: "Zendesk" },
  { node: <SiGoogledrive color="#4285F4" />, title: "Google Suite" },
  { node: <TbBrandWindows color="#00A4EF" />, title: "Microsoft 365" },
];

export function SkillsLoop() {
  return (
    <div style={{ height: 96, position: "relative", overflow: "hidden" }}>
      <LogoLoop
        logos={logos}
        speed={60}
        direction="left"
        logoHeight={38}
        gap={48}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="transparent"
        ariaLabel="Skills y herramientas"
      />
    </div>
  );
}
