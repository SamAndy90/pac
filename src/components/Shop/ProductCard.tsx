import Image from "next/image";
import Link from "next/link";
import { FaRegImages } from "react-icons/fa6";

export type ProductCardProps = {
  data: any;
};

export function ProductCard({ data }: ProductCardProps) {
  const { title, description, media, id, handle } = data;

  const imageSrc = media.edges[0]?.node.image?.url || null;
  const imageAltText = media.edges[0]?.node.image?.altText || "Product image";

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
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAltText}
              fill
              className={
                "object-cover lg:group-hover:scale-105 transition-transform duration-700"
              }
            />
          ) : (
            <div
              className={
                "bg-pka_green_light aspect-[10/14] rounded-2xl flex items-center justify-center"
              }
            >
              <FaRegImages className={"text-pka_blue2 size-20"} />
            </div>
          )}
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
