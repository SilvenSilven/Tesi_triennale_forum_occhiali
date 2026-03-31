// Static category definitions used for UI rendering
// These match the database Category model structure

export type CategoryDef = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  status: "ACTIVE" | "DISABLED" | "COMING_SOON" | "ARCHIVED";
  sortOrder: number;
};

export const CATEGORIES: CategoryDef[] = [
  {
    name: "Occhiali da Sole",
    slug: "occhiali-da-sole",
    description:
      "Discussioni, recensioni e confronti su occhiali da sole di ogni tipo e fascia di prezzo.",
    icon: "🕶️",
    status: "ACTIVE",
    sortOrder: 1,
  },
  {
    name: "Scarpe",
    slug: "scarpe",
    description:
      "Sneakers, stivali, sandali e calzature di tendenza per ogni occasione.",
    icon: "👟",
    status: "COMING_SOON",
    sortOrder: 2,
  },
  {
    name: "Borse",
    slug: "borse",
    description:
      "Borse a mano, zaini, clutch e accessori da portare con sé ogni giorno.",
    icon: "👜",
    status: "COMING_SOON",
    sortOrder: 3,
  },
  {
    name: "Abbigliamento",
    slug: "abbigliamento",
    description:
      "Capi di abbigliamento, outfit e consigli di stile per tutte le stagioni.",
    icon: "👔",
    status: "COMING_SOON",
    sortOrder: 4,
  },
  {
    name: "Streetwear",
    slug: "streetwear",
    description:
      "Cultura streetwear, limited edition, collaborazioni e tendenze urban.",
    icon: "🧢",
    status: "COMING_SOON",
    sortOrder: 5,
  },
  {
    name: "Accessori",
    slug: "accessori",
    description:
      "Orologi, gioielli, cinture, sciarpe e tutti gli accessori di moda.",
    icon: "⌚",
    status: "COMING_SOON",
    sortOrder: 6,
  },
  {
    name: "Tendenze & Styling",
    slug: "tendenze-styling",
    description:
      "Le ultime tendenze della moda, consigli di styling e ispirazioni.",
    icon: "✨",
    status: "COMING_SOON",
    sortOrder: 7,
  },
  {
    name: "Lusso vs Accessibile",
    slug: "lusso-vs-accessibile",
    description:
      "Confronti tra moda di lusso e alternative accessibili, rapporto qualità-prezzo.",
    icon: "💎",
    status: "COMING_SOON",
    sortOrder: 8,
  },
];
