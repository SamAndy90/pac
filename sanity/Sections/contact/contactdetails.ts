import { portraitField, titleField } from "../fields";
import { defineField } from "sanity";

export const contactdetails = defineField({
  name: "contactdetails",
  type: "object",
  title: "Contact Details Section",
  fields: [
    defineField(portraitField),
    defineField({
      type: "image",
      title: "Text SVG image",
      name: "textsvg",
    }),
    defineField(titleField),
    defineField({
      type: "string",
      title: "Description",
      name: "description",
    }),
    defineField({
      type: "object",
      title: "Details",
      name: "details",
      fields: [
        defineField({
          type: "object",
          title: "Email",
          name: "email",
          fields: [
            defineField({
              type: "string",
              title: "Label",
              name: "label",
            }),
            defineField({
              type: "string",
              title: "URL",
              name: "url",
            }),
          ],
        }),
        defineField({
          type: "object",
          title: "Phone",
          name: "phone",
          fields: [
            defineField({
              type: "string",
              title: "Label",
              name: "label",
            }),
            defineField({
              type: "string",
              title: "Number",
              name: "number",
            }),
          ],
        }),
        defineField({
          type: "array",
          title: "Socials",
          name: "socials",
          of: [
            defineField({
              type: "object",
              name: "social",
              fields: [
                defineField({
                  type: "string",
                  title: "Label",
                  name: "label",
                }),
                defineField({
                  type: "string",
                  title: "URL",
                  name: "url",
                }),
              ],
            }),
          ],
        }),
        defineField({
          type: "object",
          title: "Address",
          name: "address",
          fields: [
            defineField({
              type: "string",
              title: "Label",
              name: "label",
            }),
            defineField({
              type: "string",
              title: "Location",
              name: "location",
            }),
          ],
        }),
      ],
    }),
  ],
});
