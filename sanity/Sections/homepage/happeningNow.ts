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
              name: "status",
              title: "Card Status",
              type: "string",
              options: {
                list: [
                  { title: "Active", value: "active" },
                  { title: "Inactive", value: "inactive" },
                ],
              },
              validation: (rule) =>
                rule.required().error("Status is required."),
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
              name: "slug",
              title: "Event Slug (Collection Name)",
              type: "slug",
              validation: (rule) => rule.required().error("Slug is required"),
            }),
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
