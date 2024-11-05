import { Container } from "@/common";
import { cn } from "@/lib/utils";

export type DataType = {
  subtext: string;
  maintext: string;
  _key: string;
  _type: string;
};

export type InformingProps = {
  data: DataType;
};

export default function Informing({ data }: InformingProps) {
  const { subtext, maintext } = data;
  return (
    <section>
      <Container>
        <div
          className={cn(
            "pt-[20vw] md:pt-[15vw] lg:pt-[10vw] text-pka_blue2 pb-[20vw] lg:pb-[10vw] mb-12 text-center"
          )}
        >
          <h2 className={"mb-8 lg:text-xl leading-none"}>{subtext}</h2>
          <p
            className={
              "font-garamond font-medium md:w-[90%] mx-auto lg:w-[85%] text-center text-[8vw] md:text-[6vw] lg:text-[4.2vw] leading-none md:leading-[0.9] lg:leading-none"
            }
          >
            {maintext}
          </p>
        </div>
      </Container>
    </section>
  );
}
