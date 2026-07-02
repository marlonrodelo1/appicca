const BIBLE_API = 'https://bible-api.com'

export async function getVerse(reference: string) {
  const res = await fetch(
    `${BIBLE_API}/${encodeURIComponent(reference)}?translation=reina_valera`
  )
  if (!res.ok) throw new Error('Error fetching verse')
  return res.json()
}

export async function getVerseEN(reference: string) {
  const res = await fetch(
    `${BIBLE_API}/${encodeURIComponent(reference)}`
  )
  if (!res.ok) throw new Error('Error fetching verse')
  return res.json()
}
