import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { FaArrowRight } from "react-icons/fa";

type Props = {
  title: string;
  price: string;
  imageUrl?: string;
  id: string;
};

const ProductCard = ({ id, title, price, imageUrl }: Props) => {
  return (
    <Link
      className="relative mx-auto w-full max-w-[600.67px] h-[638.09px] rounded-[20px] overflow-hidden cursor-pointer"
      href={`/pages/products/${id.split("/").pop()}`}
    >
      <div className="relative w-full h-full rounded-[20px] overflow-hidden group">
        {/* <Image
          src={imageUrl}
          alt="banner"
          className=" h-48 w-96 rounded-[20px]"
          layout="fill"
        /> */}

        <div className="absolute inset-0 bg-[#000000] bg-opacity-0 lg:opacity-0  rounded-[20px] group-hover:bg-opacity-25 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="absolute  inset-0 flex  justify-center items-center text-center z-20">
            <div className="text-white h-[638.09px] opacity-[100%] flex  flex-col justify-between text-[48px] font-black">
              <h1 className="mt-[88px] line-clamp-3 text-clip">{title}</h1>
              <div className="mb-[40px] flex flex-col justify-center items-center">
                <div className="text-[18px]">{price}</div>
                <div className="uppercase items-center w-[87px] border-b flex justify-between cursor-pointer border-white text-[14px] font-[500] border-opacity-40 hover:border-opacity-100 transition-all duration-300">
                  BUY NOW
                  <span>
                    <FaArrowRight />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
