import Image from "next/image";
import Link from "next/link";

export type ProductCardProps = {
  data: any;
};

export function ProductCard({ data }: ProductCardProps) {
  const { title, description, images, id, handle } = data;

  const imageSrc = images.edges ? images.edges[0]?.node.url : "";
  const imageAltText = images.edges
    ? images.edges[0]?.node.altText
    : "Product image";

  return (
    <Link
      href={`/shop/${handle}?id=${id}`}
      className={"w-full lg:col-span-1 group"}
    >
      <div className={"aspect-[10/14] mb-4 lg:mb-6 relative"}>
        <div
          className={
            "absolute inset-0 bg-pka_green z-10 xl:h-[90%] transition-transform duration-700 rounded-2xl delay-100 lg:group-hover:rotate-[3deg]"
          }
        ></div>
        <div
          className={"w-full h-full relative overflow-hidden rounded-xl z-20"}
        >
          <Image
            // src={urlFor(portrait.asset._ref).url()}
            // alt={"Product photo"}
            src={imageSrc}
            alt={imageAltText}
            fill
            className={
              "object-cover lg:group-hover:scale-105 transition-transform duration-700"
            }
          />
        </div>
      </div>
      <h4
        className={
          "mb-1 lg:mb-2 font-garamond font-bold text-pka_blue text-center text-[8.2vw] md:text-[5vw] lg:text-[3.2vw] xl:text-[2.8vw] leading-none"
        }
      >
        {title}
      </h4>
      <p
        className={
          "text-pka_blue2/90 lg:text-lg leading-tight lg:leading-tight text-center line-clamp-5"
        }
      >
        {description}
      </p>
    </Link>
  );
}
