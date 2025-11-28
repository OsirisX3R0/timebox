import { useRef } from "react"
import { useLiveQuery } from "dexie-react-hooks"
import NewTimer from "./NewTimer"
import db from "../../db"
import Timer from './Timer'

const Timers = () => {
  const timers = useLiveQuery(() => db.timers.toArray(), [], [])
  const dialog = useRef<HTMLDialogElement>(null)

  return (
    <>
      <h3>Timers</h3>

      {timers.map(timer => <Timer key={timer.id} timer={timer} />)}

      <button className="fab" onClick={() => dialog.current?.showModal()}>+</button>

      <dialog ref={dialog}>
        <NewTimer close={() => dialog.current?.close()} />
      </dialog>
    </>
  )
}

export default Timers