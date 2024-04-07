export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

export const pageview = () => {
  const obj = window as any
  obj.fbq('track', 'PageView')
}

export const event = (name: any, options = {}) => {
  const obj = window as any
  obj.fbq('track', name, options)
}
