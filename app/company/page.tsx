import type { Metadata } from "next";
import Link from "next/link";
import { Activity, CalendarDays, Cross, Layers3 } from "lucide-react";
import Navbar from "../../components/Navbar";

const companyFacts = [
  {
    label: "Founded",
    value: "2025",
    icon: CalendarDays,
  },
  {
    label: "Projects",
    value: "3+",
    icon: Layers3,
  },
  {
    label: "Focus Areas",
    value: "4",
    icon: Cross,
  },
  {
    label: "Active Prototypes",
    value: "3",
    icon: Activity,
  },
];

const activePrototypes = [
  {
    name: "BiliDrop",
    copy: "Infusion pump platform capable of supporting exchange transfusion workflows.",
    href: "/products/exchange-machine",
  },
  {
    name: "Phototherapy Machine",
    copy: "Neonatal treatment platform with display and optical monitoring probe.",
    href: "/products/phototherapy",
  },
  {
    name: "Handheld Bilirubinometer",
    copy: "Independent optical measurement concept with an integrated display.",
    href: "/products/bilirubinometer",
  },
];

export const metadata: Metadata = {
  title: "Company",
  description:
    "Learn about Medivonix Healthcare Solutions, its active medical device prototypes, and its engineering-led healthcare mission.",
};

export default function CompanyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-slate-950">
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-700">
              Company
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">
              Engineering accessible medical technology from Kolkata.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
              Medivonix Healthcare Solutions develops practical biomedical
              technologies around neonatal care, medical devices, embedded
              systems, and healthcare intelligence.
            </p>

            <div className="mt-12 grid border-y border-slate-200 sm:grid-cols-2 lg:grid-cols-4">
              {companyFacts.map((fact) => {
                const Icon = fact.icon;

                return (
                  <div
                    key={fact.label}
                    className="border-b border-slate-200 px-0 py-7 sm:px-6 sm:nth-[2]:border-l lg:border-b-0 lg:border-l lg:first:border-l-0"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-teal-700"
                    />
                    <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                      {fact.label}
                    </p>
                    <p className="mt-2 text-4xl font-black">{fact.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              Our purpose
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              Make promising healthcare technology more practical and
              accessible.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-600">
            <p>
              The company began from research into neonatal care challenges
              where equipment cost, availability, and workflow complexity can
              limit access.
            </p>
            <p>
              Our approach combines clinical problem framing, mechanical
              design, electronics, embedded control, prototype development,
              simulation, and validation planning.
            </p>
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
              Active prototypes
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-black sm:text-5xl">
              Three development programs shaping the current portfolio.
            </h2>

            <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {activePrototypes.map((prototype, index) => (
                <Link
                  key={prototype.name}
                  href={prototype.href}
                  className="group grid gap-4 py-7 transition hover:bg-white/[0.04] sm:grid-cols-[4rem_0.7fr_1.3fr] sm:items-center sm:px-4"
                >
                  <p className="text-sm font-black text-teal-300">
                    0{index + 1}
                  </p>
                  <h3 className="text-2xl font-black">{prototype.name}</h3>
                  <p className="leading-7 text-slate-300">{prototype.copy}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-8 border-l-4 border-teal-500 bg-slate-50 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
                Work with Medivonix
              </p>
              <h2 className="mt-3 text-3xl font-black">
                Clinical, engineering, and research collaboration.
              </h2>
            </div>
            <Link
              href="/#contact"
              className="w-fit rounded-full bg-slate-950 px-6 py-4 font-bold text-white hover:bg-teal-700"
            >
              Contact the team
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
