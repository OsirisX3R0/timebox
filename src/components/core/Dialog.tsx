import { useEffect, useImperativeHandle, useRef, type ReactNode, type Ref } from "react"

type Props = {
  // open?: boolean
  children: ReactNode
  ref?: Ref<DialogHandle>
}

export interface DialogHandle { 
  open(): void 
  close(): void 
}

const Dialog = ({ ref, children }: Props) => {
  const dialog = useRef<HTMLDialogElement>(null)
  useImperativeHandle(ref, () => ({
    open() {
      dialog.current?.showModal()
    },
    close() {
      dialog.current?.close()
    }
  }))

  // useEffect(() => {
  //   if (dialog.current) {
  //     if (open) dialog.current.showModal()
  //     else dialog.current.close()
  //   }
  // }, [open])

  return (
    <dialog ref={dialog}>
      {children}
    </dialog>
  )
}

export default Dialog