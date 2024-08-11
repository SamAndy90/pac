import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import cardImage from "../../../resources/png/background.png";
const SignUpPage = () => {
  return (
    <div className="flex flex-row  justify-center items-center min-h-[925px]">
      <div className="flex mx-[10px] flex-row rounded-[20px] bg-white w-full justify-center max-w-[1339px] min-h-[639px] my-[140px]">
        <div className="w-1/2 flex justify-center items-center ">
          <SignUp
            appearance={{
              elements: {
                card: "shadow-none",
                formButtonPrimary:
                  " rounded-[6.4px]  hover:bg-[#33455A]   hover:text-[#FFC52E]  text-[#33455A] font-avenirBold   bg-[#FFC52E]   ",
              },
            }}
          />
        </div>
        <div className="w-1/2 hidden md:flex justify-center items-center">
          <div className="relative w-full h-full">
            <Image
              src={cardImage}
              alt="product"
              className="rounded-[20px]"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
