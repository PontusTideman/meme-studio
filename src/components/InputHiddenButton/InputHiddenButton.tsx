import React from 'react'
import type { BaseButtonProps } from '@components/Button'
import { css, cx } from '@styled-system/css'
import * as styles from '../Button/Button.styles'

export type InputHiddenButtonProps = Omit<
  React.ComponentProps<'input'>,
  'size'
> &
  BaseButtonProps

const InputHiddenButton = ({
  children = null,
  startAdornment = null,
  color,
  rounded,
  fullWidth,
  size,
  className,
  ...restInputProps
}: InputHiddenButtonProps) => {
  const id = React.useId()
  const classes = styles.button({ rounded, fullWidth, color, size })

  return (
    <label htmlFor={id} className={cx(classes.root, className)}>
      <input
        type="file"
        className={css({
          boxSize: '0',
          opacity: 0,
          position: 'absolute',
          visibility: 'hidden'
        })}
        id={id}
        {...restInputProps}
      />
      {startAdornment ? (
        <span className={cx(classes['start-adornment'], 'start-adornment')}>
          {startAdornment}
        </span>
      ) : null}
      {children}
    </label>
  )
}

export default InputHiddenButton
