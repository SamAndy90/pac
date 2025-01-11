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
              name: "subtitlePosition",
              title: "Subtitle Position",
              type: "string",
              options: {
                list: ["left", "center", "right"],
              },
              initialValue: "center",
            }),
            defineField({
              name: "title",
              title: "Event Name",
              type: "string",
            }),
            defineField({
              name: "titlePosition",
              title: "Title Position",
              type: "string",
              options: {
                list: ["left", "center", "right"],
              },
              initialValue: "center",
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
              name: "description",
              title: "Event Description",
              type: "text",
            }),
            defineField({
              name: "descriptionPosition",
              title: "Description Position",
              type: "string",
              options: {
                list: ["left", "center", "right"],
              },
              initialValue: "center",
            }),
            defineField({
              name: "cta",
              title: "CTA",
              type: "object",
              fields: [
                defineField({
                  name: "ctaLabel",
                  title: "Label",
                  type: "string",
                }),
                defineField({
                  name: "ctaLink",
                  title: "Link",
                  type: "string",
                }),
              ],
            }),
            defineField({
              name: "ctaPosition",
              title: "CTA Position",
              type: "string",
              options: {
                list: ["left", "center", "right", "full"],
              },
              initialValue: "center",
            }),
            defineField({
              name: "ctaComponent",
              title: "CTA Component",
              type: "string",
              options: {
                list: ["button", "text"],
              },
              initialValue: "text",
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
