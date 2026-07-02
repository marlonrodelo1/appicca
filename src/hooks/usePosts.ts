'use client'

import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Post } from '@/types'

const PAGE_SIZE = 20

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const fetchPosts = useCallback(async (reset = false) => {
    setLoading(true)
    const currentPage = reset ? 0 : page
    const from = currentPage * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { data } = await supabase
      .from('posts')
      .select('*, profile:profiles(id, full_name, avatar_url)')
      .eq('is_hidden', false)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (data) {
      const mapped = data.map((p) => ({
        ...p,
        profile: Array.isArray(p.profile) ? p.profile[0] : p.profile,
      })) as Post[]

      if (reset) {
        setPosts(mapped)
        setPage(1)
      } else {
        setPosts((prev) => [...prev, ...mapped])
        setPage(currentPage + 1)
      }
      setHasMore(data.length === PAGE_SIZE)
    }
    setLoading(false)
  }, [page])

  const createPost = useCallback(async (userId: string, content: string, mediaUrls: string[] = []) => {
    const mediaType = mediaUrls.length > 0
      ? (mediaUrls[0].includes('video') ? 'video' : 'image')
      : 'text'

    const { data, error } = await supabase
      .from('posts')
      .insert({
        user_id: userId,
        content,
        media_urls: mediaUrls,
        media_type: mediaType,
      })
      .select('*, profile:profiles(id, full_name, avatar_url)')
      .single()

    if (error) throw error

    const mapped = {
      ...data,
      profile: Array.isArray(data.profile) ? data.profile[0] : data.profile,
    } as Post

    setPosts((prev) => [mapped, ...prev])
    return mapped
  }, [])

  const likePost = useCallback(async (postId: string, userId: string) => {
    await supabase.from('post_likes').insert({ post_id: postId, user_id: userId })
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes_count: p.likes_count + 1 } : p))
    )
  }, [])

  const unlikePost = useCallback(async (postId: string, userId: string) => {
    await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId)
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes_count: Math.max(0, p.likes_count - 1) } : p))
    )
  }, [])

  const deletePost = useCallback(async (postId: string) => {
    await supabase.from('posts').delete().eq('id', postId)
    setPosts((prev) => prev.filter((p) => p.id !== postId))
  }, [])

  return {
    posts,
    loading,
    hasMore,
    fetchPosts,
    createPost,
    likePost,
    unlikePost,
    deletePost,
  }
}
