import type { Metadata } from "next";
import { Activity, Cpu, Monitor, ScanLine } from "lucide-react";
import ModelViewer from "../../../components/ModelViewer";
import Navbar from "../../../components/Navbar";
import ProductDetail from "../../../components/ProductDetail";
import { getProduct } from "../../data/products";

const product = getProduct("bilirubinometer");

const systemParts = [
  {
    title: "Handheld enclosure",
    copy: "A compact housing intended to support independent point-of-care operation and straightforward handling.",
    icon: Activity,
  },
  {
    title: "Optical sensing",
    copy: "The measurement concept uses controlled light emission and photodiode response to acquire bilirubin-related optical data.",
    icon: ScanLine,
  },
  {
    title: "Onboard processing",
    copy: "Integrated electronics are intended to process sensor signals and support calibration-led prototype development.",
    icon: Cpu,
  },
  {
    title: "Integrated display",
    copy: "The screen presents readings directly on the handheld unit without requiring the phototherapy machine.",
    icon: Monitor,
  },
];

export const metadata: Metadata = {
  title: "Handheld Bilirubinometer",
  description:
    "Independent handheld optical bilirubinometer prototype from Medivonix Healthcare Solutions.",
};

export default function Bilirubinometer() {
  if (!product) return null;

  return (
    <>
      <Navbar />
      <ProductDetail product={product}>
        <section className="border-y border-slate-200 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                  Independent device
                </p>
                <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
                  A self-contained handheld measurement concept.
                </h2>
                <p className="mt-5 leading-8 text-slate-600">
                  The bilirubinometer is designed as a separate device rather
                  than a dependent phototherapy accessory. Its sensing,
                  processing, and display functions are packaged together for
                  standalone prototype testing.
                </p>
                <div className="mt-7 rounded-lg border border-teal-200 bg-teal-50 p-5">
                  <p className="font-black text-slate-950">
                    Prototype and research stage
                  </p>
                  <p className="mt-2 leading-7 text-slate-600">
                    Clinical accuracy, calibration, safety, usability, and
                    regulatory validation are required before clinical use.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {systemParts.map((part) => {
                  const Icon = part.icon;

                  return (
                    <article
                      key={part.title}
                      className="rounded-lg border border-slate-200 bg-white p-6"
                    >
                      <Icon
                        aria-hidden="true"
                        className="h-6 w-6 text-teal-700"
                      />
                      <h3 className="mt-5 text-xl font-black text-slate-950">
                        {part.title}
                      </h3>
                      <p className="mt-3 leading-7 text-slate-600">
                        {part.copy}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
            3D assembly
          </p>
          <h2 className="mt-4 text-3xl font-black text-slate-950">
            Inspect the handheld development model
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Rotate and zoom the handheld unit isolated from the supplied
            phototherapy assembly to inspect its enclosure and integrated
            display architecture.
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
