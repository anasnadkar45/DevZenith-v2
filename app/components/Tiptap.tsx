"use client";

import { Button } from "@/components/ui/button";
import { EditorContent, JSONContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import {common, createLowlight} from 'lowlight'

const lowlight = createLowlight(common)
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';

// // Import specific languages for highlighting if needed
// import javascript from 'highlight.js/lib/languages/javascript';
// import css from 'highlight.js/lib/languages/css';
// // Add other languages as needed

// // Register the languages with lowlight
// lowlight.registerLanguage('javascript', javascript);
// lowlight.registerLanguage('css', css);

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-5">
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={editor.isActive("heading", { level: 1 }) ? "default" : "secondary"}
        type="button"
      >
        H1
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={editor.isActive("heading", { level: 2 }) ? "default" : "secondary"}
        type="button"
      >
        H2
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        variant={editor.isActive("heading", { level: 3 }) ? "default" : "secondary"}
        type="button"
      >
        H3
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "default" : "secondary"}
        type="button"
      >
        Bold
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "default" : "secondary"}
        type="button"
      >
        Italic
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        variant={editor.isActive("strike") ? "default" : "secondary"}
        type="button"
      >
        Strike
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        variant={editor.isActive("codeBlock") ? "default" : "secondary"}
        type="button"
      >
        Code Block
      </Button>
    </div>
  );
};

export function TipTapEditor({ setJson, json }: { setJson: any, json: JSONContent | null }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight, // Use the lowlight instance
        defaultLanguage: 'plaintext', // Set default language if desired
      }),
    ],
    content: json ?? "",
    editorProps: {
      attributes: {
        class: "text-white focus:outline-none min-h-[150px] prose prose-sm sm:prose-base",
      },
    },

    onUpdate: ({ editor }) => {
      setJson(editor.getJSON());
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="rounded-lg text-white border p-2 min-h-[150px] mt-2"
      />
    </div>
  );
}
