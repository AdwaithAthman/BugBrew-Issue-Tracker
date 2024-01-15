"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const page = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea placeholder="Desciption" />
      <Button>Submit new Issue</Button>
    </div>
  );
};

export default page;
