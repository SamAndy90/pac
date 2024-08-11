import { defineField } from "sanity";

export const portraitField = defineField({
  name: "portrait",
  title: "Image",
  type: "image",
  options: {
    hotspot: true,
  },
  validation: (Rule) => Rule.required().error("An image is required."),
});
