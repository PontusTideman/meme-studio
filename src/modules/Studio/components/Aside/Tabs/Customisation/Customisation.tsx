import React from 'react'
import { useTranslations } from 'next-intl'
import Button from '@components/Button'
import Tooltip from '@components/Tooltip'
import Accordion from '@studio/components/Accordion'
import { Box, HStack, styled, VStack } from '@styled-system/jsx'
import { faClone, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  useEvent,
  useGlobalInputsRef,
  useIsomorphicLayoutEffect,
  useItemIdSelected,
  usePrevious,
  useTextboxes
} from '@viclafouch/meme-studio-utilities/hooks'
import type { Meme, TextBox } from '@viclafouch/meme-studio-utilities/schemas'
import { preventEmptyTextValue } from '@viclafouch/meme-studio-utilities/utils'
import TextCustomisation from './TextCustomisation'

export type CustomisationProps = {
  meme: Meme
}

const Customisation = ({ meme }: CustomisationProps) => {
  const { textboxes, updateTextbox, addItem, removeItem, duplicateItem } =
    useTextboxes()
  const t = useTranslations()
  const { itemIdSelected, toggleItemIdSelected } = useItemIdSelected()
  const { getRef } = useGlobalInputsRef()
  const previousItemIdSelected = usePrevious(itemIdSelected)

  const handleAddTextbox = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addItem()
  }

  const handleRemoveItem = (itemId: string) => {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()
      removeItem(itemId)
    }
  }

  const handleDuplicateItem = (itemId: string) => {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()
      duplicateItem(itemId)
    }
  }

  const handleAfterOpenAccordion = (item: TextBox) => {
    return () => {
      const inputElement = getRef(item.id)?.current

      if (inputElement) {
        const { length } = inputElement.value
        inputElement.focus()
        // Set cursor at the end of value
        inputElement.setSelectionRange(length, length)
      }
    }
  }

  const handleToggleAccordion = (item: TextBox) => {
    return () => {
      toggleItemIdSelected(item.id)
    }
  }

  const handleKeypress = useEvent(() => {
    if (itemIdSelected) {
      const inputElement = getRef(itemIdSelected)?.current

      if (inputElement) {
        inputElement.focus()
      }
    }
  })

  useIsomorphicLayoutEffect(() => {
    if (previousItemIdSelected && itemIdSelected !== previousItemIdSelected) {
      const inputElement = getRef(previousItemIdSelected)?.current

      if (inputElement) {
        // Don't wait animation for new itemIdSelected to blur the previous input element
        // Force to blur now
        inputElement.blur()
      }
    }
  }, [previousItemIdSelected, itemIdSelected, getRef])

  React.useEffect(() => {
    window.addEventListener('keypress', handleKeypress, false)

    return () => {
      window.removeEventListener('keypress', handleKeypress, false)
    }
  }, [handleKeypress])

  return (
    <Box overflowY="auto" overflowX="hidden" pb={10}>
      <VStack textAlign="center" p="2" m="2" gap={2}>
        <styled.span display="block">{t('common.customization')}</styled.span>
        <styled.h1
          fontSize="sm"
          lineClamp="1"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
          maxW="full"
        >
          {meme.name}
        </styled.h1>
      </VStack>
      <VStack gap={0}>
        {textboxes.map((textbox, index) => {
          return (
            <Accordion
              onToggle={handleToggleAccordion(textbox)}
              title={preventEmptyTextValue(
                textbox.properties.value,
                index,
                `${t('common.text')} #`
              )}
              isOpened={itemIdSelected === textbox.id}
              key={textbox.id}
              onAfterOpen={handleAfterOpenAccordion(textbox)}
              action={
                <HStack gap={3} alignItems="center">
                  <Tooltip text={t('common.duplicate')} position="top">
                    <styled.button
                      aria-label={t('common.duplicate')}
                      onClick={handleDuplicateItem(textbox.id)}
                      type="button"
                      cursor="pointer"
                    >
                      <FontAwesomeIcon icon={faClone} />
                    </styled.button>
                  </Tooltip>
                  <Tooltip text={t('common.delete')} position="top">
                    <styled.button
                      aria-label={t('common.delete')}
                      onClick={handleRemoveItem(textbox.id)}
                      type="button"
                      cursor="pointer"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </styled.button>
                  </Tooltip>
                </HStack>
              }
            >
              <TextCustomisation
                onUpdateTextProperties={updateTextbox}
                textbox={textbox}
                index={index}
              />
            </Accordion>
          )
        })}
      </VStack>
      <Button rounded={false} fullWidth onClick={handleAddTextbox}>
        {t('tools.addText')}
      </Button>
    </Box>
  )
}

export default Customisation
