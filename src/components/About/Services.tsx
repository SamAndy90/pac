import Image from "next/image";
import { Container, Title } from "@/common";
import { Portrait } from "@/types";
import { ImgUrl } from "@/lib/utils";

type ServicesProps = {
  data: {
    subtitle?: string;
    title?: string;
    description?: string[];
    services?: string[];
    portrait: Portrait;
  };
};

const Services = ({ data }: ServicesProps) => {
  const { subtitle, title, description, services, portrait } = data;

  return (
    <section className={"mx-auto w-full"}>
      <Container>
        <div className={"py-12 md:py-16 text-pka_blue lg:py-20 lg:px-[5vw]"}>
          <div className={"lg:mb-16 mb-10"}>
            {subtitle && (
              <h4 className={"text-lg font-avenirThin lg:text-xl mb-3 lg:mb-5"}>
                {subtitle}
              </h4>
            )}
            {title && <Title className={"mb-10 lg:mb-12"}>{title}</Title>}
            <div
              className={
                "grid gap-y-5 gap-x-16 font-avenirThin lg:max-w-[85vw] lg:grid-cols-2 grid-cols-1"
              }
            >
              {description?.map((paragraph, idX) => (
                <p key={paragraph.slice(0, 12) + idX}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className={"flex lg:flex-row flex-col gap-y-5"}>
            <div className={"basis-[55%]"}>
              <div
                className={
                  "lg:aspect-[16/11] aspect-[12/9] rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden relative"
                }
              >
                <Image
                  src={ImgUrl(portrait)}
                  alt={"Image"}
                  fill
                  className={"object-cover"}
                />
              </div>
            </div>
            <div className={"flex-1 lg:text-center"}>
              <ol
                className={
                  "mx-auto py-1 text-start inline-flex flex-col gap-y-1 text-lg lg:text-xl font-avenirThin"
                }
              >
                {services?.map((service, idX) => (
                  <li key={service + idX} className={"flex items-center"}>
                    <span className={"w-5 mr-4 font-avenirBold"}>
                      {idX < 9 ? `0${idX + 1}` : idX + 1}
                    </span>
                    <span>{service}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Services;
