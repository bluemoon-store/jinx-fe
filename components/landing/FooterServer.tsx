import Footer from '@/components/landing/Footer'
import { getPublicSettings } from '@/lib/settings-public'

export default async function FooterServer() {
  const settings = await getPublicSettings()

  return (
    <Footer
      supportLink={settings.supportLink}
      telegramLink={settings.telegramLink}
      discordLink={settings.discordLink}
    />
  )
}
