import Dexie, { type EntityTable } from "dexie";
import type { ITimer } from "./types";

const db = new Dexie('TimeBox') as Dexie & {
  timers: EntityTable<ITimer, 'id'>
}

db.version(1).stores({
  timers: '++id, label, duration, running'
})

export default db