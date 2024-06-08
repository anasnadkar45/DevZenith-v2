"use client";

import { Button } from "@/components/ui/button";
import { EditorContent, JSONContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import CodeBlock from "@tiptap/extension-code-block";

// MenuBar component
export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-5">
      <Button
        className={`button ${editor.isActive("heading", { level: 1 }) ? "is-active" : ""}`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        type="button"
      >
        H1
      </Button>
      <Button
        className={`button ${editor.isActive("heading", { level: 2 }) ? "is-active" : ""}`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        type="button"
      >
        H2
      </Button>
      <Button
        className={`button ${editor.isActive("heading", { level: 3 }) ? "is-active" : ""}`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        type="button"
      >
        H3
      </Button>
      <Button
        className={`button ${editor.isActive("bold") ? "is-active" : ""}`}
        onClick={() => editor.chain().focus().toggleBold().run()}
        type="button"
      >
        Bold
      </Button>
      <Button
        className={`button ${editor.isActive("italic") ? "is-active" : ""}`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        type="button"
      >
        Italic
      </Button>
      <Button
        className={`button ${editor.isActive("strike") ? "is-active" : ""}`}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        type="button"
      >
        Strike
      </Button>
      <Button
        className={`button ${editor.isActive("codeBlock") ? "is-active" : ""}`}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        type="button"
      >
        Code Block
      </Button>
    </div>
  );
};

// TipTapEditor component
export function TipTapEditor({ setJson, json }: { setJson: (json: JSONContent) => void, json: JSONContent | null }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlock.configure({
        languageClassPrefix: 'language-', // Optional: Prefix for code block language classes
        exitOnTripleEnter: true, // Optional: Exits code block on triple Enter
        exitOnArrowDown: true, // Optional: Exits code block on Arrow Down if there's no node after
      }),
    ],
    content: json ?? "",
    editorProps: {
      attributes: {
        class: "editor-content focus:outline-none min-h-[150px] prose prose-sm sm:prose-base", // Apply dark theme styles
      },
    },
    onUpdate: ({ editor }) => {
      setJson(editor.getJSON());
    },
  });

  return (
    <div className="editor-container"> {/* Dark themed container */}
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="editor-content" // Apply dark theme styles
      />
    </div>
  );
}