"use client";

import { Dialog } from "@/common/UI/Dialog";
import { JournalPostForm } from "./JournalPostForm";
import { useEffect, useState } from "react";
import { Button } from "@/common/UI/Button";
import { type CMSFormData, getFormData } from "@/lib/actions";

export function AddPostComponent() {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState<CMSFormData>();

  useEffect(() => {
    async function runner() {
      const data = await getFormData();
      setFormData(data[0]);
    }
    runner();
  }, []);

  if (!formData) return;

  return (
    <>
      <Button
        className={"self-center border-pka_blue2"}
        onClick={() => setOpenForm(true)}
      >
        {formData.triger_button_text}
      </Button>
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <JournalPostForm data={formData} onClose={() => setOpenForm(false)} />
      </Dialog>
    </>
  );
}
