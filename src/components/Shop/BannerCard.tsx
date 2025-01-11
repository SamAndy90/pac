import Image from "next/image";

type BannerCardProps = {
  title?: string;
  imageUrl: string;
};

const BannerCard = ({ title, imageUrl }: BannerCardProps) => {
  return (
    <section className="w-full h-[238px] md:h-[300px] lg:h-[300px] rounded-lg relative flex justify-center items-center overflow-hidden">
      <div className="w-full mx-2 relative rounded-lg h-full">
        <div className="absolute inset-0 bg-[#0A1200] bg-opacity-20 rounded-lg" />
        <Image
          src={imageUrl}
          alt={"banner"}
          fill
          className={"object-cover rounded-lg"}
        />
      </div>

      <div className="absolute flex justify-center items-center inset-0">
        <div className="text-center flex items-center justify-center w-full h-full font-avenir text-white opacity-[75%] text-[120px] md:text-[160px] lg:text-[200px] font-black relative z-10">
          <h1>{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default BannerCard;
