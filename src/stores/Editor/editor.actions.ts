import { Draft, produce } from 'immer'
import * as R from 'ramda'
import { StoreApi } from 'zustand'
import { EditorState, Tab } from './editor.types'

function getCanvasDimensions(windowSizes: Dimensions) {
  return {
    width: windowSizes.width - 54 - 320 - 198,
    height: windowSizes.height - 80 - 100
  }
}

export function setCurrentTab(set: StoreApi<EditorState>['setState']) {
  return (newTab: Tab) => {
    return set(
      produce((draft: Draft<EditorState>) => {
        draft.currentTab = newTab
      })
    )
  }
}

export function setResize(set: StoreApi<EditorState>['setState']) {
  return (windowSizes: Dimensions) => {
    return set(
      produce((draft: Draft<EditorState>) => {
        draft.canvasDimensions = getCanvasDimensions(windowSizes)
      })
    )
  }
}

export function setText(set: StoreApi<EditorState>['setState']) {
  return (textId: TextBox['id'], values: Partial<TextBox>) => {
    return set(
      produce((draft: Draft<EditorState>) => {
        const textIndex = R.findIndex((textBox) => {
          return textId === textBox.id
        }, draft.texts)
        draft.texts[textIndex] = {
          ...(draft.texts[textIndex] as TextBox),
          ...values
        }
      })
    )
  }
}

export function toggleShowTextAreas(set: StoreApi<EditorState>['setState']) {
  return () => {
    return set(
      produce((draft: Draft<EditorState>) => {
        draft.showTextAreas = !draft.showTextAreas
      })
    )
  }
}
