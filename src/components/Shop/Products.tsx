import { Container, Title } from "@/common";
import { ProductCard } from "./ProductCard";
import { MediaImage, Price } from "@/types";

export type ProductType = {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: Price;
  media: { edges: { node: MediaImage }[] };
};

export type ProductsProps = {
  data: { node: ProductType }[];
};

export function Products({ data }: ProductsProps) {
  if (!data.length) return null;
  return (
    <section className={"py-12"}>
      <Container>
        <div>
          <Title className={"mb-10 text-center"}>Our Products</Title>
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-[5vw] lg:px-[8vw] gap-y-[12vw] md:gap-x-[8vw] lg:gap-x-[5vw] lg:gap-y-[6vw]"
            }
          >
            {data.map((edge) => (
              <ProductCard key={edge.node.id} data={edge.node} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
