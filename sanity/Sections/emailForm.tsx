import { defineField, defineType } from "sanity";

export const emailForm = defineType({
  name: "email_form",
  title: "Email Form",
  type: "document",
  fields: [
    defineField({
      name: "form_title",
      title: "Form title",
      type: "string",
    }),
    defineField({
      name: "submit_button_text",
      title: "Submit button text",
      type: "string",
    }),
    defineField({
      name: "triger_button_text",
      title: "Triger button text",
      type: "string",
    }),
  ],
});
