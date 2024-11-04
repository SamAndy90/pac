import { Container, Title } from "@/common";
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
    <section className={"mt-16 lg:mt-28 pb-40"}>
      <Container>
        <div className={"flex flex-col lg:flex-row"}>
          <div className={"flex-1 mb-10 lg:mb-0"}>
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
                    "relative mx-auto w-[110px] h-[44px] lg:w-[140px] lg:h-[55px] mb-3 lg:mb-6"
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
                    "mb-12 lg:text-lg text-center font-avenirThin xl:text-xl text-pka_blue2 max-w-[650px] mx-auto lg:text-left lg:mx-0 lg:max-w-none"
                  }
                >
                  {description}
                </p>
              )}
              {email && (
                <div>
                  <h6>{email.label}</h6>
                  <Link href={`mailto:${email.url.trim()}`}>{email.url}</Link>
                </div>
              )}
              {phone && (
                <div className={"relative group py-4"}>
                  <h6>{phone.label}</h6>
                  <Link href={`tel:+${formatPhoneNumber(phone.number)}`}>
                    {phone.number}
                  </Link>
                  <div
                    className={
                      "absolute w-full bottom-0 -inset-x-3 transition-all duration-300 bg-pka_blue h-0 lg:group-hover:h-full -z-10 rounded-2xl"
                    }
                  ></div>
                </div>
              )}
              {socials && (
                <div>
                  <h6>Socials</h6>
                  {socials.map((i, Idx) => (
                    <Link key={i._key} href={i.url.trim()} target={"_blank"}>
                      <span>{i.label}</span>
                      {socials.length > Idx + 1 && <span>{", "}</span>}
                    </Link>
                  ))}
                </div>
              )}
              {address && (
                <div>
                  <h6>{address.label}</h6>
                  <p>{address.location}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
