import Icon from '@ant-design/icons'
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon'

import React from 'react'

export type IconProps = Pick<IconComponentProps, "max" | "required" | "type" | "data" | "default" | "high" | "low" | "key" | "id" | "media" | "height" | "width" | "start" | "open" | "name" | "color" | "content" | "rotate" | "translate" | "value" | "hidden" | "cite" | "dir" | "form" | "label" | "slot" | "span" | "style" | "summary" | "title" | "pattern" | "acceptCharset" | "action" | "method" | "noValidate" | "target" | "accessKey" | "draggable" | "lang" | "className" | "prefix" | "ariaLabel" | "children" | "contentEditable" | "inputMode" | "nonce" | "tabIndex" | "async" | "disabled" | "multiple" | "size" | "manifest" | "wrap" | "src" | "accept" | "allowFullScreen" | "allowTransparency" | "alt" | "as" | "autoComplete" | "autoFocus" | "autoPlay" | "capture" | "cellPadding" | "cellSpacing" | "charSet" | "challenge" | "checked" | "classID" | "cols" | "colSpan" | "controls" | "coords" | "crossOrigin" | "dateTime" | "defer" | "download" | "encType" | "formAction" | "formEncType" | "formMethod" | "formNoValidate" | "formTarget" | "frameBorder" | "headers" | "href" | "hrefLang" | "htmlFor" | "httpEquiv" | "integrity" | "keyParams" | "keyType" | "kind" | "list" | "loop" | "marginHeight" | "marginWidth" | "maxLength" | "mediaGroup" | "min" | "minLength" | "muted" | "optimum" | "defaultChecked" | "defaultValue" | "suppressContentEditableWarning" | "suppressHydrationWarning" | "contextMenu" | "placeholder" | "spellCheck" | "radioGroup" | "role" | "about" | "datatype" | "inlist" | "property" | "resource" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "is" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "viewBox" | "playsInline" | "poster" | "preload" | "readOnly" | "rel" | "reversed" | "rows" | "rowSpan" | "sandbox" | "scope" | "scoped" | "scrolling" | "seamless" | "selected" | "shape" | "sizes" | "srcDoc" | "srcLang" | "srcSet" | "step" | "useMap" | "wmode" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture" | "spin" | "component"> & React.RefAttributes<HTMLSpanElement>

const ShuffleSvg = () => (
    <svg fill='currentColor' baseProfile="tiny" height="1em" id="Layer_1" version="1.2" viewBox="0 0 24 25" width="1em" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><path d="M4,9h3.5c0.736,0,1.393,0.391,1.851,1.001c0.325-0.604,0.729-1.163,1.191-1.662C9.739,7.516,8.676,7,7.5,7H4   C3.447,7,3,7.448,3,8S3.447,9,4,9z"/><path d="M11.685,12.111C12.236,10.454,13.941,9,15.334,9h1.838l-1.293,1.293c-0.391,0.391-0.391,1.023,0,1.414   C16.074,11.902,16.33,12,16.586,12s0.512-0.098,0.707-0.293L21,8l-3.707-3.707c-0.391-0.391-1.023-0.391-1.414,0   s-0.391,1.023,0,1.414L17.172,7h-1.838c-2.274,0-4.711,1.967-5.547,4.479l-0.472,1.411C8.674,14.816,7.243,16,6.5,16H4   c-0.553,0-1,0.448-1,1s0.447,1,1,1h2.5c1.837,0,3.863-1.925,4.713-4.479L11.685,12.111z"/><path d="M15.879,13.293c-0.391,0.391-0.391,1.023,0,1.414L17.172,16h-2.338c-1.268,0-2.33-0.891-2.691-2.108   c-0.256,0.75-0.627,1.499-1.09,2.185C11.939,17.239,13.296,18,14.834,18h2.338l-1.293,1.293c-0.391,0.391-0.391,1.023,0,1.414   C16.074,20.902,16.33,21,16.586,21s0.512-0.098,0.707-0.293L21,17l-3.707-3.707C16.902,12.902,16.27,12.902,15.879,13.293z"/></g></svg>
)

export const ShuffleIcon:React.FC<IconProps> = (props) => {
  return (
    <Icon component={ShuffleSvg} {...props}/>
  )
}

const VolumeHighSvg = () => (
  <svg width="1.1em" height="1em" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.7643 0.281102L3.87097 5.35061V11.8114L10.7822 16.7319C11.7314 17.4077 13.0466 16.7281 13.0466 15.5617V1.43831C13.0466 0.261854 11.7112 -0.415256 10.7643 0.281102Z" fill="currentColor"/>
    <path d="M1.43369 5.35061C0.641886 5.35061 0 5.99342 0 6.78635V10.2321C0 11.0251 0.641886 11.6679 1.43369 11.6679H2.29391V5.35061H1.43369Z" fill="currentColor"/>
    <path d="M16.9176 8.58103C16.9176 9.88937 15.8585 10.95 14.552 10.95C14.552 10.95 14.552 9.88937 14.552 8.58103C14.552 7.27268 14.552 6.21206 14.552 6.21206C15.8585 6.21206 16.9176 7.27268 16.9176 8.58103Z" fill="currentColor"/>
    <path d="M14.6237 4.99168C16.5636 4.99168 18.1362 6.56654 18.1362 8.50924C18.1362 10.4519 16.5636 12.0268 14.6237 12.0268V13.8933C17.5929 13.8933 20 11.4828 20 8.50924C20 5.53573 17.5929 3.12522 14.6237 3.12522V4.99168Z" fill="currentColor"/>
  </svg>
)

