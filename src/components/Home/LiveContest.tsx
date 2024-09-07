import Image from "next/image";
import { Container, Title } from "@/common";
import { Portrait } from "@/types";
import { urlFor } from "@/lib/utils";
import CountdownComponent from "@/components/countdownCounter";

type TData = {
  _key: string;
  portrait: Portrait;
  title: string;
  _type: string;
  time: string;
  endtime: string;
};

type Props = {
  data: TData;
};

export default function LiveContest({ data }: Props) {
  const { title, portrait } = data;
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
        src={urlFor(portrait.asset._ref).url()}
        alt="banner"
        className="object-cover"
        fill
      />
      <Container
        className={
          "relative min-h-screen flex flex-col gap-16 items-center justify-between"
        }
      >
        {/* <h2 className="text-6xl md:text-7xl lg:text-8xl uppercase tracking-widest md:tracking-[0.25em] mt-[13.6vh] text-pka_blue xl:text-9xl 2xl:text-[150px] text-center font-thunder font-bold">
          {title}
        </h2> */}
        <Title className={"mt-[13.6vh] text-center"}>{title}</Title>
        <div className="mb-[8.7vh]">{timerDisplay()}</div>
      </Container>
    </section>
  );
}
