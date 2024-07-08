import { Product } from "@/types/product";

const ProductPrice = ({ product }: { product: Product }) => {
  const finalPrice =
    product?.price_range?.maximum_price?.final_price?.value || 0;
  const regular_price =
    product?.price_range?.maximum_price?.regular_price?.value || 0;
  return (
    <div className="mt-2 mb-5 flex items-center justify-between">
      <p>
        <span className="text-3xl font-bold text-slate-900">
          {product.price_range.maximum_price.final_price.value}₫
        </span>
        {finalPrice < regular_price && (
          <span className="text-sm text-slate-900 line-through">
            {product.price_range.maximum_price.regular_price.value}₫
          </span>
        )}
      </p>
    </div>
  );
};

export default ProductPrice;
