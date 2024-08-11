import { titleField } from "./titleField";
import { portraitField } from "./portraitField";
export default {
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
};
