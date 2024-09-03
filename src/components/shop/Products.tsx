import { Container } from "@/common";
import { Portrait } from "@/types";
import { ProductCard } from "./ProductCard";

export type Product = {
  title: string;
  description: string;
  portrait: Portrait;
  _type: string;
  _key: string;
};

type ProductsData = {
  title: string;
  productsList: Product[];
  _type: string;
  _key: string;
};

export type ProductsProps = {
  data: ProductsData;
};

export function Products({ data }: ProductsProps) {
  const { title, productsList } = data;

  return (
    <section>
      <Container>
        <div>
          <h2
            className={
              "mb-10 uppercase text-center text-pka_blue font-thunder font-bold text-6xl tracking-wider"
            }
          >
            {title}
          </h2>
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-[20vw] lg:mb-[15vw] px-[5vw] lg:px-[8vw] gap-[12vw] lg:gap-[5vw] lg:gap-y-[6vw]"
            }
          >
            {productsList.map((product) => (
              <ProductCard key={product._key} data={product} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
