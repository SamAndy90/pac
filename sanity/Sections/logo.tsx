import { defineType } from "sanity";

export const logo = defineType({
  name: "logo",
  title: "Website Logo",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Title of the logo",
    },
    {
      name: "image",
      title: "Logo Image",
      type: "image",
      options: {
        hotspot: true, // Enables the hotspot functionality
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Important for SEO and accessibility.",
        },
      ],
    },
    {
      name: "link",
      title: "Link",
      type: "string",
      description: "URL the logo should link to.",
    },
  ],
});
