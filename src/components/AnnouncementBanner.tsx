"use client";

import React, { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client";
import { Container } from "@/common";
import { SanityDocument } from "next-sanity";
import { Transition } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { useAnnouncementContext } from "@/context/AnnouncementContext";
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
    setIsOpen(true);
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
        show={false}
        enter={"transition duration-100 ease-out"}
        enterFrom={"opacity-0"}
        enterTo={"opacity-100"}
        leave={"transition duration-75 ease-out"}
        leaveFrom={"opacity-100"}
        leaveTo={"opacity-0"}
      >
        <div
          className={
            "bg-pka_green z-[999] top-0 left-1/2 -translate-x-1/2 fixed max-w-[1920px] w-full mx-auto"
          }
        >
          <Container>
            <div className="text-pka_blue2 relative text-sm tracking-[.2em] font-bold leading-none text-center py-5 font-thunder">
              <button
                className={"right-4 top-2 absolute"}
                onClick={() => setIsOpen(false)}
              >
                <XIcon
                  className={
                    "text-pka_blue2 hover:text-white transition-colors duration-300"
                  }
                />
              </button>
              {data && data.length > 0 && <span>{data[0].message}</span>}
            </div>
          </Container>
        </div>
      </Transition>
      <div
        className={cn(
          "fixed z-[998] w-full h-full top-0 left-0 bg-pka_black/30",
          {
            hidden: true,
          }
        )}
      ></div>
    </>
  );
}
