import { titleField } from "./titleField";
import { buttonField } from "./buttonField";
import { portraitField } from "./portraitField";
import getImageSize from "../lib/getmageSize";
export default {
  name: "page.happeningnow",
  type: "object",
  title: "Happening Now",

  fields: [
    titleField,
    {
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "Title",
              title: "Event Name",
              type: "string",
            },
            {
              name: "whereToShow",
              title: "Where to Show",
              type: "string",
              options: {
                list: [
                  { title: "Home Page", value: "homepage" },
                  { title: "PLP Contest Page", value: "plpcontest" },
                ],
              },
            },
            {
              name: "homepageStyle",
              title: "Choose Homepage Style for Cards",
              type: "string",
              options: {
                list: [
                  { title: "Style 1", value: "style1" },
                  { title: "Style 2", value: "style2" },
                ],
              },
              hidden: ({ parent }: any) => parent.whereToShow !== "homepage",
            },
            {
              name: "status",
              title: "Card Status",
              type: "string",
              options: {
                list: [
                  { title: "Active", value: "active" },
                  { title: "Inactive", value: "inactive" },
                ],
              },
            },
            {
              name: "contestStyle",
              title: "Choose PLP Contest Style for Cards",
              type: "string",
              options: {
                list: [
                  { title: "Contest Style 1", value: "conteststyle1" },
                  { title: "Contest style 2", value: "conteststyle2" },
                ],
              },
              hidden: ({ parent }: any) => parent.whereToShow !== "plpcontest",
            },
            {
              name: "Intro",
              title: "Event Description",
              type: "text",
              Option: {
                rows: 10,
              },
            },

            {
              name: "starttime",
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
              name: "time",
              title: "End TIme",
              type: "datetime",
              options: {
                dateFormat: "YYYY-MM-DD",
                timeFormat: "HH:mm",
                timeStep: 15,
                calendarTodayLabel: "Today",
              },
            },
            {
              name: "Color",
              title: "Timer Color Code",
              type: "simplerColor",
            },
            {
              name: "link",
              title: "Event URL",
              type: "string",
            },

            buttonField,
            {
              ...portraitField,

              description: ({ parent }: { parent: { whereToShow: string } }) =>
                parent.whereToShow === "plpcontest"
                  ? "Image size must be 1400x638 for PLP Contest Page"
                  : "",
            },
          ],
        },
      ],
      validation: (rule: {
        max: (arg0: number) => {
          (): any;
          new (): any;
          error: {
            (arg0: string): { (): any; new (): any; "": any };
            new (): any;
          };
        };
      }) => rule.max(9).error("You can only add up to 3 Events."),
    },
    buttonField,
  ],
};