export const VolumeHighIcon:React.FC<IconProps> = (props) => {
  return (
    <Icon component={VolumeHighSvg} {...props}/>
  )
}

const VolumeMediumSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.88982 5.36901L10.8167 0.282067C11.7682 -0.416684 13.1101 0.262757 13.1101 1.44326V15.6152C13.1101 16.7856 11.7885 17.4675 10.8347 16.7894L3.88982 11.852V5.36901Z" fill="currentColor"/>
    <path d="M0 6.80969C0 6.01403 0.645015 5.36901 1.44067 5.36901H2.30508V11.708H1.44067C0.645015 11.708 0 11.063 0 10.2673V6.80969Z" fill="currentColor"/>
    <path d="M14.6229 10.9876C15.9357 10.9876 17 9.92337 17 8.61053C17 7.29769 15.9357 6.23342 14.6229 6.23342V10.9876Z" fill="currentColor"/>
  </svg>
)

export const VolumeMediumIcon:React.FC<IconProps> = (props) => {
  return (
    <Icon component={VolumeMediumSvg} {...props}/>
  )
}

const VolumeLowSvg = () => (
  <svg width=".76em" height="1em" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.86916 5.35061L10.7593 0.281102C11.7057 -0.415256 13.0405 0.261853 13.0405 1.43831V15.5617C13.0405 16.7281 11.7259 17.4077 10.7771 16.7319L3.86916 11.8114V5.35061Z" fill="currentColor"/>
    <path d="M0 6.78635C0 5.99342 0.641586 5.35061 1.43302 5.35061H2.29283V11.6679H1.43302C0.641586 11.6679 0 11.0251 0 10.2321V6.78635Z" fill="currentColor"/>
  </svg>
)

export const VolumeLowIcon:React.FC<IconProps> = (props) => {
  return (
    <Icon component={VolumeLowSvg} {...props}/>
  )
}

const VolumeMuteSvg = () => (
  <svg width="1.15em" height="1em" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.7379 0.2811L3.86148 5.35062V11.8114L10.7558 16.7319C11.7027 17.4077 13.0146 16.7281 13.0146 15.5617V1.43831C13.0146 0.261857 11.6825 -0.415256 10.7379 0.2811Z" fill="currentColor"/>
    <path d="M1.43018 5.35062C0.640316 5.35062 0 5.99342 0 6.78635V10.2321C0 11.0251 0.640316 11.6679 1.43018 11.6679H2.28829V5.35062H1.43018Z" fill="currentColor"/>
    <path d="M18.2027 5.75546C18.7053 5.25084 19.5203 5.25084 20.023 5.75546C20.5257 6.26008 20.5257 7.07823 20.023 7.58286L19.1128 8.49655L19.9578 9.34481C20.4605 9.84944 20.4605 10.6676 19.9578 11.1722C19.4551 11.6768 18.6402 11.6768 18.1375 11.1722L17.2925 10.3239L16.3824 11.2377C15.8797 11.7423 15.0647 11.7423 14.562 11.2377C14.0594 10.733 14.0594 9.91488 14.562 9.41026L15.4722 8.49655L14.4969 7.51741C13.9942 7.01279 13.9942 6.19464 14.4969 5.69002C14.9995 5.1854 15.8145 5.1854 16.3172 5.69002L17.2925 6.66915L18.2027 5.75546Z" fill="currentColor"/>
  </svg>
)

export const VolumeMuteIcon:React.FC<IconProps> = (props) => {
  return (
    <Icon component={VolumeMuteSvg} {...props}/>
  )
}

const PrevArrowSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 6.5L16.75 0.870839L16.75 12.1292L7 6.5Z" fill="currentColor"/>
    <path d="M0 6.5L9.75 0.870838L9.75 12.1292L0 6.5Z" fill="currentColor"/>
  </svg>
)

export const PrevArrowIcon:React.FC<IconProps> = (props) => {
  return (
    <Icon component={PrevArrowSvg} {...props}/>
  )
}

const NextArrowSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6.5L0.25 12.1292L0.25 0.870834L10 6.5Z" fill="currentColor"/>
    <path d="M17 6.5L7.25 12.1292L7.25 0.870834L17 6.5Z" fill="currentColor"/>
  </svg>
)

export const NextArrowIcon:React.FC<IconProps> = (props) => {
  return (
    <Icon component={NextArrowSvg} {...props}/>
  )
}

const PlaySvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5L0.5 9.33013L0.5 0.669872L8 5Z" fill="currentColor"/>
  </svg>
)

export const PlayIcon:React.FC<IconProps> = (props) => {
  return (
    <Icon component={PlaySvg} {...props}/>
  )
}

const PauseSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H3V10H0V0Z" fill="currentColor"/>
    <path d="M5 0H8V10H5V0Z" fill="currentColor"/>
  </svg>
)

export const PauseIcon:React.FC<IconProps> = (props) => {
  return (
    <Icon component={PauseSvg} {...props}/>
  )
}