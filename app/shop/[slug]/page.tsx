import { notFound } from "next/navigation";
import { productBySlug, products } from "@/data/products";
import { ProductDetail } from "@/components/products/product-detail";
export function generateStaticParams(){return products.map(product=>({slug:product.slug}))}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}) {const {slug}=await params;const product=productBySlug(slug);if(!product)notFound(); return <ProductDetail product={product}/>}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=productBySlug(slug);return {title:product?`${product.name} | NIBBLY`:"Product not found | NIBBLY",description:product?.description}}
