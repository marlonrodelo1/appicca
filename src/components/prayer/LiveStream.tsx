'use client'

import { Radio } from 'lucide-react'

interface LiveStreamProps {
  streamUrl: string | null
  isLive: boolean
  viewerCount: number
}

export default function LiveStream({ streamUrl, isLive, viewerCount }: LiveStreamProps) {
  if (!isLive || !streamUrl) {
    return (
      <div className="flex h-52 items-center justify-center rounded-2xl bg-brand-text-primary">
        <div className="text-center">
          <Radio size={32} className="mx-auto text-brand-text-hint" />
          <p className="mt-2 text-sm text-brand-text-hint">No hay transmisión en vivo</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black">
      <iframe
        src={streamUrl}
        className="h-52 w-full"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      <div className="absolute left-3 top-3 flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          EN VIVO
        </span>
        <span className="rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">
          {viewerCount} viendo
        </span>
      </div>
    </div>
  )
}
