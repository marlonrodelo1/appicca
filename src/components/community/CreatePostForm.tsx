'use client'

import { useState, useRef } from 'react'
import { Image, X, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Avatar from '@/components/shared/Avatar'
import { supabase } from '@/lib/supabase/client'
import { useAuthStore } from '@/stores/authStore'

interface CreatePostFormProps {
  onPost: (content: string, mediaUrls: string[]) => Promise<void>
  onCancel?: () => void
}

export default function CreatePostForm({ onPost, onCancel }: CreatePostFormProps) {
  const { user } = useAuthStore()
  const [content, setContent] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [posting, setPosting] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !user) return

    setUploading(true)
    const urls: string[] = []

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()
      const path = `${user.id}/${Date.now()}.${ext}`

      const { error } = await supabase.storage
        .from('posts')
        .upload(path, file)

      if (!error) {
        const { data } = supabase.storage.from('posts').getPublicUrl(path)
        urls.push(data.publicUrl)
      }
    }

    setImages((prev) => [...prev, ...urls])
    setUploading(false)
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!content.trim() && images.length === 0) return

    setPosting(true)
    try {
      await onPost(content.trim(), images)
      setContent('')
      setImages([])
    } catch {
      // Error handled by parent
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="border-b border-brand-border bg-white px-4 py-4">
      <div className="flex gap-3">
        <Avatar src={user?.avatar_url} name={user?.full_name} size="md" />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="¿Qué quieres compartir?"
            rows={3}
            className="w-full resize-none border-0 bg-transparent text-sm text-brand-text-primary placeholder:text-brand-text-hint focus:outline-none"
          />

          {/* Image previews */}
          {images.length > 0 && (
            <div className="mt-2 flex gap-2 overflow-x-auto">
              {images.map((url, i) => (
                <div key={i} className="relative shrink-0">
                  <img src={url} alt="" className="h-20 w-20 rounded-lg object-cover" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="flex h-9 w-9 items-center justify-center rounded-full text-brand-blue-text hover:bg-brand-blue-soft"
              >
                {uploading ? <Loader2 size={18} className="animate-spin" /> : <Image size={18} />}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <div className="flex gap-2">
              {onCancel && (
                <Button variant="ghost" size="sm" onClick={onCancel}>
                  Cancelar
                </Button>
              )}
              <Button
                size="sm"
                loading={posting}
                disabled={!content.trim() && images.length === 0}
                onClick={handleSubmit}
              >
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
