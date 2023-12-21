import { toast as showToast } from 'sonner'

const generateStyle = (color: string): React.CSSProperties => {
  return { background: color, color: '#fff', borderColor: color }
}

export const toast = {
  error(message: string) {
    const style = generateStyle('#e51e3e')
    return showToast.error(message, { style })
  },

  success(message: string) {
    const style = generateStyle('#008a2e')
    return showToast.success(message, { style })
  },
}
