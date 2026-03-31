import { Link } from '@i18n/navigation'
import { styled } from '@styled-system/jsx'

export const MemeTitle = styled('h3', {
  base: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    zIndex: 3,
    textAlign: 'center',
    visibility: 'hidden'
  }
})

export const MemeLink = styled(Link, {
  base: {
    display: 'block',
    boxSize: 'full',
    pos: 'relative'
  },
  variants: {
    disableHoverShowTitle: {
      false: {
        '&:hover': {
          '& > h3': {
            visibility: 'visible'
          },
          _before: {
            content: "''",
            boxSize: 'full',
            zIndex: 2,
            position: 'absolute',
            inset: 0,
            bg: 'white/65'
          }
        }
      }
    }
  }
})
