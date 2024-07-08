import { Product } from "@/types/product";
import Image from "next/image";
import React from "react";
import ProductPrice from "./ProductPrice";
import RatingStar from "./RatingStar";
import { Button } from "antd";
import AddToCartButton from "@/components/AddToCardBtn";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md group">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden border rounded-xl">
        <Image
          width={300}
          height={200}
          className="object-contain  group-hover:scale-110 duration-300"
          src={product.image.url}
          alt="product image"
        />
      </div>
      <div className="mt-4 px-5 pb-5">
        <h5
          className="text-xl tracking-tight text-slate-900 line-clamp-1 mb-2"
          title={product.name}
        >
          {product.name}
        </h5>

        <RatingStar ratingSummary={product.rating_summary} />
        <ProductPrice product={product} />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
