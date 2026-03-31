import { toast, type ToastOptions } from 'react-toastify'
import { useTranslations } from 'next-intl'

export const useNotifications = () => {
  const t = useTranslations()

  type TextKey = Parameters<typeof t>[0]

  const notifyError = (text?: TextKey) => {
    toast(text || t('common.errors.unknown'), {
      type: 'error'
    })
  }

  const notifySuccess = (text: TextKey) => {
    toast(t(text), {
      type: 'success'
    })
  }

  return {
    notifyError,
    notifySuccess,
    notify: (text: TextKey, options: ToastOptions) => {
      return toast(text, options)
    }
  }
}
