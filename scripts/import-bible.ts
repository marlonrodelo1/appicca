/**
 * Importa la Biblia RV1960 desde archivos TXT locales (xtiam57/church-utils) a Supabase.
 * Cada archivo TXT contiene un libro, con capítulos separados por "***".
 * Cada línea dentro de un capítulo es un versículo.
 *
 * Uso: npx tsx scripts/import-bible.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { readFileSync } from 'fs'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface BookIndex {
  testament: string
  title: string
  shortTitle: string
  abbr: string
  category: string
  key: string
}

async function main() {
  console.log('\n=== Importando Biblia RV1960 a Supabase ===\n')

  // 1. Leer índice de libros
  const booksIndex: BookIndex[] = JSON.parse(
    readFileSync(resolve(__dirname, 'bible-index.json'), 'utf-8')
  )
  console.log(`Libros en source: ${booksIndex.length}`)

  // 2. Obtener version RV1960 y sus libros de Supabase
  const { data: version } = await supabase
    .from('bible_versions')
    .select('id')
    .eq('code', 'RV1960')
    .single()

  if (!version) {
    console.error('Version RV1960 no encontrada en bible_versions.')
    process.exit(1)
  }

  const { data: dbBooks } = await supabase
    .from('bible_books')
    .select('id, book_number, name')
    .eq('version_id', version.id)
    .order('book_number')

  if (!dbBooks || dbBooks.length === 0) {
    console.error('No se encontraron libros en Supabase.')
    process.exit(1)
  }

  console.log(`Libros en Supabase: ${dbBooks.length}\n`)

  let totalInserted = 0
  let totalErrors = 0

  // 3. Iterar cada libro
  for (let i = 0; i < booksIndex.length; i++) {
    const bookSource = booksIndex[i]
    const dbBook = dbBooks[i] // Mismo orden (1-66)

    if (!dbBook) {
      console.error(`  No hay libro #${i + 1} en Supabase`)
      totalErrors++
      continue
    }

    // Leer archivo TXT
    const filePath = resolve(__dirname, 'biblia', `${bookSource.key}.txt`)
    let content: string
    try {
      content = readFileSync(filePath, 'utf-8')
    } catch {
      console.error(`  Archivo no encontrado: ${filePath}`)
      totalErrors++
      continue
    }

    // Separar capítulos por "***"
    const chapters = content
      .split('***')
      .map((ch) => ch.trim())
      .filter((ch) => ch.length > 0)

    const allRows: { book_id: string; chapter: number; verse: number; text: string }[] = []

    for (let chIdx = 0; chIdx < chapters.length; chIdx++) {
      const lines = chapters[chIdx]
        .split('\n')
        .map((l) => l.replace(/\/n/g, '\n').trim())
        .filter((l) => l.length > 0)

      for (let vIdx = 0; vIdx < lines.length; vIdx++) {
        allRows.push({
          book_id: dbBook.id,
          chapter: chIdx + 1,
          verse: vIdx + 1,
          text: lines[vIdx],
        })
      }
    }

    // Insertar en lotes de 500
    let bookInserted = 0
    for (let j = 0; j < allRows.length; j += 500) {
      const batch = allRows.slice(j, j + 500)
      const { error } = await supabase.from('bible_verses').upsert(batch, {
        onConflict: 'book_id,chapter,verse',
      })

      if (error) {
        console.error(`  ${dbBook.name} lote ${j}: ERROR - ${error.message}`)
        totalErrors++
      } else {
        bookInserted += batch.length
      }
    }

    totalInserted += bookInserted
    console.log(
      `  ${String(i + 1).padStart(2)}/66  ${dbBook.name.padEnd(20)} ${chapters.length} caps, ${bookInserted} vers`
    )
  }

  console.log(`\n=== IMPORTACION COMPLETA ===`)
  console.log(`Total versiculos: ${totalInserted}`)
  console.log(`Errores: ${totalErrors}`)
}

main().catch(console.error)
