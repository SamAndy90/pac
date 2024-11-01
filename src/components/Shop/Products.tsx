import { Container, Title } from "@/common";
import { Portrait } from "@/types";
import { ProductCard } from "./ProductCard";

// export type Product = {
//   title: string;
//   description: string;
//   portrait: Portrait;
//   _type: string;
//   _key: string;
// };

// type ProductsData = {
//   title: string;
//   productsList: Product[];
//   _type: string;
//   _key: string;
// };

export type ProductsProps = {
  data: any[];
};

export function Products({ data }: ProductsProps) {
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
