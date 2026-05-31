export type Product = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  image?: string;
  imageAlt?: string;
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
    name: "Exchange Blood Transfusion Machine",
    eyebrow: "Flagship neonatal critical care platform",
    summary:
      "Automated neonatal exchange transfusion support designed for precision, repeatability, and safer workflow control.",
    description:
      "A compact system concept for neonatal exchange transfusion that helps care teams manage controlled blood exchange with improved procedural consistency, monitoring visibility, and accessibility for high-pressure clinical settings.",
    image: "/products/product1.jpeg",
    imageAlt: "Exchange blood transfusion machine prototype",
    mediaStatus: "Prototype imagery available",
    status: "Prototype development",
    href: "/products/exchange-machine",
    highlights: [
      "Controlled exchange workflow for neonatal critical care",
      "Designed around precision, safety checks, and affordability",
      "3D product visualization available for stakeholder demos",
    ],
    specs: [
      { label: "Care area", value: "Neonatal intensive care" },
      { label: "Focus", value: "Exchange transfusion support" },
      { label: "Design goal", value: "Precision with accessible deployment" },
    ],
    applications: [
      "Severe neonatal jaundice management",
      "NICU critical care workflows",
      "Clinical education and procedure planning",
    ],
  },
  {
    slug: "phototherapy",
    name: "Phototherapy Machine",
    eyebrow: "Neonatal jaundice treatment",
    summary:
      "Phototherapy technology concept for optimized therapeutic illumination and dependable neonatal care.",
    description:
      "A focused neonatal phototherapy platform designed to support effective jaundice treatment with uniform light delivery, practical handling, and serviceable components for everyday hospital use.",
    mediaStatus: "Product imagery coming soon",
    status: "Concept validation",
    href: "/products/phototherapy",
    highlights: [
      "Optimized illumination for neonatal jaundice therapy",
      "Compact form factor for ward and NICU environments",
      "Built for maintainability and accessible ownership costs",
    ],
    specs: [
      { label: "Care area", value: "Neonatal care" },
      { label: "Focus", value: "Therapeutic illumination" },
      { label: "Design goal", value: "Consistent treatment coverage" },
    ],
    applications: [
      "Neonatal jaundice treatment",
      "Maternity and pediatric wards",
      "Resource-conscious care centers",
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
    alt: "Exchange blood transfusion machine enclosure prototype",
  },
  {
    src: "/products/product2.jpeg",
    alt: "Exchange blood transfusion machine internal prototype view",
  },
  {
    src: "/products/product3.jpeg",
    alt: "Exchange blood transfusion machine assembly detail",
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
