import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import ProductDetail from "../../../components/ProductDetail";
import ModelViewer from "../../../components/ModelViewer";
import {
  exchangeMachineGallery,
  exchangeMachineReports,
  getProduct,
} from "../../data/products";

const product = getProduct("exchange-machine");

export const metadata: Metadata = {
  title: "Exchange Blood Transfusion Machine",
  description:
    "Automated neonatal exchange transfusion support from Medivonix Healthcare Solutions.",
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
              Exchange machine prototype visuals
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              These images are currently used only for the Exchange Blood
              Transfusion Machine. Phototherapy and Defibrillator visuals will
              be added when their product-specific assets are ready.
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
          <ModelViewer />
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
                Autodesk Fusion simulation exports for the Exchange Machine
                enclosure, covering structural, thermal, dynamic event, and
                shape optimisation checks.
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
