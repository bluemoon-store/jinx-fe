import { getCategoriesAction } from '@/actions/product'

import HeroSectionClient from './HeroSectionClient'

type HeroSectionProps = {
  title: string
  subtitle: string
}

export default async function HeroSection({ title, subtitle }: HeroSectionProps) {
  let categories: Awaited<ReturnType<typeof getCategoriesAction>> = []
  try {
    categories = await getCategoriesAction()
  } catch {
    categories = []
  }

  return <HeroSectionClient categories={categories} title={title} subtitle={subtitle} />
}
