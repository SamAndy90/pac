import Image from "next/image";
import LoaderImage from "/src/resources/png/pac-logo.png";

export const Loader = () => {
  return (
    <div
      className={
        "p-1 bg-pka_blue rounded-full inline-block animate-spin duration-1500"
      }
    >
      <Image
        src={LoaderImage}
        alt={"Logo"}
        className="w-16 h-16 translate-y-1"
        priority={true}
      />
    </div>
  );
};
