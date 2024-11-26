"use server";

import { SanityDocument } from "next-sanity";
import { getData } from "./data-fetchers/sanity";

export type FormData = {
  form_title: string;
  submit_button_text: string;
  triger_button_text: string;
};

export type CMSFormData = SanityDocument & FormData;

export async function getFormData() {
  return await getData<FormData>(`*[_type == "email_form"]`);
}
