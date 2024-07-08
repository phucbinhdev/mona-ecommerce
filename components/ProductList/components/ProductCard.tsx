import { Product } from "@/types/product";
import Image from "next/image";
import React from "react";
import ProductPrice from "./ProductPrice";
import RatingStar from "./RatingStar";
import { Button } from "antd";

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
        <Button
          block
          className="font-semibold text-sm"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
          type="primary"
        >
          Thêm vào giỏ hàng
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
