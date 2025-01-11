import { titleField, portraitField } from "../fields";
import { defineField, defineType } from "sanity";

export const liveContest = defineType({
  name: "page.livecontest",
  type: "object",
  title: "Live Contest",
  fields: [
    defineField(titleField),
    defineField({
      name: "titleColor",
      title: "Title Color",
      type: "simplerColor",
    }),
    defineField({
      name: "titleFontSize",
      title: "Title Font Size",
      type: "string",
      options: {
        list: [
          { title: "S", value: "s" },
          { title: "M", value: "m" },
          { title: "L", value: "l" },
          { title: "XL", value: "xl" },
          { title: "2XL", value: "2xl" },
        ],
      },
    }),
    defineField({
      name: "time",
      title: "Start Time",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        timeStep: 15,
      },
    }),
    defineField({
      name: "endtime",
      title: "End Time",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        timeStep: 15,
      },
    }),
    defineField(portraitField),
  ],
});
