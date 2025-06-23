"use client";
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Extension } from '@tiptap/core';
import '../../app/globals.css'



const CustomKeymap = Extension.create({
  addKeyboardShortcuts() {
    return {
      'Space': ({ editor }) => {
       this.editor.commands.insertText('\u00A0');
        return true;
      },
      'Enter': ({ editor }) => {
        if (editor.isActive('codeBlock')) return false;
        editor.commands.setHardBreak();
        return true;
      },
    };
  },
});

const TiptapEditor = ({ content = '', onChange = () => { } }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const menuRef = useRef(null);
  const linkButtonRef = useRef(null);





  const editor = useEditor({
    extensions: [
      CustomKeymap,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc list-outside pl-4",
          }, 
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal list-outside pl-4",
          },
        },
        // Enable other default features
        blockquote: true,
        codeBlock: true,
        horizontalRule: true,
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Write something...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'tableCell'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        validate: href => /^https?:\/\//.test(href),
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      // Table extensions
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'tiptap-table',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      if (typeof onChange === 'function') {
        const html = editor.getHTML().replace(/\u00A0/g, '&nbsp;');
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[200px] p-4 table-wrapper',
         style: 'white-space: pre-wrap;',
      },
    },
  });


  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuVisible &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        linkButtonRef.current &&
        !linkButtonRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuVisible]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    setLinkUrl(previousUrl || '');
    setMenuVisible(true);

    if (editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'text',
          text: 'link text',
          marks: [
            {
              type: 'link',
              attrs: { href: '' },
            },
          ],
        })
        .run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    if (!editor) return;

    if (!linkUrl.trim()) {
      removeLink();
      return;
    }

    let formattedUrl = linkUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: formattedUrl })
      .run();

    setMenuVisible(false);
  }, [editor, linkUrl]);

  const removeLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
    setMenuVisible(false);
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);
  const insertTable = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }, [editor]);

  const addRowBefore = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().addRowBefore().run();
  }, [editor]);

  const addRowAfter = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().addRowAfter().run();
  }, [editor]);

  const addColumnBefore = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().addColumnBefore().run();
  }, [editor]);

  const addColumnAfter = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().addColumnAfter().run();
  }, [editor]);

  const deleteRow = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().deleteRow().run();
  }, [editor]);

  const deleteColumn = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().deleteColumn().run();
  }, [editor]);

  const deleteTable = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().deleteTable().run();
  }, [editor]);

  if (!editor) {
    return <div className="border border-gray-300 rounded-md p-4 min-h-[200px]">Loading editor...</div>;
  }

  return (
    <div className="space-y-2 relative">
      <div className="flex flex-wrap gap-1 p-1 bg-gray-50 rounded-t-md border border-b-0 border-gray-300">
        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Bold"
        >
          <span className="font-bold">B</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Italic"
        >
          <span className="italic">I</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Underline"
        >
          <span className="underline">U</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Strikethrough"
        >
          <span className="line-through">S</span>
        </button>

        {/* Headings */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 text-blue-600' : ''}`}
        >
          H1
        </button>


        {/* H2 Button */}
<button
  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
  className={`p-2 rounded hover:bg-gray-200 ${
    editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-blue-600' : ''
  }`}
>
  H2
</button>

{/* H3 Button */}
<button
  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
  className={`p-2 rounded hover:bg-gray-200 ${
    editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 text-blue-600' : ''
  }`}
>
  H3
</button>

{/* H4 Button */}
<button
  onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
  className={`p-2 rounded hover:bg-gray-200 ${
    editor.isActive('heading', { level: 4 }) ? 'bg-gray-200 text-blue-600' : ''
  }`}
>
  H4
</button>

{/* H5 Button */}
<button
  onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
  className={`p-2 rounded hover:bg-gray-200 ${
    editor.isActive('heading', { level: 5 }) ? 'bg-gray-200 text-blue-600' : ''
  }`}
>
  H5
</button>

{/* H6 Button */}
<button
  onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
  className={`p-2 rounded hover:bg-gray-200 ${
    editor.isActive('heading', { level: 6 }) ? 'bg-gray-200 text-blue-600' : ''
  }`}
>
  H6
</button>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Bullet List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Numbered List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M10 6h11M10 12h11M10 18h11M4 6h1v4H4V6zM4 16h2v2H4z" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Align Left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M3 6h18M3 12h15M3 18h18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Align Center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M3 6h18M6 12h12M3 18h18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Align Right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M3 6h18M6 12h15M3 18h18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Block Elements */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Blockquote"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M7 11h4m6 0h4M7 15h4m6 0h4M8 3v4m8-4v4" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded hover:bg-gray-200"
          title="Horizontal Rule"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M3 12h18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Links & Images */}
        <button
          ref={linkButtonRef}
          onClick={setLink}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-200"
          title="Image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M4 16l4.59-4.59a2 2 0 0 1 2.82 0L16 16m-2-2l1.59-1.59a2 2 0 0 1 2.82 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Undo/Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`p-2 rounded hover:bg-gray-200 ${!editor.can().undo() ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Undo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M3 10h10a7 7 0 0 1 7 7v1M3 10l4-4M3 10l4 4" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`p-2 rounded hover:bg-gray-200 ${!editor.can().redo() ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Redo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M21 10H11a7 7 0 0 0-7 7v1m17-8l-4-4m4 4l-4 4" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={insertTable}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('table') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Insert Table"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M3 5h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 4h18M3 12h18M3 16h18M10 4v16" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={addRowBefore}
          disabled={!editor?.can().addRowBefore()}
          className={`p-2 rounded hover:bg-gray-200 ${!editor?.can().addRowBefore() ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Add Row Before"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M12 4v16M8 9l4-4 4 4M8 15l4 4 4-4M3 5h18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={addRowAfter}
          disabled={!editor?.can().addRowAfter()}
          className={`p-2 rounded hover:bg-gray-200 ${!editor?.can().addRowAfter() ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Add Row After"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M12 4v16M16 9l-4-4-4 4M16 15l-4 4-4-4M3 5h18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={deleteRow}
          disabled={!editor?.can().deleteRow()}
          className={`p-2 rounded hover:bg-gray-200 ${!editor?.can().deleteRow() ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Delete Row"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M5 12h14M12 5v14" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={addColumnBefore}
          disabled={!editor?.can().addColumnBefore()}
          className={`p-2 rounded hover:bg-gray-200 ${!editor?.can().addColumnBefore() ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Add Column Before"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M12 4v16M5 12h14M9 8l3-4 3 4M9 16l3 4 3-4" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={addColumnAfter}
          disabled={!editor?.can().addColumnAfter()}
          className={`p-2 rounded hover:bg-gray-200 ${!editor?.can().addColumnAfter() ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Add Column After"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M12 4v16M5 12h14M15 8l-3-4-3 4M15 16l-3 4-3-4" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={deleteColumn}
          disabled={!editor?.can().deleteColumn()}
          className={`p-2 rounded hover:bg-gray-200 ${!editor?.can().deleteColumn() ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Delete Column"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14M8 9l4-4 4 4M8 15l4 4 4-4" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={deleteTable}
          disabled={!editor?.can().deleteTable()}
          className={`p-2 rounded hover:bg-gray-200 ${!editor?.can().deleteTable() ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Delete Table"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M3 5h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm3 4h12M6 12h12M6 16h12M10 2l2 2-2 2" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

      </div>

      {/* Link Menu */}
      {menuVisible && (
        <div
          ref={menuRef}
          className="absolute z-50 mt-1 flex items-center gap-2 p-2 bg-white shadow-lg border border-gray-300 rounded-md"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setMenuVisible(false);
            }
          }}
        >
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && addLink()}
            autoFocus
          />
          <button
            onClick={addLink}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Apply
          </button>
          {editor.isActive('link') && (
            <button
              onClick={removeLink}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          )}
          <button
            onClick={() => setMenuVisible(false)}
            className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Bubble Menu */}
      {editor && editor.isAttached && (
        <BubbleMenu
          editor={editor}
          shouldShow={({ editor }) => editor.isFocused && !menuVisible}
        >
          <div className="flex gap-1 p-1 bg-white shadow-lg rounded-md border border-gray-300">
            {!editor.isActive('table') ? (
              <>
                <button

                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-1 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100 text-blue-600' : ''}`}
                >
                  Bold
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-1 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100 text-blue-600' : ''}`}
                >
                  Italic
                </button>
                <button
                  onClick={setLink}
                  className={`p-1 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-100 text-blue-600' : ''}`}
                >
                  Link
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={addRowBefore}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                  title="Add Row Before"
                >
                  + Row
                </button>
                <button
                  onClick={addColumnBefore}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                  title="Add Column Before"
                >
                  + Column
                </button>
                <button
                  onClick={deleteRow}
                  className="px-3 py-1.5 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-md"
                  title="Delete Row"
                >
                  - Row
                </button>
                <button
                  onClick={deleteColumn}
                  className="px-3 py-1.5 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-md"
                  title="Delete Column"
                >
                  - Column
                </button>
              </>
            )}
          </div>
        </BubbleMenu>
      )}


      <div className="border border-gray-300 rounded-b-md">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
