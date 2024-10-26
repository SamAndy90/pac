"use client";

import React, { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client";
import { Container } from "@/common";
import { SanityDocument } from "next-sanity";
import { Transition } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { useAnnouncementContext } from "@/contexts/Announcement";
import { cn } from "@/lib/utils";

type Announcement = SanityDocument<{
  message: string;
}>;

async function getData(): Promise<Announcement[]> {
  return await client.fetch("*[_type == 'announcement']");
}

export default function Banner() {
  const [data, setData] = useState<Announcement[] | undefined>();
  const { isOpen, setIsOpen } = useAnnouncementContext();

  useEffect(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <>
      <Transition
        show={isOpen}
        enter={"transition duration-100 ease-out"}
        enterFrom={"opacity-0"}
        enterTo={"opacity-100"}
        leave={"transition duration-75 ease-out"}
        leaveFrom={"opacity-100"}
        leaveTo={"opacity-0"}
      >
        <div
          className={
            "bg-white z-[999] shadow-lg top-1/2 -translate-y-1/2 rounded-xl left-1/2 -translate-x-1/2 fixed max-w-[calc(100vw-24px)] md:max-w-[700px] w-full md:mx-auto"
          }
        >
          <Container>
            <div className="text-pka_blue px-8 relative text-lg tracking-widest font-bold leading-none text-center py-5 font-thunder">
              <button
                className={"right-0 top-2 absolute"}
                onClick={() => setIsOpen(false)}
              >
                <XIcon
                  className={
                    "text-pka_blue2 size-5 hover:text-pka_green transition-colors duration-300"
                  }
                />
              </button>
              {data && data.length > 0 && <p>{data[0].message}</p>}
            </div>
          </Container>
        </div>
      </Transition>
      <div
        className={cn(
          "fixed z-[998] w-full h-full top-0 left-0 bg-white/20 backdrop-blur",
          {
            hidden: !isOpen,
          }
        )}
      ></div>
    </>
  );
}
