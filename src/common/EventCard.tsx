import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import CountdownComponent from "../components/countdownCounter";
import { cn, ImgUrl } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/Home/HappeningNow";
import { Button } from "./UI/Button";

type EventCardProps = {
  card: Card;
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

export const EventCard: FC<EventCardProps> = ({ card, className }) => {
  const {
    subtitle,
    subtitlePosition,
    title,
    titlePosition,
    description,
    descriptionPosition,
    ctaComponent,
    cta,
    ctaPosition,
    status,
    slug,
    portrait,
    starttime,
    time,
    timerstyle,
  } = card;

  const loadTimer = () => {
    const currentTime = new Date();
    const startTime = new Date(starttime);
    const endTime = new Date(time);

    if (currentTime > startTime && currentTime < endTime) {
      return (
        <CountdownComponent
          bgColor={timerstyle?.bgcolor?.value}
          textColor={timerstyle?.numcolor?.value}
          timer={time}
          size={"small"}
        />
      );
    } else if (currentTime > endTime) {
      return (
        <div className="font-thunder text-[38px] tracking-wider xl:text-[38px] 2xl:text-[42px] lg:text-[28px] text-white">
          Event Ended
        </div>
      );
    } else {
      return (
        <div className="font-thunder text-[38px] tracking-wider xl:text-[38px] 2xl:text-[42px] lg:text-[28px] text-white ">
          Coming Soon
        </div>
      );
    }
  };

  const Component = status === "active" ? Link : "div";

  // aspect-[1/1.435]
  return (
    <Component
      href={status === "active" ? `/contests/${slug.current.trim()}` : ""}
      className={cn(
        "max-w-[446px] group h-full px-3 py-8 mx-auto overflow-hidden relative rounded-[20px] text-center flex flex-col items-center gap-y-4 bg-pka_green_light",
        className
      )}
    >
      <Image
        src={ImgUrl(portrait)}
        alt={"Background"}
        className="object-cover group-hover:scale-105 transition-all duration-500"
        fill
      />
      <div
        className={
          "absolute pointer-events-none z-0 inset-0 bg-pka_black/15 group-hover:bg-pka_black/30 group-hover:backdrop-blur-sm transition-all duration-300"
        }
      />
      {subtitle && (
        <span
          className={cn(
            "relative font-averia text-xs uppercase text-white text-center w-full",
            {
              "text-left": subtitlePosition === "left",
              "text-right": subtitlePosition === "right",
            }
          )}
        >
          {subtitle}
        </span>
      )}
      {title && (
        <h3
          className={cn(
            "relative flex-1 !leading-[1.4] font-thunder text-5xl text-white text-center w-full",
            {
              "text-left": titlePosition === "left",
              "text-right": titlePosition === "right",
            }
          )}
        >
          {title}
        </h3>
      )}
      {description && (
        <p
          className={cn(
            "relative flex-1 flex-grow-[3] text-white text-center w-full line-clamp-6 mb-4",
            {
              "text-left": descriptionPosition === "left",
              "text-right": descriptionPosition === "right",
            }
          )}
        >
          {description}
        </p>
      )}
      <div className="z-20 flex-1 mb-2">{loadTimer()}</div>
      <div
        className={cn("flex-1 z-10", {
          "self-start": ctaPosition === "left",
          "w-full": ctaPosition === "full",
          "self-end": ctaPosition === "right",
        })}
      >
        {cta &&
          (status === "active" ? (
            ctaComponent === "button" ? (
              <Button className={"z-10"} fullWidth>
                {cta?.ctaLabel}
              </Button>
            ) : (
              <div
                className={
                  "flex items-center z-0 gap-x-1 border-b pb-[3px] group/link hover:border-b-white transition-all duration-300 border-b-white/50 justify-center text-white"
                }
              >
                <span
                  className={
                    "font-roboto leading-none font-medium text-sm tracking-[0.01em]"
                  }
                >
                  {cta?.ctaLabel}
                </span>
                <ArrowRight
                  className={
                    "size-2.5 group-hover/link:translate-x-1 transition-all duration-300"
                  }
                />
              </div>
            )
          ) : ctaComponent === "button" ? (
            <Link href={cta.ctaLink ?? ""} className={"z-10 w-full"}>
              <Button fullWidth>{cta?.ctaLabel}</Button>
            </Link>
          ) : (
            <div
              className={
                "flex items-center z-0 gap-x-1 border-b pb-[3px] group/link hover:border-b-white transition-all duration-300 border-b-white/50 justify-center text-white"
              }
            >
              <span
                className={
                  "font-roboto leading-none font-medium text-sm tracking-[0.01em]"
                }
              >
                {cta?.ctaLabel}
              </span>
              <ArrowRight
                className={
                  "size-2.5 group-hover/link:translate-x-1 transition-all duration-300"
                }
              />
            </div>
          ))}
      </div>
    </Component>
  );
};
