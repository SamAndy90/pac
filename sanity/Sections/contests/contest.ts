import { defineField } from "sanity";
import { titleField } from "../fields";

export const contest = defineField({
  name: "contest",
  type: "object",
  title: "Contest",
  fields: [
    // Collection name
    defineField({
      name: "collection_name",
      title: "Collection name",
      type: "string",
      validation: (rule) =>
        rule.required().error("Collection name is required"),
    }),
    // Status
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
      validation: (rule) => rule.required().error("Status is required."),
    }),
    // Text
    defineField({
      name: "subtitle",
      title: "Subtitle",
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
    defineField(titleField),
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
      name: "description",
      title: "Description",
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
    // CTA
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
    // Bakcground
    defineField({
      title: "Choose background",
      name: "bg",
      type: "string",
      options: {
        list: ["image", "file", "url"],
      },
    }),
    defineField({
      name: "picture",
      title: "Picture",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => {
        return parent.bg !== "image";
      },
    }),
    defineField({
      title: "Video Link",
      name: "videoLink",
      type: "url",
      hidden: ({ parent }) => {
        return parent.bg !== "url";
      },
    }),
    defineField({
      title: "Video File",
      name: "videoFile",
      type: "file",
      hidden: ({ parent }) => {
        return parent.bg !== "file";
      },
    }),
    // Timer
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
  ],
});
