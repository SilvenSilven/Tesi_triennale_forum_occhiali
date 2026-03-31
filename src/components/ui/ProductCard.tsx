import Link from "next/link";

type ProductCardProps = {
  id: string;
  name: string;
  slug: string;
  brandName: string;
  price?: number | null;
  currency?: string;
  imageUrl?: string | null;
  rating?: number | null;
  reviewCount?: number;
};

export default function ProductCard({
  name,
  slug,
  brandName,
  price,
  currency = "EUR",
  rating,
  reviewCount = 0,
}: ProductCardProps) {
  const formattedPrice = price
    ? new Intl.NumberFormat("it-IT", { style: "currency", currency }).format(price)
    : null;

  return (
    <article
      className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-sm transition-shadow"
      data-component="product-card"
      data-product-slug={slug}
    >
      {/* Image placeholder */}
      <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center mb-3">
        <span className="text-4xl text-gray-300" aria-hidden="true">🕶️</span>
      </div>

      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide" data-brand>{brandName}</p>
        <h3 className="text-sm font-semibold text-gray-900 mt-0.5">
          <Link href={`/occhiali-da-sole/prodotti/${slug}`} className="hover:text-blue-700 transition-colors">
            {name}
          </Link>
        </h3>

        <div className="flex items-center justify-between mt-2">
          {formattedPrice ? (
            <span className="text-sm font-bold text-gray-900" data-price>{formattedPrice}</span>
          ) : (
            <span className="text-xs text-gray-400">Prezzo n.d.</span>
          )}

          {rating !== null && rating !== undefined ? (
            <span className="text-xs text-amber-600" data-rating>
              {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))} ({reviewCount})
            </span>
          ) : (
            <span className="text-xs text-gray-400">Nessuna recensione</span>
          )}
        </div>
      </div>
    </article>
  );
}
