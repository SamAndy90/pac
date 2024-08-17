"use client";
import React, { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client";
import { Container } from "@/common";

interface Announcement {
  _id: string;
  message: string;
}

async function getData(): Promise<Announcement[]> {
  const fetchData = await client.fetch("*[_type == 'announcement']");
  return fetchData;
}

export default function Banner() {
  const [data, setData] = useState<Announcement[] | undefined>(); // Provide type annotation

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Conditional rendering to handle undefined data or empty array
  return (
    <section className={"bg-pka_green"}>
      <Container>
        <div className="text-pka_blue2 text-3xl md:text-4xl tracking-[.2em] font-bold leading-none text-center pt-7 pb-2 font-thunder">
          {data && data.length > 0 && <span>{data[0].message}</span>}
        </div>
      </Container>
    </section>
  );
}
