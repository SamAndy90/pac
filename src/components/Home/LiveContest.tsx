import Image from "next/image";
import { Container, Title } from "@/common";
import { Color, Portrait } from "@/types";
import { cn, ImgUrl } from "@/lib/utils";
import CountdownComponent from "@/components/countdownCounter";

type TData = {
  portrait: Portrait;
  title: string;
  titleColor?: Color;
  titleFontSize?: string;
  time: string;
  endtime: string;
  _key: string;
  _type: string;
};

type Props = {
  data: TData;
};

export default function LiveContest({ data }: Props) {
  const { title, portrait, titleColor, titleFontSize } = data;
  const currentTime = new Date().getTime();

  let time = true;
  if (currentTime < new Date(data.time).getTime()) {
    time = false;
  }

  const timerDisplay = () => {
    const currentTime = new Date();
    const endTime = new Date(data.endtime);
    const startTime = new Date(data.time);

    if (currentTime > startTime && currentTime < endTime) {
      return <CountdownComponent timer={data.endtime} />;
    } else if (currentTime > endTime) {
      return (
        <div className="text-5xl text-pka_blue2 font-bold font-thunder">
          Event Ended
        </div>
      );
    } else {
      return (
        <div className="text-5xl text-pka_blue2 font-bold font-thunder">
          Coming Soon!
        </div>
      );
    }
  };

  return (
    <section className="relative mx-auto min-h-screen max-w-[1920px] overflow-hidden">
      <Image
        src={ImgUrl(portrait)}
        alt="banner"
        className="object-cover"
        fill
      />
      <Container
        className={
          "relative min-h-screen flex flex-col gap-16 items-center justify-between"
        }
      >
        <h2
          style={{ color: titleColor?.value ?? "" }}
          className={cn(
            "mt-[13.6vh] text-center uppercase font-thunder font-bold xl:text-7xl text-6xl text-pka_blue tracking-wider",
            {
              "xl:text-5xl text-4xl": titleFontSize === "s",
              "xl:text-6xl text-5xl": titleFontSize === "m",
              "xl:text-7xl text-6xl": titleFontSize === "l",
              "xl:text-8xl text-7xl": titleFontSize === "xl",
              "xl:text-9xl text-8xl": titleFontSize === "2xl",
            }
          )}
        >
          {title}
        </h2>
        <div className="mb-[8.7vh]">{timerDisplay()}</div>
      </Container>
    </section>
  );
}
