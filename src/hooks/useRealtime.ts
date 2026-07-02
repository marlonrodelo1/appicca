'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

type RealtimeCallback = (payload: {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new: Record<string, unknown>
  old: Record<string, unknown>
}) => void

export function useRealtime(table: string, callback: RealtimeCallback, filter?: string) {
  useEffect(() => {
    const channelName = `realtime-${table}-${filter ?? 'all'}`

    let channel = supabase.channel(channelName)

    const config: {
      event: '*'
      schema: 'public'
      table: string
      filter?: string
    } = {
      event: '*',
      schema: 'public',
      table,
    }

    if (filter) config.filter = filter

    channel = channel.on('postgres_changes', config, (payload) => {
      callback({
        eventType: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
        new: (payload.new ?? {}) as Record<string, unknown>,
        old: (payload.old ?? {}) as Record<string, unknown>,
      })
    })

    channel.subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [table, filter, callback])
}
