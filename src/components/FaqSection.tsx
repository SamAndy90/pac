import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
type FAQItem = {
  answer: string;
  question: string;
  _key: string;
};
type TData = {
  faqs: FAQItem[];
  _type: "Frequently asked question";
  _key: string;
  title: string;
};
type Props = {
  data: TData;
};
const FAQSection = ({ data }: Props) => {
  return (
    <div className="max-w-[1920px] py-[40px] min-h-[70vh] w-full">
      <div className="relative w-3/5 mt-10 mx-auto">
        <Accordion type="single" collapsible>
          {data.faqs.length > 0 &&
            data.faqs.map((item, index) => (
              <AccordionItem key={index} value={item._key}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
};
export default FAQSection;
