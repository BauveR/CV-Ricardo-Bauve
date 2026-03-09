// src/data/projects.ts
export type ProjectItem = {
    src: string;          // ruta relativa en src/assets
    text: string;         // título corto
    longDescription: string; // descripción larga para el detalle
    link?: string;        // enlace externo opcional
  };
  
  export const projects: ProjectItem[] = [
    {
      src: "src/assets/portafolio 2026-01.png",
      text: "IT Academy education project",
      longDescription:
        "Este proyecto pertenece a la plataforma de educación de la IT Academy con microcredencial de la Universidad Politécnica de Barcelona. Hemos estado trabajando en el desarrollo de una plataforma comunitaria para compartir recursos, pruebas técnicas y retos para mejorar el aprovechamiento y desarrollo de los alumnos."
    },
    {
      src: "src/assets/portafolio corpus colonia-01.png",
      text: "Corpus Colonia",
      longDescription:
        "website & design experience\nUniversidad de Lleiden\nUniversidad de la laguna"
    },
    {
      src: "src/assets/portafolio ricardo bauve-01.png",
      text: "piedra-arte e-commerce",
      longDescription:
        "frontend - React\nfinal project\nIT Academy work\nDatabase - MySQL\nbackend\n\nwebsite design\ndesktop\nmobile"
    },
    {
      src: "src/assets/portafolio ricardo bautista-06.png",
      text: "CRM SYSTEM nooxCommunity Platform CHIEF DATA OFFICER (CDO)",
      longDescription:
        "Core Competencies:\n- Strategic business alignment and optimization\n- Fintech solutions architecture\n- Private blockchain infrastructure development\n- Agile/Scrum development methodology\n- End-to-end platform implementation\n\nProject Scope:\nThis enterprise-level solution delivers an automated business infrastructure for streamlined acquisition of real estate properties and diversified financial assets. The platform leverages blockchain technology and advanced automation to maximize operational efficiency and create measurable business value through digital transformation.",
      link: "https://nooxcommunity.com/auth/sign-in"
    },
    {
      src: "src/assets/portafolio ricardo bautista-04.png",
      text: "TOKENIZATION Product Owner Branding Head",
      longDescription:
        "Key Competencies:\n- Fintech solutions architecture\n- Private blockchain ecosystem development\n- Agile/DevOps methodology\n- End-to-end platform deployment\n\nProject Overview:\nThis solution delivers a comprehensive financial framework that ensures stakeholder confidence and operational transparency. By integrating cutting-edge blockchain technology with core business processes through an agile development approach, the project establishes a future-proof, enterprise-grade technology infrastructure."
    },
    {
      src: "src/assets/portafolio ricardo bauve-05.png",
      text: "wow pr redesign",
      longDescription:
        "ai image generation\ncolor redesign\neditorial design\nreports for clients\ne-mail signatures\npresentation cards\nsocial media video"
    },
    {
      src: "src/assets/portafolio ricardo bauve-04.png",
      text: "creAi social artworks",
      longDescription:
        "AI image generation\ncolor consistency\neditorial\nsocial content for LinkedIn"
    },
    {
      src: "src/assets/portafolio bauve-01.png",
      text: "Muhlberg product owner branding marketing sales",
      longDescription:
        "website\nsales material\nwebsite design\ntech concept"
    },
    {
      src: "src/assets/portafolio bauve-02.png",
      text: "kankabal product owner branding marketing sales",
      longDescription:
        "website\nsales material\nwebsite design\nmarketing alliances"
    },
    {
      src: "src/assets/portafolio bauve-03.png",
      text: "fri summit product owner branding marketing sales",
      longDescription:
        "website\nsales material\nwebsite design\nmarketing alliances"
    },
    {
      src: "src/assets/portafolio bauve-04.png",
      text: "fri summit product owner branding marketing art curator",
      longDescription:
        "website\nsales material\nwebsite design\nmarketing alliances"
    },
    {
      src: "src/assets/portafolio ricardo bautista-01.png",
      text: "noox & partners product owner branding",
      longDescription:
        "art-concept\nwebsite\nevent manager\nsales material\nwebsite design\nmarketing alliances"
    },
    {
      src: "src/assets/portafolio ricardo bautista-02.png",
      text: "tealers magazine branding editorial",
      longDescription:
        "website concept\npersonal project"
    },
    {
      src: "src/assets/portafolio ricardo bautista-03.png",
      text: "noox vallarta product owner branding",
      longDescription:
        "website\nmarketing alliances\nsales material\nwebsite design"
    },
    {
      src: "src/assets/portafolio ricardo bautista-05.png",
      text: "tealers magazine branding editorial",
      longDescription:
        "website concept\npersonal project"
    },
    {
      src: "src/assets/portafolio ricardo bauve-02.png",
      text: "vintage shop",
      longDescription:
        "e-commerce\nai image\ntype customization\nIT Academy work"
    },
    {
      src: "src/assets/portafolio ricardo bauve-03.png",
      text: "galgos group branding",
      longDescription:
        "lettermark\ncolor harmony\nbrand guidelines"
    },
    {
      src: "src/assets/portafolio ricardo bauve-06.png",
      text: "felipe & co branding",
      longDescription:
        "Imagotype\ncolor armony\nbrand guidelines"
    },
    {
      src: "src/assets/portafolio ricardo bauve-07.png",
      text: "Superfine art curator marketing pop up gallery",
      longDescription:
        "investment recruiter\nart basel week"
    }
  ];
  