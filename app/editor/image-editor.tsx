"use client";

import { ImageUp } from "lucide-react";
import { Image } from "@heroui/react";
import { useState } from "react";

interface ImageEditorProps {
  onDrop?: React.DragEventHandler<HTMLDivElement> | undefined;
  src: string | null;
}

export function ImageEditor({ onDrop, src }: ImageEditorProps) {
  return (
    <div
      className="flex items-center justify-center w-[300px] h-[300px] self-center relative"
      onDrop={onDrop}
    >
      {src ? (
        <Image src={src} alt="uploaded image" className="object-contain" />
      ) : (
        <ImageUp className="relative" />
      )}
    </div>
  );
}

export function useImageEditor() {
  const [src, setSrc] = useState<string | null>(null);

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault(); // This is crucial!
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files; // Use dataTransfer, not target

    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = function () {
        if (typeof reader.result === "string") {
          setSrc(reader.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return { onDrop: handleDrop, onDragOver: handleDragOver, src };
}
