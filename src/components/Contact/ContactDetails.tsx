import { Container, Loader, Title } from "@/common";
import { formatPhoneNumber, ImgUrl } from "@/lib/utils";
import { LinkType, Portrait } from "@/types";
import Image from "next/image";
import Link from "next/link";

export type AddressDetails = {
  address: {
    location: string;
    label: string;
  };
  phone: {
    label: string;
    number: string;
  };
  socials: LinkType[];
  email: LinkType;
};

export type ContactDetails = {
  _key: string;
  _type: string;
  title: string;
  description: string;
  textsvg: Portrait;
  portrait: Portrait;
  details: AddressDetails;
};

export type ContactDetailsProps = {
  data: ContactDetails;
};

export default function ContactDetails({ data }: ContactDetailsProps) {
  const { details, textsvg, portrait, title, description } = data;
  const { address, email, phone, socials } = details;

  return (
    <section className={"mt-16 lg:mt-28"}>
      <Container>
        <div className={"flex flex-col lg:flex-row"}>
          <div className={"flex-1 mb-10 md:mb-14 lg:mb-0"}>
            <div
              className={
                "relative aspect-[11/10] lg:aspect-[10/11] rounded-2xl overflow-hidden"
              }
            >
              <Image
                src={ImgUrl(portrait)}
                alt={"Image SVG"}
                fill
                className={"object-cover"}
              />
            </div>
          </div>
          <div
            className={
              "flex-1 flex flex-col lg:items-center lg:pt-[7.5vw] lg:px-5"
            }
          >
            <div className={"w-full lg:w-[75%] lg:max-w-[720px]"}>
              {title && (
                <Title
                  className={
                    "text-center lg:text-left text-[15vw] lg:text-[10vw] xl:text-[9vw] 2xl:text-[150px] leading-[1] lg:leading-[1] xl:leading-[1] 2xl:leading-[1] mb-6 lg:mb-8"
                  }
                >
                  {title}
                </Title>
              )}
              {textsvg && (
                <div
                  className={
                    "relative mx-auto lg:mx-0 w-[110px] h-[44px] lg:w-[140px] lg:h-[55px] mb-4 lg:mb-8"
                  }
                >
                  <Image
                    src={ImgUrl(textsvg)}
                    alt={"Text Image"}
                    fill
                    className={"object-contain"}
                  />
                </div>
              )}
              {description && (
                <p
                  className={
                    "mb-12 text-center font-avenirThin text-pka_blue2 max-w-[650px] mx-auto lg:text-left lg:mx-0 lg:max-w-none"
                  }
                >
                  {description}
                </p>
              )}
              {email && (
                <div
                  className={
                    "relative group py-4 border-b border-pka_blue2 lg:border-none"
                  }
                >
                  <h6
                    className={
                      "lg:group-hover:text-white transition-colors duration-300 lg:text-lg font-avenirThin xl:text-xl text-pka_blue2"
                    }
                  >
                    {email.label}
                  </h6>
                  <Link
                    href={`mailto:${email.url.trim()}`}
                    className={
                      "lg:group-hover:text-white transition-colors duration-300 text-pka_blue2 font-garamond font-bold text-2xl md:text-3xl"
                    }
                  >
                    {email.url}
                  </Link>
                  <div
                    className={
                      "absolute w-full bottom-0 -inset-x-4 transition-all duration-300 bg-pka_blue h-0 lg:group-hover:h-full -z-10 rounded-2xl"
                    }
                  ></div>
                </div>
              )}
              {phone && (
                <div
                  className={
                    "relative group py-4 border-b border-pka_blue2 lg:border-none"
                  }
                >
                  <h6
                    className={
                      "lg:group-hover:text-white transition-colors duration-300 lg:text-lg font-avenirThin xl:text-xl text-pka_blue2"
                    }
                  >
                    {phone.label}
                  </h6>
                  <Link
                    href={`tel:+${formatPhoneNumber(phone.number)}`}
                    className={
                      "lg:group-hover:text-white transition-colors duration-300 text-pka_blue2 font-garamond font-bold text-2xl md:text-3xl"
                    }
                  >
                    {phone.number}
                  </Link>
                  <div
                    className={
                      "absolute w-full bottom-0 -inset-x-4 transition-all duration-300 bg-pka_blue h-0 lg:group-hover:h-full -z-10 rounded-2xl"
                    }
                  ></div>
                </div>
              )}
              {socials && (
                <div
                  className={"py-4 border-b border-pka_blue2 lg:border-none"}
                >
                  <h6
                    className={
                      "lg:text-lg font-avenirThin xl:text-xl text-pka_blue2"
                    }
                  >
                    Socials
                  </h6>
                  {socials.map((i, Idx) => (
                    <Link
                      key={i._key}
                      href={i.url.trim()}
                      target={"_blank"}
                      className={
                        "text-pka_blue2 font-garamond font-bold text-2xl md:text-3xl relative before:bg-pka_blue before:absolute before:w-0 before:transition-all hover:before:w-full before:rounded-sm before:bottom-1 before:h-1 before:duration-300"
                      }
                    >
                      <span>{i.label}</span>
                      {socials.length > Idx + 1 && <span>{", "}</span>}
                    </Link>
                  ))}
                </div>
              )}
              {address && (
                <div
                  className={
                    "py-4 lg:text-lg font-avenirThin xl:text-xl text-pka_blue2 border-b border-pka_blue2 lg:border-none"
                  }
                >
                  <h6 className={"mb-2"}>{address.label}</h6>
                  <p className={"text-base"}>{address.location}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
