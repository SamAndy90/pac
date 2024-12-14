import BannerCard from "./BannerCard";
import { ImgUrl } from "@/lib/utils";
import { Portrait } from "@/types";

type Props = {
  data: {
    title?: string;
    bannerStyle?: string;
    portrait: Portrait;
    _key: string;
    _type: string;
  };
};

export default function BannerComponent({ data }: Props) {
  if (!data) return null;

  return <BannerCard title={data?.title} imageUrl={ImgUrl(data.portrait)} />;
}
