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
import { Plugin } from 'prosemirror-state';
import { Extension } from '@tiptap/core';
import '../../app/globals.css'

// Custom extension to preserve spaces in non-code contexts
const SpacePreserver = Extension.create({
  name: 'spacePreserver',
  addKeyboardShortcuts() {
    return {
      'Space': ({ editor }) => {
        if (editor.isActive('code') || editor.isActive('codeBlock')) {
          return false;
        }
        // Insert non-breaking space to preserve spacing
        editor.commands.insertText('\u00A0');
        return true;
      },
    };
  },
});

// Custom extension for consistent line breaks
const HardBreakExtension = Extension.create({
  name: 'hardBreakExtension',
  addKeyboardShortcuts() {
    return {
      'Enter': ({ editor }) => {
        if (editor.isActive('code') || editor.isActive('codeBlock')) {
          return false;
        }
        // Insert line break within paragraph (like Shift+Enter normally does)
        editor.commands.setHardBreak();
        return true;
      },
      'Shift-Enter': ({ editor }) => {
        // Shift+Enter for paragraph break
        editor.commands.createParagraphNear();
        return true;
      },
    };
  },
});

// Enhanced paste normalizer extension
const PasteNormalizer = Extension.create({
  name: 'pasteNormalizer',
  
  addPasteRules() {
    return [];
  },
  
  addProseMirrorPlugins() {
  return [
    // Use the imported Plugin instead of this.editor.ProseMirror.Plugin
    new Plugin({
      props: {
        // Custom paste handler for better formatting control
        handlePaste: (view, event, slice) => {
          return false; // Let the default handlePaste in editorProps handle this
        },
        
        // Transform pasted HTML to normalize formatting
        transformPastedHTML: (html) => {
          return this.editor.normalizeHTML ? this.editor.normalizeHTML(html) : html;
        },
      },
    }),
  ];
},
});

