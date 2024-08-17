import { titleField } from "./fields";
import { portraitField } from "./portraitField";
import { defineType } from "sanity";

export default defineType({
  name: "page.livecontest",
  type: "object",
  title: "Live Contest",

  fields: [
    titleField,
    {
      name: "time",
      title: "Start Time",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        timeStep: 15,
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "endtime",
      title: "End Time",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        timeStep: 15,
        calendarTodayLabel: "Today",
      },
    },
    portraitField,
  ],
});
