"use client";

import { Dialog } from "@/common/UI/Dialog";
import { JournalPostForm } from "./JournalPostForm";
import { useState } from "react";
import { Button } from "@/common/UI/Button";

export function AddPostComponent() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <Button
        className={"self-end border-pka_blue2"}
        onClick={() => setOpenForm(true)}
      >
        Add Post
      </Button>
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <JournalPostForm />
      </Dialog>
    </>
  );
}
