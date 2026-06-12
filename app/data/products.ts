export type Product = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  image?: string;
  imageAlt?: string;
  modelPath?: string;
  modelRotation?: [number, number, number];
  modelFocus?: "all" | "phototherapy" | "handheld";
  mediaStatus?: string;
  status: string;
  href: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  applications: string[];
};

export const products: Product[] = [
  {
    slug: "exchange-machine",
    name: "BiliDrop",
    eyebrow: "Infusion pump capable of exchange transfusion",
    summary:
      "A programmable infusion and exchange-transfusion platform designed for precise syringe displacement, fluid routing, and repeatable workflow control.",
    description:
      "BiliDrop is a microcontroller-based automated fluid handling platform designed to support controlled exchange transfusion workflows and precision syringe-pump infusion through a programmable electromechanical architecture.",
    image: "/products/product1.jpeg",
    imageAlt: "BiliDrop infusion pump prototype capable of exchange transfusion",
    mediaStatus: "Prototype imagery available",
    status: "Prototype development",
    href: "/products/exchange-machine",
    highlights: [
      "Programmable exchange transfusion and syringe-pump infusion modes",
      "Designed around precise syringe displacement and automated fluid routing",
      "3D product visualization available for stakeholder demos",
    ],
    specs: [
      { label: "Platform", value: "Automated fluid handling" },
      { label: "Focus", value: "Infusion and exchange transfusion workflows" },
      { label: "Control", value: "Microcontroller-based architecture" },
    ],
    applications: [
      "Exchange transfusion workflow development",
      "Programmable syringe-pump infusion",
      "Clinical education, research, and procedure planning",
    ],
  },
  {
    slug: "phototherapy",
    name: "Phototherapy Machine",
    eyebrow: "Neonatal jaundice treatment and optical monitoring",
    summary:
      "A neonatal phototherapy platform combining a white therapy panel, a dedicated display module, and an optical body probe for treatment-side data acquisition.",
    description:
      "The phototherapy machine concept brings together a white treatment panel, a separate black display and control module, and a compact optical probe designed around four green LEDs and four photodiodes for ADC-based signal acquisition.",
    modelPath: "/models/phototherapy-bilirubinometer.glb",
    modelRotation: [-1.18, 3.22, 0.12],
    modelFocus: "phototherapy",
    mediaStatus: "Interactive 3D prototype available",
    status: "Prototype development",
    href: "/products/phototherapy",
    highlights: [
      "White phototherapy panel designed for neonatal treatment coverage",
      "Separate display module for treatment information and system interaction",
      "Optical probe concept with four green LEDs and four photodiodes",
    ],
    specs: [
      { label: "Care area", value: "Neonatal care" },
      { label: "Sensing", value: "4 green LEDs + 4 photodiodes" },
      { label: "Signal output", value: "ADC-based optical readings" },
    ],
    applications: [
      "Neonatal jaundice treatment",
      "Treatment-side optical data acquisition",
      "NICU, maternity, and pediatric wards",
    ],
  },
  {
    slug: "bilirubinometer",
    name: "Handheld Bilirubinometer",
    eyebrow: "Independent bilirubin screening concept",
    summary:
      "A compact handheld optical measurement device designed to work independently and present bilirubin-related readings on its integrated screen.",
    description:
      "The handheld bilirubinometer is an independent prototype concept that combines a compact optical sensing interface, onboard electronics, and an integrated display for immediate bilirubin-related data presentation.",
    modelPath: "/models/phototherapy-bilirubinometer.glb",
    modelRotation: [-1.18, 0.08, -0.12],
    modelFocus: "handheld",
    mediaStatus: "Interactive 3D prototype available",
    status: "Prototype development",
    href: "/products/bilirubinometer",
    highlights: [
      "Handheld form factor intended for independent operation",
      "Integrated screen for immediate reading visibility",
      "Optical sensing architecture designed for bilirubin-related data acquisition",
    ],
    specs: [
      { label: "Format", value: "Handheld optical instrument" },
      { label: "Operation", value: "Independent measurement concept" },
      { label: "Interface", value: "Integrated display" },
    ],
    applications: [
      "Point-of-care bilirubin screening research",
      "Neonatal monitoring workflow development",
      "Bench testing and optical calibration studies",
    ],
  },
  {
    slug: "defibrillator",
    name: "Low-Cost Defibrillator",
    eyebrow: "Emergency cardiac response",
    summary:
      "Accessible emergency response technology focused on reliable cardiac intervention in cost-sensitive settings.",
    description:
      "A low-cost defibrillator concept intended to improve access to emergency cardiac response equipment while keeping reliability, usability, and service readiness at the center of the design.",
    mediaStatus: "Product imagery coming soon",
    status: "Research stage",
    href: "/products/defibrillator",
    highlights: [
      "Designed for rapid emergency response readiness",
      "Cost-conscious architecture for broader access",
      "Usability-first controls for stressful care environments",
    ],
    specs: [
      { label: "Care area", value: "Emergency response" },
      { label: "Focus", value: "Cardiac intervention access" },
      { label: "Design goal", value: "Reliable low-cost deployment" },
    ],
    applications: [
      "Emergency departments",
      "Ambulance and first-response kits",
      "Community health facilities",
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const exchangeMachineGallery = [
  {
    src: "/products/product1.jpeg",
    alt: "BiliDrop enclosure prototype",
  },
  {
    src: "/products/product2.jpeg",
    alt: "BiliDrop internal prototype view",
  },
  {
    src: "/products/product3.jpeg",
    alt: "BiliDrop assembly detail",
  },
];

export const exchangeMachineReports = [
  {
    title: "Static Stress Study",
    description:
      "Finite element stress validation using fixed constraints, 1 N force loading, parabolic mesh elements, and von Mises stress convergence.",
    preview: "/reports/previews/static-stress.png",
    href: "/reports/static-stress.html",
    stats: ["49,370 nodes", "27,255 elements", "1.00 N load"],
  },
  {
    title: "Thermal Study",
    description:
      "Thermal behavior review with applied temperature conditions, heat flux baseline accuracy, and thermal gradient outputs.",
    preview: "/reports/previews/thermal-study.png",
    href: "/reports/thermal-study.html",
    stats: ["20 C initial", "32,597 nodes", "17,541 elements"],
  },
  {
    title: "Thermal Stress Study",
    description:
      "Coupled thermal-stress review using reference temperature, applied temperature, structural constraints, and stress outputs.",
    preview: "/reports/previews/thermal-stress.png",
    href: "/reports/thermal-stress.html",
    stats: ["60 C applied", "20 C reference", "von Mises baseline"],
  },
  {
    title: "Dynamic Event Simulation",
    description:
      "Short-duration dynamic event simulation with inertia enabled and transient force loading to inspect impact response.",
    preview: "/reports/previews/dynamic-event-simulation.png",
    href: "/reports/dynamic-event-simulation.html",
    stats: ["0.001 s event", "25 result intervals", "1.00 N transient force"],
  },
  {
    title: "Shape Optimisation",
    description:
      "Shape optimisation report for enclosure mass reduction and geometry refinement under force-loading assumptions.",
    preview: "/reports/previews/shape-optimisation.png",
    href: "/reports/shape-optimisation.html",
    stats: ["0.875 kg before", "0.694 kg after", "79.35% mass ratio"],
  },
];
