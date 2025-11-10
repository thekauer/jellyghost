"use client";
import { Card, CardBody, CardFooter, CardHeader, Button } from "@heroui/react";
import { ImageEditor, useImageEditor } from "./image-editor";
import { TextEditor } from "./text-editor";
import { useState } from "react";

import { Plus } from "lucide-react";

const STEP_OPEN = 0;
const STEP_IMAGE = STEP_OPEN + 1;
const STEP_TEXT = STEP_IMAGE + 1;

export function Editor() {
  const [step, setStep] = useState(STEP_OPEN);
  const { onDrop, onDragOver, src } = useImageEditor();

  const handleCreateClick = () => {
    setStep(STEP_IMAGE);
  };

  if (step === STEP_OPEN) {
    return (
      <Button
        color="primary"
        size="sm"
        variant="shadow"
        startContent={<Plus />}
        className="m-4"
        onPress={handleCreateClick}
      >
        Create a new Post
      </Button>
    );
  }

  return (
    <Card
      className="flex focus-within:ring-2 focus-within:ring-blue-500 max-w-[500px] m-4 transition-[width] duration-500 ease-in-out w-fit"
      onDragOver={onDragOver}
      onDrop={step === STEP_IMAGE ? onDrop : undefined}
    >
      <CardHeader className="flex justify-between">
        <Button
          color="primary"
          size="sm"
          variant={step === STEP_IMAGE ? "light" : "flat"}
          radius="sm"
          disabled={step === STEP_IMAGE}
          onPress={() => setStep(STEP_IMAGE)}
          style={{ visibility: step === STEP_IMAGE ? "hidden" : "visible" }}
        >
          Previous
        </Button>
        <Button
          color="primary"
          size="sm"
          radius="sm"
          variant={!src ? "light" : "flat"}
          disabled={!src}
          onPress={() => setStep(STEP_TEXT)}
        >
          Next
        </Button>
      </CardHeader>
      <CardBody>
        <h1>test</h1>
        <br />
        <ImageEditor src={src} />
        {step === STEP_TEXT && <TextEditor />}
      </CardBody>
      <CardFooter className="flex justify-end"></CardFooter>
    </Card>
  );
}
