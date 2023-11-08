import styled from 'styled-components'
import { PARTICLES_BACKGROUND } from '@styles/utils'

type ContainerProps = Partial<{
  $animatedBackground: boolean
}>

const Styled = {
  Container: styled.div<ContainerProps>`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;

    ${(props) => {
      return props.$animatedBackground ? PARTICLES_BACKGROUND : ''
    }}
  `
}

export default Styled
