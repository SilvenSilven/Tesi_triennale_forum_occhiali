import Link from "next/link";

type BrandCardProps = {
  name: string;
  slug: string;
  description?: string | null;
  productCount?: number;
  country?: string | null;
};

export default function BrandCard({
  name,
  slug,
  description,
  productCount = 0,
  country,
}: BrandCardProps) {
  return (
    <article
      className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-sm transition-shadow"
      data-component="brand-card"
      data-brand-slug={slug}
    >
      {/* Logo placeholder */}
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 mx-auto">
        <span className="text-2xl font-bold text-gray-300">{name.charAt(0)}</span>
      </div>

      <h3 className="text-sm font-semibold text-gray-900 text-center">
        <Link href={`/occhiali-da-sole/brand/${slug}`} className="hover:text-blue-700 transition-colors">
          {name}
        </Link>
      </h3>

      {country && (
        <p className="text-xs text-gray-400 text-center mt-0.5" data-country>{country}</p>
      )}

      {description && (
        <p className="text-xs text-gray-500 text-center mt-2 line-clamp-2">{description}</p>
      )}

      <p className="text-xs text-gray-400 text-center mt-2">
        {productCount} prodotti
      </p>
    </article>
  );
}
