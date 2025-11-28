import Dexie, { type EntityTable } from "dexie";
import type { Timer } from "./types";

const db = new Dexie('TimeBox') as Dexie & {
  timers: EntityTable<Timer, 'id'>
}

db.version(1).stores({
  timers: '++id, label, duration, running'
})

export default db