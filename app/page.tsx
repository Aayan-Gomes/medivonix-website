import Image from "next/image";
import Link from "next/link";
import ContactForm from "../components/ContactForm";
import ModelViewer from "../components/ModelViewer";
import Navbar from "../components/Navbar";
import { products } from "./data/products";

const focusAreas = [
  {
    title: "Neonatal Care",
    copy: "Devices centered on jaundice care, infusion support, exchange transfusion workflows, and newborn critical care needs.",
  },
  {
    title: "Affordable Access",
    copy: "Engineering choices that prioritize maintainability, local deployment, and realistic ownership costs.",
  },
  {
    title: "Emergency Response",
    copy: "Low-cost life-support concepts that can improve readiness beyond large tertiary hospitals.",
  },
];

const process = [
  "Clinical need mapping",
  "Biomedical design",
  "Prototype iteration",
  "Validation planning",
];

const timeline = [
  { year: "2024", event: "Research Begins" },
  { year: "2025", event: "Medivonix Founded" },
  { year: "2025", event: "BiliDrop Development" },
  { year: "2025", event: "Website Launch" },
  { year: "Future", event: "Clinical Validation & Deployment" },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="home" className="bg-white text-slate-950">
        <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_70%)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="flex flex-col justify-center">
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-teal-700">
                Medivonix Healthcare Solutions
              </p>
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Biomedical devices for critical care where access matters.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
                We develop practical medical technologies for neonatal care,
                blood transfusion support, phototherapy, optical bilirubin
                measurement, and emergency response with a focus on
                affordability, safety, and deployment in real clinical
                environments.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#products"
                  className="rounded-full bg-teal-600 px-7 py-4 text-center font-bold text-white transition hover:bg-teal-700"
                >
                  Explore products
                </Link>
                <Link
                  href="#contact"
                  className="rounded-full border border-slate-300 px-7 py-4 text-center font-bold text-slate-900 transition hover:border-teal-500 hover:text-teal-700"
                >
                  Start a conversation
                </Link>
              </div>

              <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-slate-200 pt-8">
                {[
                  ["4", "Device programs"],
                  ["NICU", "Primary care focus"],
                  ["Kolkata", "Built in India"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-black text-slate-950">{value}</p>
                    <p className="mt-1 text-sm text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[440px] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
              <ModelViewer variant="hero" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent p-6 text-white sm:p-8">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-200">
                  Flagship development
                </p>
                <h2 className="mt-3 text-2xl font-black">
                  BiliDrop
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200">
                  Infusion pump platform capable of exchange transfusion.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                Company
              </p>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-5xl">
                Medical technology designed around care realities.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-slate-600">
              <p>
                Medivonix Healthcare Solutions is building a portfolio of
                biomedical devices for hospitals, neonatal units, emergency
                responders, and resource-conscious care providers.
              </p>
              <p>
                Our work combines clinical problem framing, mechanical and
                electronic prototyping, usability thinking, and cost-aware
                engineering so promising device ideas can move toward practical
                healthcare impact.
              </p>
              <Link
                href="/company"
                className="inline-flex font-bold text-teal-700 hover:text-teal-900"
              >
                Explore the company
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-3">
            {focusAreas.map((area) => (
              <article
                key={area.title}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-7"
              >
                <h3 className="text-2xl font-black">{area.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{area.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                Products
              </p>
              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                Development portfolio
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              A connected pipeline of medical device concepts focused on
              neonatal care, transfusion support, optical measurement, and
              emergency readiness.
            </p>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={product.href}
                className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {product.modelPath ? (
                  <div className="pointer-events-none relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <ModelViewer
                      variant="card"
                      modelPath={product.modelPath}
                      modelRotation={product.modelRotation}
                      modelFocus={product.modelFocus}
                    />
                  </div>
                ) : product.image && product.imageAlt ? (
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] items-end bg-slate-100 p-6">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                      {product.mediaStatus}
                    </p>
                  </div>
                )}
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
                    {product.status}
                  </p>
                  <h3 className="mt-3 text-2xl font-black text-slate-950">
                    {product.name}
                  </h3>
                  <p className="mt-4 leading-7 text-slate-600">
                    {product.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                Research and development
              </p>
              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                From clinical gap to engineered prototype.
              </h2>
              <p className="mt-6 leading-8 text-slate-600">
                Our process keeps patient safety, clinician workflow, and
                affordability visible from the first sketch through validation
                planning.
              </p>
              <Link
                href="/research-development"
                className="mt-7 inline-flex font-bold text-teal-700 hover:text-teal-900"
              >
                Explore research and development
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {process.map((step, index) => (
                <div
                  key={step}
                  className="rounded-lg border border-slate-200 bg-white p-6"
                >
                  <p className="text-sm font-black text-teal-700">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 text-xl font-black">{step}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                Company journey
              </p>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-5xl">
                From early research to future clinical deployment.
              </h2>
            </div>

            <div className="mt-12 grid gap-0 lg:grid-cols-5">
              {timeline.map((milestone, index) => (
                <div
                  key={`${milestone.year}-${milestone.event}`}
                  className="relative grid grid-cols-[3rem_1fr] gap-4 pb-8 lg:block lg:pb-0 lg:pr-6"
                >
                  <div className="relative flex justify-center lg:mb-6 lg:block">
                    <span className="relative z-10 mt-1 h-4 w-4 rounded-full border-4 border-white bg-teal-600 ring-2 ring-teal-600 lg:mt-0 lg:block" />
                    {index < timeline.length - 1 && (
                      <span className="absolute bottom-[-2rem] top-5 w-px bg-slate-300 lg:bottom-auto lg:left-4 lg:right-[-1.5rem] lg:top-2 lg:h-px lg:w-auto" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-teal-700">
                      {milestone.year}
                    </p>
                    <h3 className="mt-2 text-xl font-black text-slate-950">
                      {milestone.event}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-[320px] overflow-hidden rounded-lg bg-slate-100">
              <Image
                src="/logo/logo.jpeg"
                alt="Medivonix Healthcare Solutions logo"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                Why Medivonix
              </p>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                Built for innovation conversations with clinicians, hospitals,
                investors, and collaborators.
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Biomedical device portfolio",
                  "Clinical workflow awareness",
                  "Affordability-first engineering",
                  "India-based healthcare focus",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-slate-200 px-4 py-3 font-bold text-slate-800"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer id="contact" className="bg-slate-950 py-16 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
                Contact
              </p>
              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                Let us discuss clinical needs, partnerships, or product demos.
              </h2>
              <p className="mt-6 max-w-xl leading-8 text-slate-300">
                Share your details and what you need. Every enquiry is addressed
                to our company inbox for follow-up by the Medivonix team.
              </p>

              <div className="mt-8 grid gap-4 text-slate-200">
                <div>
                  <p className="font-bold text-white">
                    Medivonix Healthcare Solutions
                  </p>
                  <p className="mt-2 leading-7">
                    226 Bosepukur Prantick Pally, Kolkata - 700042
                  </p>
                </div>
                <a
                  href="mailto:contact@medivonixhealthcare.com"
                  className="font-bold text-teal-200 hover:text-white"
                >
                  contact@medivonixhealthcare.com
                </a>
                <a
                  href="tel:+919477348046"
                  className="font-bold text-teal-200 hover:text-white"
                >
                  +91 9477348046
                </a>
              </div>
            </div>

            <ContactForm />
          </div>
        </footer>
      </main>
    </>
  );
}
