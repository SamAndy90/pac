import { Container, Title } from "@/common";
import { ContestProductCard } from "./ContestProductCard";

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

export type ContestProductsProps = {
  products: any[];
};

export function ContestProducts({ products }: ContestProductsProps) {
  if (!products) {
    return (
      <section>
        <Container>
          <div>
            <Title className={"text-center xl:text-5xl text-4xl"}>
              Products not found
            </Title>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Container>
        <div>
          <Title className={"mb-8 text-center xl:text-5xl text-4xl"}>
            Products for event
          </Title>
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:px-[5vw] lg:px-[8vw] gap-y-[12vw] md:gap-x-[8vw] lg:gap-x-[5vw] lg:gap-y-[6vw]"
            }
          >
            {products.map((el) => (
              <ContestProductCard key={el.node.id} product={el.node} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
