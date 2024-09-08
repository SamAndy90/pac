import { Container, Title } from "@/common";
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
    <section className={"py-12"}>
      <Container>
        <div>
          <Title className={"mb-10 text-center"}>{title}</Title>
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-[5vw] lg:px-[8vw] gap-[12vw] lg:gap-[5vw] lg:gap-y-[6vw]"
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
