import type { Metadata } from "next";
import { CircleDot, Lightbulb, Monitor, ScanLine } from "lucide-react";
import ModelViewer from "../../../components/ModelViewer";
import Navbar from "../../../components/Navbar";
import ProductDetail from "../../../components/ProductDetail";
import { getProduct } from "../../data/products";

const product = getProduct("phototherapy");

const modules = [
  {
    title: "White therapy panel",
    copy: "The primary treatment surface is designed to deliver phototherapy illumination across the neonatal care area.",
    icon: Lightbulb,
  },
  {
    title: "Black display module",
    copy: "A dedicated display and control enclosure provides treatment information and system interaction.",
    icon: Monitor,
  },
  {
    title: "Optical body probe",
    copy: "The compact black probe is designed to acquire optical response data from the body during prototype studies.",
    icon: ScanLine,
  },
  {
    title: "Eight-element sensor layout",
    copy: "Four green LEDs provide illumination while four photodiodes capture response signals for ADC measurement.",
    icon: CircleDot,
  },
];

export const metadata: Metadata = {
  title: "Phototherapy Machine",
  description:
    "Neonatal phototherapy platform with display module and optical monitoring probe from Medivonix Healthcare Solutions.",
};

export default function Phototherapy() {
  if (!product) return null;

  return (
    <>
      <Navbar />
      <ProductDetail product={product}>
        <section className="border-y border-slate-200 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                System architecture
              </p>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
                Therapy, display, and optical sensing in one development
                platform.
              </h2>
              <p className="mt-5 leading-8 text-slate-600">
                The assembly separates the treatment panel, user-facing
                display, and sensing probe so each subsystem can be developed,
                tested, and serviced independently.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((module) => {
                const Icon = module.icon;

                return (
                  <article
                    key={module.title}
                    className="rounded-lg border border-slate-200 bg-white p-6"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-6 w-6 text-teal-700"
                    />
                    <h3 className="mt-5 text-xl font-black text-slate-950">
                      {module.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-600">
                      {module.copy}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
            Interactive prototype
          </p>
          <h2 className="mt-4 text-3xl font-black text-slate-950">
            Explore the complete phototherapy assembly
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Rotate and zoom the supplied CAD model to inspect the white therapy
            panel, black display enclosure, optical probe, support structure,
            and independent handheld bilirubinometer.
          </p>
          <div className="mt-8">
            <ModelViewer
              modelPath={product.modelPath}
              modelRotation={product.modelRotation}
              modelFocus={product.modelFocus}
            />
          </div>
        </section>
      </ProductDetail>
    </>
  );
}
