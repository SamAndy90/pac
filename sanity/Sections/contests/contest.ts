import { defineField } from "sanity";
import { portraitField, titleField } from "../fields";

export const contest = defineField({
  name: "contest",
  type: "object",
  title: "Contest",
  fields: [
    defineField(titleField),
    defineField({
      name: "collection_name",
      title: "Collection name",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
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
      name: "endtime",
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
    defineField(portraitField),
  ],
});
//   preview: {
//     prepare() {
//       return { title: "Contest" };
//     },
//   },

// defineField({
//     name: "status",
//     title: "Contest Status",
//     type: "string",
//     options: {
//       list: [
//         { title: "Active", value: "active" },
//         { title: "Inactive", value: "inactive" },
//       ],
//     },
//   }),
