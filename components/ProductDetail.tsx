import Image from "next/image";
import Link from "next/link";
import type { Product } from "../app/data/products";

type ProductDetailProps = {
  product: Product;
  children?: React.ReactNode;
};

export default function ProductDetail({ product, children }: ProductDetailProps) {
  return (
    <main className="bg-white text-slate-950">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <Link
              href="/#products"
              className="mb-8 text-sm font-bold text-teal-700 hover:text-teal-900"
            >
              Back to products
            </Link>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              {product.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {product.description}
            </p>
            <div className="mt-8 inline-flex w-fit rounded-full bg-teal-100 px-4 py-2 text-sm font-bold text-teal-800">
              {product.status}
            </div>
          </div>

          {product.image && product.imageAlt ? (
            <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 44vw, 100vw"
              />
            </div>
          ) : (
            <div className="flex min-h-[360px] flex-col justify-end rounded-lg border border-dashed border-slate-300 bg-slate-100 p-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                Visual asset pending
              </p>
              <p className="mt-4 max-w-sm text-2xl font-black text-slate-900">
                {product.mediaStatus}
              </p>
              <p className="mt-3 text-slate-600">
                Product-specific photography will be added once final visuals
                are available.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
            Highlights
          </p>
          <h2 className="mt-4 text-3xl font-black">Product direction</h2>
        </div>
        <div className="grid gap-4">
          {product.highlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-lg border border-slate-200 bg-white p-5 text-lg font-bold text-slate-800"
            >
              {highlight}
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-3">
          {product.specs.map((spec) => (
            <div key={spec.label} className="rounded-lg bg-white p-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                {spec.label}
              </p>
              <p className="mt-3 text-xl font-black text-slate-950">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {children}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-8 rounded-lg bg-slate-950 p-7 text-white sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
              Applications
            </p>
            <h2 className="mt-4 text-3xl font-black">
              Designed for clinical use cases that need dependable access.
            </h2>
          </div>
          <div className="grid gap-3">
            {product.applications.map((application) => (
              <div
                key={application}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-5 py-4 font-bold text-slate-100"
              >
                {application}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
