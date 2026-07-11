import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  LinkIcon,
  Unlink,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
} from 'lucide-react';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const contentClasses = 'blog-content max-w-none focus:outline-none min-h-[300px] p-4';

export function TipTapEditor({ content, onChange, placeholder = 'Start writing...' }: TipTapEditorProps) {
  const [linkUrl, setLinkUrl] = useState('');
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePopoverOpen, setImagePopoverOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Image.configure({ HTMLAttributes: { class: 'rounded-lg' } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: contentClasses,
      },
    },
  });

  if (!editor) {
    return null;
  }

  const openLinkPopover = () => {
    setLinkUrl(editor.getAttributes('link').href || '');
    setLinkPopoverOpen(true);
  };

  const applyLink = () => {
    const url = linkUrl.trim();
    if (!url) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
    setLinkPopoverOpen(false);
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    setLinkPopoverOpen(false);
  };

  const insertImage = () => {
    const url = imageUrl.trim();
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    setImageUrl('');
    setImagePopoverOpen(false);
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-border p-2 flex flex-wrap gap-1 bg-muted/50">
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant={editor.isActive('bold') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('italic') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('underline') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('strike') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <AlignLeft className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <AlignCenter className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <AlignRight className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Popover open={linkPopoverOpen} onOpenChange={setLinkPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant={editor.isActive('link') ? 'default' : 'ghost'}
              size="sm"
              onClick={openLinkPopover}
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72" align="start">
            <div className="space-y-2">
              <p className="text-sm font-medium">Link URL</p>
              <div className="flex gap-2">
                <Input
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  onKeyDown={(e) => e.key === 'Enter' && applyLink()}
                  autoFocus
                />
                <Button type="button" size="sm" onClick={applyLink}>
                  Apply
                </Button>
              </div>
              {editor.isActive('link') && (
                <Button type="button" variant="ghost" size="sm" className="w-full" onClick={removeLink}>
                  <Unlink className="w-4 h-4 mr-2" />
                  Remove link
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>

        <Popover open={imagePopoverOpen} onOpenChange={setImagePopoverOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="sm">
              <ImageIcon className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-2">
              <p className="text-sm font-medium">Image URL</p>
              <p className="text-xs text-muted-foreground">
                Paste a public image link, e.g. a raw.githubusercontent.com URL from your GitHub repo.
              </p>
              <div className="flex gap-2">
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://raw.githubusercontent.com/..."
                  onKeyDown={(e) => e.key === 'Enter' && insertImage()}
                  autoFocus
                />
                <Button type="button" size="sm" onClick={insertImage}>
                  Insert
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor */}
      <div className="min-h-[300px] bg-background">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
