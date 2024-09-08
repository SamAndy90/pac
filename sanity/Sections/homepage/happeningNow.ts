import { defineArrayMember, defineField } from "sanity";
import { buttons, portraitField, titleField } from "../fields";

export const happeningNow = defineField({
  name: "page.happeningnow",
  type: "object",
  title: "Happening Now",
  fields: [
    defineField(titleField),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "subtitle",
              title: "Event Subtitle",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Event Name",
              type: "string",
            }),
            defineField({
              name: "whereToShow",
              title: "Where to Show",
              type: "string",
              options: {
                list: [
                  { title: "Home Page", value: "homepage" },
                  { title: "PLP Contest Page", value: "plpcontest" },
                ],
              },
            }),
            defineField({
              name: "status",
              title: "Card Status",
              type: "string",
              options: {
                list: [
                  { title: "Active", value: "active" },
                  { title: "Inactive", value: "inactive" },
                ],
              },
            }),
            defineField({
              name: "homepageStyle",
              title: "Choose Homepage Style for Cards",
              type: "string",
              options: {
                list: [
                  { title: "Style 1", value: "style1" },
                  { title: "Style 2", value: "style2" },
                  { title: "Style 3", value: "style3" },
                ],
              },
              hidden: ({ parent }) => parent.whereToShow !== "homepage",
            }),
            defineField({
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
            }),
            defineField({
              name: "description",
              title: "Event Description",
              type: "text",
            }),

            defineField({
              name: "starttime",
              title: "Start Time",
              type: "datetime",
              options: {
                dateFormat: "YYYY-MM-DD",
                timeFormat: "HH:mm",
                timeStep: 15,
              },
            }),
            defineField({
              name: "time",
              title: "End Time",
              type: "datetime",
              options: {
                dateFormat: "YYYY-MM-DD",
                timeFormat: "HH:mm",
                timeStep: 15,
              },
            }),
            defineField({
              name: "timerstyle",
              type: "object",
              title: "Timer Style",
              fields: [
                {
                  name: "bgcolor",
                  title: "Timer BG Color Code",
                  type: "simplerColor",
                },
                {
                  name: "numcolor",
                  title: "Timer Numbers Color Code",
                  type: "simplerColor",
                },
              ],
            }),
            defineField({
              name: "link",
              title: "Event URL",
              type: "string",
            }),
            defineField(buttons),
            defineField(portraitField),
          ],
        }),
      ],
    }),
    defineField(buttons),
  ],
  preview: {
    prepare() {
      return { title: "Happening Now" };
    },
  },
});
