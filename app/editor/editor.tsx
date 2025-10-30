"use client";
import {
  useState,
  useEffect,
  DragEventHandler,
  useRef,
  useMemo,
  useTransition,
} from "react";
import {
  createEditorSystem,
  boldExtension,
  italicExtension,
  underlineExtension,
  listExtension,
  imageExtension,
  linkExtension,
  historyExtension,
  htmlExtension,
  markdownExtension,
  tableExtension,
  codeExtension,
  codeFormatExtension,
  blockFormatExtension,
  ImageExtension,
  RichText,
  defaultLexKitTheme,
  BaseCommands,
  ExtractCommands,
  SerializedImageNode,
} from "@lexkit/editor";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Code,
  Table,
  Image,
  Link,
  Undo,
  Redo,
  SquarePen,
} from "lucide-react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  LexicalEditor,
  SerializedEditor,
  SerializedLexicalNode,
} from "lexical";
import { useMutation } from "@/lib/use-mutation";
import { useRouter } from "next/navigation";

// 1. Define your extensions (as const for type safety)
const extensions = [
  boldExtension,
  italicExtension,
  underlineExtension,
  listExtension,
  imageExtension,
  linkExtension.configure({ pasteListener: { insert: true, replace: true } }),
  tableExtension,
  codeExtension,
  codeFormatExtension,
  blockFormatExtension,
  htmlExtension,
  markdownExtension,
  historyExtension,
] as const;

type EditorCommands = BaseCommands & ExtractCommands<typeof extensions>;

// 2. Create typed editor system
const { Provider, useEditor } = createEditorSystem<typeof extensions>();

