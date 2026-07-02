export type UserRole = 'user' | 'super_admin'
export type DonationType = 'one_time' | 'recurring'
export type DonationStatus = 'pending' | 'completed' | 'failed' | 'refunded'
export type SponsorshipStatus = 'active' | 'paused' | 'ended'
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
export type MediaType = 'image' | 'video' | 'text'

export interface Church {
  id: string
  name: string
  slug: string
  address: string | null
  city: string | null
  country: string | null
  latitude: number | null
  longitude: number | null
  timezone: string
  pastor_name: string | null
  phone: string | null
  website_url: string | null
  logo_url: string | null
  worship_hours: Record<string, unknown>[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  full_name: string
  phone: string
  avatar_url: string | null
  church_id: string | null
  role: UserRole
  locale: string
  push_token: string | null
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  user_id: string
  content: string | null
  media_urls: string[]
  media_type: MediaType
  likes_count: number
  comments_count: number
  is_pinned: boolean
  is_hidden: boolean
  created_at: string
  updated_at: string
  // Joined
  profile?: Profile
}

export interface PostComment {
  id: string
  post_id: string
  user_id: string
  content: string
  parent_id: string | null
  created_at: string
  updated_at: string
  profile?: Profile
}

export interface DailyVerse {
  id: string
  date: string
  reference: string
  text_es: string
  text_en: string | null
  text_pt: string | null
  text_fr: string | null
  text_de: string | null
  bible_version: string
  likes_count: number
  comments_count: number
  created_at: string
}

export interface Devotional {
  id: string
  date: string | null
  title: string
  body: string
  image_url: string | null
  verses: string[]
  locale: string
  translations: Record<string, unknown>
  is_published: boolean
  created_at: string
}

export interface Event {
  id: string
  church_id: string | null
  title: string
  description: string | null
  image_url: string | null
  location: string | null
  online_url: string | null
  is_online: boolean
  start_date: string
  end_date: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Program {
  id: string
  slug: string
  title: string
  description: string | null
  image_url: string | null
  how_to_participate: string | null
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface Donation {
  id: string
  user_id: string
  church_id: string | null
  program_id: string | null
  amount: number
  currency: string
  type: DonationType
  stripe_payment_id: string | null
  stripe_subscription_id: string | null
  receipt_url: string | null
  status: DonationStatus
  created_at: string
  updated_at: string
}

export interface Sponsorship {
  id: string
  program_id: string
  sponsor_id: string
  beneficiary_name: string | null
  beneficiary_photo: string | null
  church_id: string | null
  status: SponsorshipStatus
  monthly_amount: number
  stripe_subscription_id: string | null
  started_at: string
  ended_at: string | null
}

export interface LivePrayer {
  id: string
  title: string
  host_id: string | null
  stream_url: string | null
  is_live: boolean
  started_at: string | null
  ended_at: string | null
  viewer_count: number
}

export interface DirectMessage {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  is_read: boolean
  created_at: string
  read_at: string | null
  profile?: Profile
}

export interface Article {
  id: string
  title: string
  slug: string
  body: string
  excerpt: string | null
  image_url: string | null
  category: string | null
  author_id: string | null
  translations: Record<string, unknown>
  is_published: boolean
  published_at: string | null
  created_at: string
}
