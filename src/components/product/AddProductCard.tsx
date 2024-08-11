import React from "react";

type Props = {};

const AddProductCard = (props: Props) => {
  const handleClick = () => {
    // You can add logic here, like tracking analytics or handling dynamic URLs
    window.open("#"); // Redirects to the link
  };
  return (
    <div className="relative mx-auto w-full max-w-[446.67px] h-[638.09px] rounded-[20px] overflow-hidden">
      <div className="bg-[#62CCB4] flex justify-center text-center w-full h-full rounded-[20px] overflow-hidden group">
        <div className="p-[50px] text-[#33455A] flex flex-col gap-[50px] items-center">
          <h1 className="font-avenirThin text-2xl w-[310px] mx-auto">
            LOOKING FOR SOMETHING ELSE?
          </h1>
          <p className="text-[18px]">You can purchase contest tokens here.</p>
          <button
            className="w-[183px] h-[62px] rounded-[20px] font-avenir text-lg bg-[#EFF178] border-[#33455A] border-2"
            onClick={handleClick}
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductCard;
