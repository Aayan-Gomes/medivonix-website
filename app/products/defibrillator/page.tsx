import type { Metadata } from "next";
import Navbar from "../../../components/Navbar";
import ProductDetail from "../../../components/ProductDetail";
import { getProduct } from "../../data/products";

const product = getProduct("defibrillator");

export const metadata: Metadata = {
  title: "Low-Cost Defibrillator",
  description:
    "Accessible emergency cardiac response technology concept from Medivonix Healthcare Solutions.",
};

export default function Defibrillator() {
  if (!product) return null;

  return (
    <>
      <Navbar />
      <ProductDetail product={product} />
    </>
  );
}