// Advanced Toolbar Component
function AdvancedToolbar() {
  const { commands, activeStates } = useEditor();

  // Get current block type for dropdown sync
  const [currentBlockType, setCurrentBlockType] = useState("p");

  // Update current block type when selection changes
  useEffect(() => {
    const updateBlockType = async () => {
      const blockType = commands.getCurrentBlockType();
      setCurrentBlockType(blockType);
    };
    updateBlockType();
  }, [commands, activeStates]); // Re-run when activeStates change

  return (
    <div className="w-full flex gap-4 justify-between">
      {/* Text Formatting */}
      <ButtonGroup>
        <Button
          variant={activeStates.bold ? "solid" : "ghost"}
          size="sm"
          onPress={() => commands.toggleBold()}
          title="Bold (Ctrl+B)"
        >
          <Bold size={16} />
        </Button>

        <Button
          variant={activeStates.italic ? "solid" : "ghost"}
          size="sm"
          onPress={() => commands.toggleItalic()}
          title="Italic (Ctrl+I)"
        >
          <Italic size={16} />
        </Button>

        <Button
          variant={activeStates.underline ? "solid" : "ghost"}
          size="sm"
          onPress={() => commands.toggleUnderline()}
          title="Underline (Ctrl+U)"
        >
          <Underline size={16} />
        </Button>
      </ButtonGroup>

      {/* TODO: select */}
      {/* Paragraph Types */}
      {/* <Select */}
      {/*   selectedKeys={new Set(currentBlockType)} */}
      {/*   label="Format" */}
      {/*   className="w-[12ch]" */}
      {/*   size="sm" */}
      {/*   onChange={(e) => { */}
      {/*     const value = e.target.value; */}
      {/*     if (value === "h1") commands.toggleHeading("h1"); */}
      {/*     else if (value === "h2") commands.toggleHeading("h2"); */}
      {/*     else if (value === "h3") commands.toggleHeading("h3"); */}
      {/*     else if (value === "quote") commands.toggleQuote(); */}
      {/*     else if (value === "p") commands.toggleParagraph(); */}
      {/*   }} */}
      {/* > */}
      {/*   <SelectItem key="p">Paragraph</SelectItem> */}
      {/*   <SelectItem key="h1">Heading 1</SelectItem> */}
      {/*   <SelectItem key="h2">Heading 2</SelectItem> */}
      {/*   <SelectItem key="h3">Heading 3</SelectItem> */}
      {/*   <SelectItem key="quote">Quote</SelectItem> */}
      {/* </Select> */}

      {/* Lists */}
      {/* <ButtonGroup> */}
      {/*   <Button */}
      {/*     variant={activeStates.unorderedList ? "solid" : "ghost"} */}
      {/*     size="sm" */}
      {/*     onPress={() => commands.toggleUnorderedList()} */}
      {/*     title="Bullet List" */}
      {/*   > */}
      {/*     <List size={16} /> */}
      {/*   </Button> */}
      {/**/}
      {/*   <Button */}
      {/*     variant={activeStates.orderedList ? "solid" : "ghost"} */}
      {/*     size="sm" */}
      {/*     onPress={() => commands.toggleOrderedList()} */}
      {/*     title="Numbered List" */}
      {/*   > */}
      {/*     <ListOrdered size={16} /> */}
      {/*   </Button> */}
      {/* </ButtonGroup> */}
      {/**/}
      {/* Code */}
      {/* <ButtonGroup> */}
      {/*   <Button */}
      {/*     variant={activeStates.isInCodeBlock ? "solid" : "ghost"} */}
      {/*     size="sm" */}
      {/*     onPress={() => commands.toggleCodeBlock()} */}
      {/*     title="Code Block" */}
      {/*   > */}
      {/*     <Code size={16} /> */}
      {/*   </Button> */}
      {/* </ButtonGroup> */}
      {/**/}
      {/* Tables */}
      {/**/}
      {/* <ButtonGroup> */}
      {/*   <Button */}
      {/*     variant="ghost" */}
      {/*     size="sm" */}
      {/*     onPress={() => */}
      {/*       commands.insertTable({ rows: 4, columns: 4, includeHeaders: true }) */}
      {/*     } */}
      {/*     title="Insert 4x4 Table with Headers" */}
      {/*   > */}
      {/*     <Table size={16} /> */}
      {/*   </Button> */}
      {/* </ButtonGroup> */}
      {/**/}
      {/* Media */}
      {/* <ButtonGroup> */}
      {/*   <Button */}
      {/*     variant="ghost" */}
      {/*     size="sm" */}
      {/*     onPress={() => { */}
      {/*       const src = prompt("Enter image URL:"); */}
      {/*       if (src) { */}
      {/*         const alt = prompt("Enter alt text:") || "Image"; */}
      {/*         commands.insertImage({ src, alt }); */}
      {/*       } */}
      {/*     }} */}
      {/*     title="Insert Image" */}
      {/*   > */}
      {/*     <Image size={16} /> */}
      {/*   </Button> */}
      {/**/}
      {/*   <Button */}
      {/*     variant="ghost" */}
      {/*     size="sm" */}
      {/*     onPress={() => { */}
      {/*       const url = prompt("Enter link URL:"); */}
      {/*       const text = prompt("Enter link text:"); */}
      {/*       if (url && text) { */}
      {/*         commands.insertLink(url, text); */}
      {/*       } */}
      {/*     }} */}
      {/*     title="Insert Link" */}
      {/*   > */}
      {/*     <Link size={16} /> */}
      {/*   </Button> */}
      {/* </ButtonGroup> */}
      {/**/}
      {/* History */}
      <ButtonGroup>
        <Button
          variant="ghost"
          size="sm"
          onPress={() => commands.undo()}
          disabled={!activeStates.canUndo}
          title="Undo (Ctrl+Z)"
        >
          <Undo size={16} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onPress={() => commands.redo()}
          disabled={!activeStates.canRedo}
          title="Redo (Ctrl+Y)"
        >
          <Redo size={16} />
        </Button>
      </ButtonGroup>
      <PostButton />
    </div>
  );
}

