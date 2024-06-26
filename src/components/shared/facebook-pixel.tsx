'use client'

import { useEffect, useState } from 'react'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

import * as pixel from '@/utils/facebook-pixel'

export function FacebookPixel() {
  const [loaded, setLoaded] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!loaded) return

    pixel.pageview()
  }, [pathname, loaded])

  return (
    <div>
      <Script
        id="fb-pixel"
        src="/scripts/pixel.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
        data-pixel-id={pixel.FB_PIXEL_ID}
      />
    </div>
  )
}
