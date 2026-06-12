import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  Baby,
  BrainCircuit,
  Cpu,
  Stethoscope,
} from "lucide-react";
import Navbar from "../../components/Navbar";

const focusAreas = [
  { title: "Neonatal Care", icon: Baby },
  { title: "Medical Devices", icon: Stethoscope },
  { title: "Embedded Systems", icon: Cpu },
  { title: "Healthcare AI", icon: BrainCircuit },
];

const developmentStages = [
  {
    number: "01",
    title: "Problem discovery",
    copy: "Study clinical needs, care constraints, affordability gaps, and operator workflows.",
  },
  {
    number: "02",
    title: "System architecture",
    copy: "Translate the need into mechanical, electronic, sensing, control, and software subsystems.",
  },
  {
    number: "03",
    title: "Prototype iteration",
    copy: "Build, inspect, simulate, test, and refine hardware around measurable engineering targets.",
  },
  {
    number: "04",
    title: "Validation planning",
    copy: "Prepare for bench, usability, safety, regulatory, and future clinical validation.",
  },
];

export const metadata: Metadata = {
  title: "Research and Development",
  description:
    "Explore Medivonix research areas, engineering process, and healthcare accessibility mission.",
};

export default function ResearchDevelopmentPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-slate-950">
        <section className="border-b border-slate-200 bg-slate-950 py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-300">
              Research and development
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">
              Turning healthcare access problems into engineered prototypes.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              Our R&D work connects clinical need mapping with medical device
              design, embedded systems, sensing, simulation, and future
              healthcare intelligence.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                Focus areas
              </p>
              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                Four connected fields.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {focusAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <div
                    key={area.title}
                    className="flex min-h-36 items-end justify-between border border-slate-300 bg-slate-50 p-6"
                  >
                    <h3 className="max-w-48 text-2xl font-black">
                      {area.title}
                    </h3>
                    <Icon
                      aria-hidden="true"
                      className="h-7 w-7 text-teal-700"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                R&D direction
              </p>
              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                A direct line from need to impact.
              </h2>
            </div>

            <div className="mx-auto mt-12 max-w-3xl">
              {[
                {
                  label: "Problem",
                  value: "Neonatal care technologies are expensive",
                },
                {
                  label: "Solution",
                  value: "Affordable engineering-driven medical devices",
                },
                {
                  label: "Impact",
                  value: "Improved healthcare accessibility",
                },
              ].map((item, index) => (
                <div key={item.label}>
                  <div className="border-l-4 border-teal-500 bg-white p-7 shadow-sm sm:p-9">
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
                      {item.label}
                    </p>
                    <p className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                      {item.value}
                    </p>
                  </div>
                  {index < 2 && (
                    <div className="flex h-16 items-center justify-center text-teal-700">
                      <ArrowDown aria-hidden="true" className="h-7 w-7" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              Development method
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              Research structured around evidence and iteration.
            </h2>
          </div>

          <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
            {developmentStages.map((stage) => (
              <div
                key={stage.number}
                className="grid gap-4 py-7 sm:grid-cols-[4rem_0.8fr_1.2fr] sm:items-start"
              >
                <p className="text-sm font-black text-teal-700">
                  {stage.number}
                </p>
                <h3 className="text-xl font-black">{stage.title}</h3>
                <p className="leading-7 text-slate-600">{stage.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-teal-600 py-16 text-white">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
            <h2 className="max-w-3xl text-3xl font-black sm:text-4xl">
              Explore the prototypes emerging from this research.
            </h2>
            <Link
              href="/#products"
              className="w-fit rounded-full bg-slate-950 px-6 py-4 font-bold text-white hover:bg-white hover:text-slate-950"
            >
              View products
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
