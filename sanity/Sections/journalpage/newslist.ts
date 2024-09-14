import { titleField } from "../fields";
import { defineArrayMember, defineField } from "sanity";

export const newslist = defineField({
  name: "newslist",
  type: "object",
  title: "News list",
  fields: [
    defineField({
      type: "array",
      name: "news",
      title: "News",
      of: [
        defineArrayMember({
          type: "object",
          title: "Post",
          fields: [
            defineField({
              type: "string",
              name: "article",
              title: "Article",
              options: {
                list: [
                  { title: "Company", value: "company" },
                  { title: "Team", value: "team" },
                  { title: "Project", value: "project" },
                ],
              },
            }),
            defineField(titleField),
            defineField({
              type: "array",
              name: "paragraphs",
              title: "Paragraphs",
              of: [
                defineArrayMember({
                  type: "string",
                }),
              ],
            }),
            defineField({
              type: "array",
              name: "gallery",
              title: "Gallery",
              of: [
                defineArrayMember({
                  type: "image",
                }),
              ],
            }),
            defineField({
              type: "datetime",
              name: "created",
              title: "Created at:",
              options: {
                dateFormat: "DD MMM,YYYY",
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "News List" };
    },
  },
});
