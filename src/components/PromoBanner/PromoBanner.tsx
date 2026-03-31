'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'

const STORAGE_KEY = 'promo-banner-dismissed-v1'

const containerStyles = css({
  position: 'relative',
  background:
    'linear-gradient(270deg, rgb(30, 30, 60), rgb(48, 91, 161), rgb(60, 30, 90), rgb(48, 91, 161))',
  backgroundSize: '300% 100%',
  animation: 'gradientShift 8s ease infinite',
  zIndex: 1000
})

const linkStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: { base: 2, md: 4 },
  textDecoration: 'none',
  color: 'secondary.textContrast',
  _hover: {
    color: 'white'
  }
})

const messageStyles = css({
  fontSize: { base: '0.8rem', md: '0.9rem' },
  fontWeight: 400,
  letterSpacing: '0.02em',
  textAlign: 'center'
})

const ctaStyles = css({
  flexShrink: 0,
  fontSize: { base: '0.75rem', md: '0.8rem' },
  fontWeight: 400,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  background: 'rgba(255, 255, 255, 0.15)',
  borderRadius: 'full',
  px: 3,
  py: 1,
  whiteSpace: 'nowrap',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  _hover: {
    background: 'rgba(255, 255, 255, 0.25)'
  }
})

const closeButtonStyles = css({
  position: { base: 'absolute', md: 'static' },
  right: { base: 3, md: 'unset' },
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  borderRadius: 'full',
  border: 'none',
  background: 'rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 0.7)',
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s',
  _hover: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white'
  }
})

const PromoBanner = () => {
  const [isDismissed, setIsDismissed] = React.useState(true)
  const t = useTranslations('banner')

  React.useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)

    if (!dismissed) {
      setIsDismissed(false)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setIsDismissed(true)
  }

  if (isDismissed) {
    return null
  }

  return (
    <div className={containerStyles}>
      <Flex
        align="center"
        justify="center"
        gap={{ base: 2, md: 4 }}
        py="2.5"
        px="12"
        minH="44px"
      >
        <a
          href="https://www.petit-meme.io"
          target="_blank"
          rel="noopener noreferrer"
          className={linkStyles}
        >
          <span className={messageStyles}>{t('message')}</span>
          <span className={ctaStyles}>{t('cta')}</span>
        </a>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label={t('close')}
          className={closeButtonStyles}
        >
          <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
        </button>
      </Flex>
    </div>
  )
}

export default PromoBanner
