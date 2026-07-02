'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Send, Hand } from 'lucide-react'
import Avatar from '@/components/shared/Avatar'
import { supabase } from '@/lib/supabase/client'
import { useAuthStore } from '@/stores/authStore'
import { useRealtime } from '@/hooks/useRealtime'

interface ChatMessage {
  id: string
  prayer_id: string
  content: string
  is_prayer_request: boolean
  created_at: string
  user_id: string
  profile?: { full_name: string; avatar_url: string | null }
}

interface PrayerChatProps {
  prayerId: string
}

export default function PrayerChat({ prayerId }: PrayerChatProps) {
  const { user } = useAuthStore()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('prayer_chat_messages')
        .select('*, profile:profiles(full_name, avatar_url)')
        .eq('prayer_id', prayerId)
        .order('created_at', { ascending: true })
        .limit(100)

      if (data) {
        setMessages(
          data.map((m) => ({
            ...m,
            profile: Array.isArray(m.profile) ? m.profile[0] : m.profile,
          })) as ChatMessage[]
        )
      }
    }
    fetch()
  }, [prayerId])

  const handleRealtime = useCallback(
    (payload: { eventType: string; new: Record<string, unknown> }) => {
      if (payload.eventType === 'INSERT') {
        const msg = payload.new as unknown as ChatMessage
        if (msg.prayer_id === prayerId) {
          setMessages((prev) => [...prev, msg])
        }
      }
    },
    [prayerId]
  )

  useRealtime('prayer_chat_messages', handleRealtime, `prayer_id=eq.${prayerId}`)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (isPrayerRequest = false) => {
    if (!user || !input.trim()) return
    setSending(true)

    await supabase.from('prayer_chat_messages').insert({
      prayer_id: prayerId,
      user_id: user.id,
      content: input.trim(),
      is_prayer_request: isPrayerRequest,
    })

    setInput('')
    setSending(false)
  }

  return (
    <div className="flex flex-col">
      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3" style={{ maxHeight: '40vh' }}>
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-2">
            <Avatar src={msg.profile?.avatar_url} name={msg.profile?.full_name} size="sm" />
            <div className={`rounded-xl px-3 py-2 ${msg.is_prayer_request ? 'bg-brand-gold-light border border-brand-gold/30' : 'bg-brand-blue-soft/50'}`}>
              <p className="text-xs font-semibold text-brand-text-primary">
                {msg.profile?.full_name}
                {msg.is_prayer_request && (
                  <span className="ml-2 text-[10px] font-normal text-brand-gold-dark">Petición de oración</span>
                )}
              </p>
              <p className="mt-0.5 text-sm text-brand-text-primary">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-brand-border px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => send(true)}
            disabled={sending || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold-light text-brand-gold-dark disabled:opacity-40"
            title="Enviar como petición de oración"
          >
            <Hand size={16} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Escribe un mensaje..."
            className="flex-1 rounded-full border border-brand-border px-4 py-2.5 text-sm text-brand-text-primary placeholder:text-brand-text-hint focus:outline-none focus:border-brand-blue-mid"
          />
          <button
            onClick={() => send()}
            disabled={sending || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold text-white disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
