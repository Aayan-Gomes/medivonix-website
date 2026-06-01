import type { Metadata } from "next";
import Image from "next/image";
import {
  Activity,
  CircuitBoard,
  Droplets,
  Gauge,
  Hospital,
  Layers3,
} from "lucide-react";
import Navbar from "../../../components/Navbar";
import ProductDetail from "../../../components/ProductDetail";
import ModelViewer from "../../../components/ModelViewer";
import {
  exchangeMachineGallery,
  exchangeMachineReports,
  getProduct,
} from "../../data/products";

const product = getProduct("exchange-machine");

const workflowSteps = [
  {
    title: "Parameter setup",
    copy: "The operator configures mode, transfer volume, cycle volume, infusion rate, or treatment duration through the user interface concept.",
  },
  {
    title: "Precision syringe displacement",
    copy: "A stepper-driven syringe mechanism is intended to convert linear plunger movement into known fluid volume transfer.",
  },
  {
    title: "Automated fluid routing",
    copy: "Servo-actuated valve assemblies are planned to route fluid between patient, donor, and waste pathways during exchange workflows.",
  },
  {
    title: "Infusion pump mode",
    copy: "BiliDrop can also be presented as a programmable syringe-pump infusion platform without an exchange cycle.",
  },
  {
    title: "Feedback and validation loop",
    copy: "LCD feedback, encoder input, simulation reports, and prototype reviews support future bench testing and design refinement.",
  },
];

const subsystems = [
  {
    title: "Syringe actuation",
    copy: "Stepper-driven lead screw architecture for repeatable syringe plunger movement.",
    icon: Activity,
  },
  {
    title: "Flow management",
    copy: "Servo-actuated fluid routing intended for patient, donor, and waste line switching.",
    icon: Droplets,
  },
  {
    title: "Control electronics",
    copy: "ATmega328P-based control concept for motion, valve coordination, interface logic, and sequencing.",
    icon: CircuitBoard,
  },
  {
    title: "Enclosure system",
    copy: "Prototype shell with removable/transparent 3D viewing modes for stakeholder review.",
    icon: Layers3,
  },
  {
    title: "Procedure feedback",
    copy: "LCD and encoder interface concept for treatment configuration, progress visibility, and completion feedback.",
    icon: Gauge,
  },
  {
    title: "Care environment",
    copy: "Designed for neonatal units, clinical education, and future hospital pilot planning.",
    icon: Hospital,
  },
];

const targetUsers = [
  "NICU teams",
  "Neonatologists",
  "Pediatric critical-care units",
  "Clinical technicians",
  "Researchers",
  "Biomedical engineering teams",
];

export const metadata: Metadata = {
  title: "BiliDrop",
  description:
    "BiliDrop is an infusion pump capable of exchange transfusion from Medivonix Healthcare Solutions.",
};

export default function ExchangeMachine() {
  if (!product) return null;

  return (
    <>
      <Navbar />
      <ProductDetail product={product}>
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              Prototype Gallery
            </p>
            <h2 className="mt-4 text-3xl font-black text-slate-950">
              BiliDrop prototype visuals
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              These images are currently used only for BiliDrop, the infusion
              pump platform capable of exchange transfusion. Phototherapy and
              Defibrillator visuals will be added when their product-specific
              assets are ready.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {exchangeMachineGallery.map((image) => (
              <div
                key={image.src}
                className="relative aspect-[16/10] overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              3D Product View
            </p>
            <h2 className="mt-4 text-3xl font-black text-slate-950">
              Interactive machine visualization
            </h2>
          </div>
          <ModelViewer allowInsideView />
        </section>

        <section className="border-y border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                  Product Workflow
                </p>
                <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
                  Built around programmable infusion and exchange transfusion workflows.
                </h2>
                <p className="mt-5 leading-8 text-slate-600">
                  BiliDrop is presented as an engineering development platform
                  for automated fluid handling. The focus is precise syringe
                  displacement, configurable infusion, automated fluid routing,
                  operator visibility, and validation-led design refinement.
                </p>
                <div className="mt-7 rounded-lg border border-teal-200 bg-teal-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-teal-800">
                    Current stage
                  </p>
                  <p className="mt-3 text-lg font-black text-slate-950">
                    Prototype development and engineering validation planning
                  </p>
                  <p className="mt-2 leading-7 text-slate-600">
                    Not marketed as a certified clinical device. Further bench,
                    usability, regulatory, and clinical validation would be
                    required before patient deployment.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {workflowSteps.map((step, index) => (
                  <article
                    key={step.title}
                    className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:grid-cols-[3.5rem_1fr]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-950">
                        {step.title}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-600">
                        {step.copy}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                Subsystems
              </p>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
                What BiliDrop brings together.
              </h2>
            </div>
            <div className="max-w-xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">
                Target users
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {targetUsers.map((user) => (
                  <span
                    key={user}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700"
                  >
                    {user}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {subsystems.map((system) => {
              const Icon = system.icon;

              return (
                <article
                  key={system.title}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-slate-950">
                    {system.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {system.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                Simulation Reports
              </p>
              <h2 className="mt-4 text-3xl font-black text-slate-950">
                Engineering validation studies
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Autodesk Fusion simulation exports for the BiliDrop enclosure,
                covering structural, thermal, dynamic event, and shape
                optimisation checks.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {exchangeMachineReports.map((report) => (
                <article
                  key={report.href}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                >
                  <div className="relative aspect-[16/9] bg-slate-100">
                    <Image
                      src={report.preview}
                      alt={`${report.title} simulation preview`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-black text-slate-950">
                      {report.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-600">
                      {report.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {report.stats.map((stat) => (
                        <span
                          key={stat}
                          className="rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-800"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                    <a
                      href={report.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex font-bold text-teal-700 hover:text-teal-900"
                    >
                      Open full report
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </ProductDetail>
    </>
  );
}