const TiptapEditor = ({ content = '', onChange = () => { } }) => {
  const [linkMenuVisible, setLinkMenuVisible] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [pFontSize, setPFontSize] = useState(16);
const [h1FontSize, setH1FontSize] = useState(32);
  const linkMenuRef = useRef(null);
  const linkButtonRef = useRef(null);
  const linkInputRef = useRef(null);
  const fileInputRef = useRef(null);

  // HTML normalization function for consistent paste behavior
  const normalizeHTML = useCallback((html) => {
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Remove all style attributes and class attributes from pasted content
    const allElements = tempDiv.querySelectorAll('*');
    allElements.forEach(el => {
      el.removeAttribute('style');
      el.removeAttribute('class');
      el.removeAttribute('data-*');
    });
    
    // Remove font tags and replace with spans
    const fontTags = tempDiv.querySelectorAll('font');
    fontTags.forEach(font => {
      const span = document.createElement('span');
      span.innerHTML = font.innerHTML;
      font.parentNode.replaceChild(span, font);
    });
    
    // Remove empty spans and normalize text content
    const spans = tempDiv.querySelectorAll('span');
    spans.forEach(span => {
      if (!span.innerHTML.trim()) {
        span.remove();
      } else if (!span.hasAttributes()) {
        // Replace span with its content
        const parent = span.parentNode;
        while (span.firstChild) {
          parent.insertBefore(span.firstChild, span);
        }
        parent.removeChild(span);
      }
    });
    
    // Normalize paragraphs with consistent styling
    const paragraphs = tempDiv.querySelectorAll('p');
    paragraphs.forEach(p => {
      p.className = 'text-base leading-relaxed font-sans mb-4';
      // Convert empty paragraphs to proper line breaks
      if (!p.textContent.trim()) {
        p.innerHTML = '<br>';
      }
    });
    
    // Normalize headings
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(h => {
      h.className = 'font-bold text-base leading-relaxed font-sans mb-4';
    });
    
    // Normalize lists
    const uls = tempDiv.querySelectorAll('ul');
    uls.forEach(ul => {
      ul.className = 'list-disc list-outside pl-4 mb-4';
    });
    
    const ols = tempDiv.querySelectorAll('ol');
    ols.forEach(ol => {
      ol.className = 'list-decimal list-outside pl-4 mb-4';
    });
    
    // Normalize list items
    const listItems = tempDiv.querySelectorAll('li');
    listItems.forEach(li => {
      li.className = 'text-base leading-relaxed font-sans mb-1';
    });
    
    // Normalize blockquotes
    const blockquotes = tempDiv.querySelectorAll('blockquote');
    blockquotes.forEach(bq => {
      bq.className = 'border-l-4 border-gray-300 pl-4 italic mb-4';
    });
    
    // Handle line breaks - convert multiple br tags to paragraphs
    let normalizedHTML = tempDiv.innerHTML;
    
    // Replace multiple consecutive <br> tags with paragraph breaks
    normalizedHTML = normalizedHTML.replace(/(<br\s*\/?>){2,}/gi, '</p><p class="text-base leading-relaxed font-sans mb-4">');
    
    // Wrap orphaned text content in paragraphs
    const textNodes = normalizedHTML.split(/(<[^>]*>)/);
    const wrappedContent = textNodes.map(node => {
      // If it's plain text and not empty, wrap in paragraph
      if (!node.startsWith('<') && node.trim()) {
        return `<p class="text-base leading-relaxed font-sans mb-4">${node.trim()}</p>`;
      }
      return node;
    }).join('');
    
    // Clean up extra whitespace and ensure consistent formatting
    return wrappedContent
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/>\s+</g, '><') // Remove whitespace between tags
      .trim();
  }, []);

  const editor = useEditor({
    extensions: [
      SpacePreserver,
      HardBreakExtension,
      PasteNormalizer,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc list-outside pl-4 mb-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal list-outside pl-4 mb-4",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-gray-300 pl-4 italic mb-4",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "text-base leading-relaxed font-sans mb-4",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "text-base leading-relaxed font-sans mb-1",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class: "bg-gray-100 p-4 rounded-md font-mono text-sm mb-4",
          },
        },
        code: {
          HTMLAttributes: {
            class: "bg-gray-100 px-2 py-1 rounded font-mono text-sm",
          },
        },
        horizontalRule: {
          HTMLAttributes: {
            class: "border-t-2 border-gray-300 my-6",
          },
        },
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
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4 mx-auto block',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'tiptap-table border-collapse border border-gray-300 my-4',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'bg-gray-50 border border-gray-300 p-3 font-semibold text-left',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-3 text-base leading-relaxed font-sans',
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      if (typeof onChange === 'function') {
        // Convert non-breaking spaces back to regular spaces for storage
        const html = editor.getHTML().replace(/\u00A0/g, '&nbsp;');
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[200px] p-6 text-base leading-relaxed font-sans',
        style: 'white-space: pre-wrap;',
      },
      
      // Enhanced paste handling with better normalization
      handlePaste(view, event, slice) {
        const clipboardData = event.clipboardData || event.originalEvent?.clipboardData;
        if (!clipboardData) return false;

        const plain = clipboardData.getData('text/plain');
        const html = clipboardData.getData('text/html');

        // Handle plain text paste
        if (plain && !html) {
          event.preventDefault();
          
          // Split by lines and create proper paragraphs
          const lines = plain.split('\n');
          const paragraphs = lines.map(line => {
            if (line.trim() === '') {
              return '<p class="text-base leading-relaxed font-sans mb-4"><br></p>';
            }
            // Preserve spaces within the line
            const spacePreserved = line.replace(/  +/g, match => '&nbsp;'.repeat(match.length));
            return `<p class="text-base leading-relaxed font-sans mb-4">${spacePreserved}</p>`;
          });
          
          const finalHTML = paragraphs.join('');
          editor.commands.insertContent(finalHTML);
          return true;
        }

        // Handle rich text paste
        if (html) {
          event.preventDefault();
          const normalizedHTML = normalizeHTML(html);
          editor.commands.insertContent(normalizedHTML);
          return true;
        }

        return false;
      },
      
      // Transform pasted HTML
      transformPastedHTML(html) {
        return normalizeHTML(html);
      },
    },
  });

  // Attach normalizeHTML to editor for use in extensions
  useEffect(() => {
    if (editor) {
      editor.normalizeHTML = normalizeHTML;
    }
  }, [editor, normalizeHTML]);

  // Handle clicks outside of link menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (linkMenuVisible &&
        linkMenuRef.current &&
        !linkMenuRef.current.contains(event.target) &&
        linkButtonRef.current &&
        !linkButtonRef.current.contains(event.target)) {
        setLinkMenuVisible(false);
        setLinkUrl('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [linkMenuVisible]);

  // Enhanced link handling with proper focus management
  const handleLinkClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    setLinkUrl(previousUrl || '');
    
    // Toggle menu visibility
    setLinkMenuVisible(!linkMenuVisible);
    
    // Focus the input after menu opens
    setTimeout(() => {
      if (linkInputRef.current) {
        linkInputRef.current.focus();
        linkInputRef.current.select();
      }
    }, 10000);

    // If no text is selected, insert placeholder text
    if (editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .insertContent('link text')
        .setTextSelection({ from: editor.state.selection.from - 9, to: editor.state.selection.from })
        .run();
    }
  }, [editor, linkMenuVisible]);

  // Apply link with validation
  const applyLink = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
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

    setLinkMenuVisible(false);
    setLinkUrl('');
  }, [editor, linkUrl]);

  // Remove link functionality
  const removeLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
    setLinkMenuVisible(false);
    setLinkUrl('');
  }, [editor]);

  // Handle Enter key in link input
  const handleLinkKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      applyLink(e);
    } else if (e.key === 'Escape') {
      setLinkMenuVisible(false);
      setLinkUrl('');
      editor?.commands.focus();
    }
  }, [applyLink, editor]);

  // Convert file to base64
  const fileToBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  // Enhanced image upload handling
  const handleImageUpload = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    if (!editor) return;

    // Trigger file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [editor]);

  // Handle file selection for image upload
  const handleFileSelect = useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    try {
      setImageUploading(true);
      
      // Convert to base64 (you can replace this with API upload)
      const base64 = await fileToBase64(file);
      
      // Insert image into editor
      editor
        .chain()
        .focus()
        .setImage({ src: base64, alt: file.name })
        .run();
        
      // Add paragraph after image for better UX
      editor
        .chain()
        .insertContent('<p class="text-base leading-relaxed font-sans mb-4"><br></p>')
        .run();
        
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setImageUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [editor, fileToBase64]);

  // Add image via URL (fallback option)
  const addImageUrl = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor
        .chain()
        .focus()
        .setImage({ src: url })
        .insertContent('<p class="text-base leading-relaxed font-sans mb-4"><br></p>')
        .run();
    }
  }, [editor]);

  // Table functionality
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
      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: 'none' }}
      />
      
      {/* Link Menu Modal */}
      {linkMenuVisible && (
        <div
          ref={linkMenuRef}
          className="absolute top-16 left-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 min-w-[300px]"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Link URL:
            </label>
            <input
              ref={linkInputRef}
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={handleLinkKeyDown}
              placeholder="https://example.com"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-2">
              <button
                onClick={applyLink}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Apply
              </button>
              <button
                onClick={removeLink}
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove
              </button>
              <button
                onClick={() => {
                  setLinkMenuVisible(false);
                  setLinkUrl('');
                  editor?.commands.focus();
                }}
                className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-10 bg-white shadow-sm flex flex-wrap gap-1 p-2 bg-gray-50 rounded-t-md border border-b-0 border-gray-300">
        {/* Text Formatting */}
        <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().toggleBold().run();
  }}
  className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : ''}`}
  title="Bold"
>
          <span className="font-bold">B</span>
        </button>
        <button
          onClick={(e) => {e.preventDefault(); e.stopPropagation(); editor.chain().focus().toggleItalic().run()}}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Italic"
        >
          <span className="italic">I</span>
        </button>
        <button
          onClick={(e) => { e.preventDefault();
    e.stopPropagation(); editor.chain().focus().toggleUnderline().run()}}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Underline"
        >
          <span className="underline">U</span>
        </button>
        <button
          onClick={(e) => {e.preventDefault();
    e.stopPropagation(); editor.chain().focus().toggleStrike().run()}}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Strikethrough"
        >
          <span className="line-through">S</span>
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Headings */}
        <button
          onClick={(e) => {e.preventDefault();
    e.stopPropagation(); editor.chain().focus().toggleHeading({ level: 1 }).run()}}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          onClick={(e) => {e.preventDefault();
    e.stopPropagation(); editor.chain().focus().toggleHeading({ level: 2 }).run()}}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={(e) =>  {e.preventDefault();
    e.stopPropagation(); editor.chain().focus().toggleHeading({ level: 3 }).run()}}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Heading 3"
        >
          H3
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Lists */}
        <button
          onClick={(e) => { e.preventDefault();
    e.stopPropagation(); editor.chain().focus().toggleBulletList().run()}}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Bullet List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={(e) =>{ e.preventDefault();
    e.stopPropagation(); editor.chain().focus().toggleOrderedList().run()}}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Numbered List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M10 6h11M10 12h11M10 18h11M4 6h1v4H4V6zM4 16h2v2H4z" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Alignment */}
        <button
          onClick={(e) => {e.preventDefault();
    e.stopPropagation(); editor.chain().focus().setTextAlign('left').run()}}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Align Left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M3 6h18M3 12h15M3 18h18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.preventDefault();
    e.stopPropagation();  editor.chain().focus().setTextAlign('center').run()}}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Align Center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M3 6h18M6 12h12M3 18h18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={(e) => {e.preventDefault();
    e.stopPropagation();  editor.chain().focus().setTextAlign('right').run()}}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Align Right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M3 6h18M6 12h15M3 18h18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Block Elements */}
        <button
          onClick={() => {e.preventDefault();
    e.stopPropagation();   editor.chain().focus().toggleBlockquote().run()}}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Blockquote"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M7 11h4m6 0h4M7 15h4m6 0h4M8 3v4m8-4v4" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().setHorizontalRule().run();
  }}
  className="p-2 rounded hover:bg-gray-200"
  title="Horizontal Rule"
>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M3 12h18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Links & Images */}
        <button
          ref={linkButtonRef}
          onClick={handleLinkClick}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeWidth="2" strokeLinecap="round" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={handleImageUpload}
          disabled={imageUploading}
          className={`p-2 rounded hover:bg-gray-200 ${imageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Insert Image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2l1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={addImageUrl}
          className="p-2 rounded hover:bg-gray-200"
          title="Insert Image from URL"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7m4 0h6m-6 6h6m-6 6h6M13 4l4 4" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Code Blocks */}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('code') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Inline Code"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('codeBlock') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Code Block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Table Operations */}
        <button
          onClick={insertTable}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('table') ? 'bg-gray-200 text-blue-600' : ''}`}
          title="Insert Table"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M3 3h18v18H3V3zm18 4H9m12 4H9m12 4H9m12 4H9" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {editor.isActive('table') && (
          <>
            <button
              onClick={addRowBefore}
              className="p-2 rounded hover:bg-gray-200"
              title="Add Row Before"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
                <path d="M12 5v14m-7-7h14" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={addRowAfter}
              className="p-2 rounded hover:bg-gray-200"
              title="Add Row After"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
                <path d="M12 5v14m-7-7h14" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
        <button
          onClick={addColumnBefore}
          disabled={!editor?.can().addColumnBefore()}
          className={`p-2 rounded hover:bg-gray-200 ${!editor?.can().addColumnBefore() ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Add Column Before"
        >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
                <path d="M5 12h14m-7-7v14" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={addColumnAfter}
              className="p-2 rounded hover:bg-gray-200"
              title="Add Column After"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
                <path d="M12 5v14m-7-7h14" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={deleteRow}
              className="p-2 rounded hover:bg-gray-200 text-red-600"
              title="Delete Row"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={deleteColumn}
              className="p-2 rounded hover:bg-gray-200 text-red-600"
              title="Delete Column"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={deleteTable}
              className="p-2 rounded hover:bg-gray-200 text-red-600"
              title="Delete Table"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </>
        )}

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Undo/Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`p-2 rounded hover:bg-gray-200 ${!editor.can().undo() ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Undo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M3 7v6h6M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`p-2 rounded hover:bg-gray-200 ${!editor.can().redo() ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Redo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path d="M21 7v6h-6M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Main Editor */}
      <div className="border border-gray-300 rounded-b-md min-h-[300px] bg-white relative">
        {/* Bubble Menu for text selection */}
        {editor && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{
              duration: 100,
              placement: 'top',
              theme: 'light',
              interactive: false,
              hideOnClick: false,
              appendTo: () => document.body,
            }}
            className="flex bg-white shadow-lg border border-gray-300 rounded-lg p-1 space-x-1"
          >
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : ''}`}
              title="Bold"
            >
              <span className="font-bold text-sm">B</span>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : ''}`}
              title="Italic"
            >
              <span className="italic text-sm">I</span>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200 text-blue-600' : ''}`}
              title="Underline"
            >
              <span className="underline text-sm">U</span>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-200 text-blue-600' : ''}`}
              title="Strikethrough"
            >
              <span className="line-through text-sm">S</span>
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button
              onClick={handleLinkClick}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : ''}`}
              title="Link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeWidth="2" strokeLinecap="round" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </BubbleMenu>
        )}

        {/* Editor Content */}
        <EditorContent 
          editor={editor}
          className="focus:outline-none"
        />
      </div>

      {/* Status Bar */}
      <div className="flex justify-between items-center p-2 bg-gray-50 border border-t-0 border-gray-300 rounded-b-md text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span>
            {editor.storage.characterCount?.characters() || 0} characters
          </span>
          <span>
            {editor.storage.characterCount?.words() || 0} words
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {imageUploading && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Uploading image...</span>
            </div>
          )}
          <span className="text-xs text-gray-500">
            Press Tab to focus toolbar • Shift+Enter for line break
          </span>
        </div>
      </div>
    </div>
  );
};

export default TiptapEditor;