import { useRef, useState } from "react"
import NewTimer from "./NewTimer"

const Timers = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)

  return (
    <>
      <h3>Timers</h3>

      <button className="fab" onClick={() => dialog.current?.showModal()}>+</button>

      <dialog ref={dialog}>
        <NewTimer close={() => dialog.current?.close()} />
      </dialog>
    </>
  )
}

export default Timers