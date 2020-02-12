import * as React from 'react'
import { useState, useRef, RefObject, useEffect } from 'react'
import { ReactSVG } from 'react-svg'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Gallery from '@components/Tabs/Gallery/Gallery'
import Customization from '@components/Tabs/Customization/Customization'
import Button from '@components/Button/Button'
import WrapperCanvas from '@components/WrapperCanvas/WrapperCanvas'
import Tab from '@components/Tabs/Tab'
import { EditorState } from '@store/EditorContext'
import { SET_MEME_SELECTED, RESIZE_WINDOW } from '@store/reducer/constants'
import { TAB_CUSTOMIZATION, TAB_GALLERY } from '@shared/constants'
import Meme from '@shared/models/Meme'
import Tools from '@components/Tools/Tools'
import Header from '@components/Header/Header'
import { endWithExt, randomID, innerDimensions, wait } from '@utils/index'
import DragAndDrop from '@components/DragAndDrop/DragAndDrop'
import { useWindowWidth, useEditor } from '@shared/hooks'
import { Modal } from '@components/Modal/Modal'

function Studio(props: any): JSX.Element {
  const inputDrop: RefObject<HTMLInputElement> = useRef(null)
  const contentRef: RefObject<HTMLDivElement> = useRef(null)
  const [isLoading, setIsLoading]: [boolean, Function] = useState<boolean>(false)
  const { t } = useTranslation()
  const { width, isMinLgSize } = useWindowWidth()
  const [currentTab, setCurrentTab]: [string, Function] = useState<string>(isMinLgSize ? TAB_GALLERY : null)
  const [{ memeSelected }, dispatchEditor]: [EditorState, Function] = useEditor()

  useEffect(() => {
    const wrapper: HTMLElement = contentRef.current
    dispatchEditor({
      type: RESIZE_WINDOW,
      innerDimensions: innerDimensions(wrapper)
    })
  }, [width])

  const handleChooseMeme = async (meme: Meme): Promise<void> => {
    try {
      setIsLoading(true)
      // const { texts } = await getMeme(meme.id) // TODO
      await wait(300)
      dispatchEditor({
        type: SET_MEME_SELECTED,
        memeSelected: meme
      })
      setCurrentTab(TAB_CUSTOMIZATION)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (memeSelected) {
      document.title = `Meme Studio - ${memeSelected.name}`
      setCurrentTab(isMinLgSize ? TAB_CUSTOMIZATION : null)
    } else {
      document.title = `Meme Studio`
      setCurrentTab(isMinLgSize ? TAB_GALLERY : null)
    }
  }, [memeSelected])

  const handleImportImage = async (fileList?: FileList): Promise<void> => {
    const files = fileList || inputDrop.current.files
    if (!files.length) return
    else if (files.length > 1) return console.log('not multiple files')
    else if (!endWithExt(['.jpg', '.png', 'jpeg'], files[0].name)) return console.log('not good extension')

    const meme = new Meme({
      id: randomID(),
      height: 0,
      width: 0,
      boxCount: 0,
      name: files[0].name,
      url: window.URL.createObjectURL(files[0])
    })

    const { width, height } = await meme.image

    meme.width = width
    meme.height = height

    dispatchEditor({
      type: SET_MEME_SELECTED,
      memeSelected: meme,
      texts: []
    })
  }

  const closeTabModal = (): void => setCurrentTab(null)

  return (
    <>
      <div className="page page-studio">
        <div className="ld ld-fall-ttb-in studio-header">
          <Header export={(): void => props.setIsModalExportOpen(true)} />
        </div>
        <div className="ld ld-float-btt-in studio-body">
          <div className="studio-tools">
            <Tools setCurrentTab={setCurrentTab} />
          </div>
          <div className={`studio-content ${memeSelected ? 'studio-content-active' : ''}`} ref={contentRef}>
            {memeSelected && <WrapperCanvas changeTab={setCurrentTab} />}
            {!memeSelected && (
              <div className="empty-meme">
                <ReactSVG src="images/choose-meme.svg" wrapper="span" className="choose-meme-svg" />
                {isMinLgSize ? (
                  <>
                    <p>
                      {t('studio.selectMeme')} <br />{' '}
                      <label className="import-image-label" htmlFor="local-meme">
                        <input
                          type="file"
                          ref={inputDrop}
                          onChange={(): any => handleImportImage()}
                          className="import-image-label-input"
                          accept="image/png, image/jpeg"
                          id="local-meme"
                        />
                        {t('studio.or')} <span className="import-image-label-text">{t('studio.importImage')}</span>.
                      </label>
                    </p>
                    <DragAndDrop onDrop={handleImportImage} id="dragenter-root" />
                  </>
                ) : (
                  <div className="empty-meme-buttons-container">
                    <Button className={'button-select-gallery'} big onClick={(): void => setCurrentTab(TAB_GALLERY)}>
                      Sélectionner un meme
                    </Button>
                    <label htmlFor="local-meme" className="import-image-label button button-big button-select-gallery">
                      <span>Importer un meme</span>
                      <input
                        type="file"
                        ref={inputDrop}
                        onChange={(): any => handleImportImage()}
                        className="import-image-label-input"
                        accept="image/png, image/jpeg"
                        id="local-meme"
                      />
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
          <aside className="studio-aside">
            <header className="studio-aside-header">
              <Button
                className={`studio-aside-header-btn ${currentTab === TAB_GALLERY ? 'studio-aside-header-btn-active' : null}`}
                onClick={(): void => setCurrentTab(TAB_GALLERY)}
                id="tab-gallery-btn"
              >
                <FontAwesomeIcon className="icon-image" icon={['fas', 'image']} />
              </Button>
              <Button
                className={`studio-aside-header-btn ${
                  currentTab === TAB_CUSTOMIZATION ? 'studio-aside-header-btn-active' : null
                }`}
                onClick={(): void => setCurrentTab(TAB_CUSTOMIZATION)}
                id="tab-customization-btn"
              >
                <FontAwesomeIcon className="icon-heading" icon={['fas', 'heading']} />
              </Button>
            </header>
            <div className="studio-aside-content">
              <Tab active={currentTab === TAB_GALLERY} id="gallery-tab" onCloseModal={closeTabModal}>
                <Gallery onSelectMeme={handleChooseMeme} />
              </Tab>
              <Tab active={currentTab === TAB_CUSTOMIZATION} id="customization-tab" onCloseModal={closeTabModal}>
                <Customization />
              </Tab>
            </div>
          </aside>
        </div>
      </div>
      {isLoading && <Modal isLoading={isLoading} />}
    </>
  )
}

export default Studio
