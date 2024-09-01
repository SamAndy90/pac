import { titleField, portraitField } from "../fields";
import { defineField, defineType } from "sanity";

export const liveContest = defineType({
  name: "page.livecontest",
  type: "document",
  title: "Live Contest",
  fields: [
    defineField(titleField),
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
