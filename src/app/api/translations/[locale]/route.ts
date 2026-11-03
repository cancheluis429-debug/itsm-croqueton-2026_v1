import { hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { NextResponse } from 'next/server'

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(['es', 'en'], locale)) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
  }

  return NextResponse.json({ locale, messages: await getMessages({ locale }) })
}