function useImageHandlers(
  commands: EditorCommands,
  editor: LexicalEditor | null,
) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlers = useMemo(
    () => ({
      insertImageFromUrl: (
        url: string,
        alt = "",
        caption?: string,
        className?: string,
      ) => {
        commands.insertImage({ src: url, alt, caption, className });
      },

      insertImageFromFile: async (file: File, alt = "", caption?: string) => {
        if (imageExtension.config.uploadHandler) {
          try {
            const src = await imageExtension.config.uploadHandler(file);
            commands.insertImage({
              src,
              alt: alt || file.name,
              caption,
              file,
              alignment: "center",
            });
          } catch (error) {
            console.error("Failed to upload image:", error);
            // Fallback to object URL
            const src = URL.createObjectURL(file);
            commands.insertImage({ src, alt: alt || file.name, caption, file });
          }
        } else {
          const src = URL.createObjectURL(file);
          commands.insertImage({ src, alt: alt || file.name, caption, file });
        }
      },

      setImageAlignment: (alignment: "left" | "center" | "right" | "none") => {
        commands.setImageAlignment(alignment);
      },

      setImageCaption: (caption: string) => {
        commands.setImageCaption(caption);
      },
    }),
    [commands],
  );

  return { handlers, fileInputRef };
}

function getImages(editor: SerializedEditor) {
  const images = editor.editorState.root.children
    .filter(
      (
        child: SerializedLexicalNode | SerializedImageNode,
      ): child is SerializedImageNode =>
        child.type === "image" && "src" in child,
    )
    .map((img) => img.src);
  return images;
}

function AdvancedEditor() {
  const { commands, editor } = useEditor();
  const { handlers: imageHandlers } = useImageHandlers(commands, editor);
  const handleDrop: DragEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    const files = (event.target as any).files || event.dataTransfer.files;

    const reader = new FileReader();
    reader.onload = function () {
      if (typeof reader.result === "string") {
        imageHandlers.insertImageFromUrl(
          reader.result,
          "",
          "",
          "overflow-hidden w-full max-w-[400px] max-h-36 hover:max-h-[9999px] transition-all duration-500",
        );
      }
      return "";
    };

    reader.readAsDataURL(files[0]);
  };

  return (
    <Card
      className="focus-within:ring-2 focus-within:ring-blue-500 min-w-[500px]"
      draggable="true"
      onDrop={handleDrop}
    >
      <CardHeader>
        <AdvancedToolbar />
      </CardHeader>
      <CardBody>
        <RichText
          placeholder="Start writing with advanced features like images, links, HTML export, and Markdown support..."
          classNames={{
            contentEditable: "outline-none min-h-8",
            placeholder: "advanced-editor-placeholder",
          }}
        />
      </CardBody>
      <CardFooter className="flex justify-end"></CardFooter>
    </Card>
  );
}

export function PostButton() {
  const { commands, editor } = useEditor();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const addPost = useMutation<{ images: string[]; md: string }>({
    mutationFn: async ({ images, md }) => {
      // TODO: env var
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL!}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: md, images }),
      });
    },
  });

  async function handlePost() {
    const md = commands.exportToMarkdown();

    const json = editor?.toJSON();
    if (!json) return;
    const images = getImages(json);
    startTransition(async () => {
      // await addPost.mutateAsync({ images, md });

      await fetch(`${process.env.NEXT_PUBLIC_APP_URL!}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: md, images }),
      });

      router.refresh();
    });
  }

  return (
    <Button
      color="primary"
      size="sm"
      variant="shadow"
      startContent={!isPending ? <SquarePen size={16} /> : null}
      onPress={handlePost}
      isLoading={isPending}
    >
      Post
    </Button>
  );
}

export function Editor() {
  return (
    <Provider extensions={extensions} config={{ theme: defaultLexKitTheme }}>
      <div className="space-y-6">
        <AdvancedEditor />
        <div className="flex gap-3"></div>
      </div>
    </Provider>
  );
}
