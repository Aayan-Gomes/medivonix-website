import type { Metadata } from "next";
import Navbar from "../../../components/Navbar";
import ProductDetail from "../../../components/ProductDetail";
import { getProduct } from "../../data/products";

const product = getProduct("phototherapy");

export const metadata: Metadata = {
  title: "Phototherapy Machine",
  description:
    "Neonatal phototherapy technology concept from Medivonix Healthcare Solutions.",
};

export default function Phototherapy() {
  if (!product) return null;

  return (
    <>
      <Navbar />
      <ProductDetail product={product} />
    </>
  );
}
