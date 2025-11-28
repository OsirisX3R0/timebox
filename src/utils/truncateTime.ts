const truncateTime = <T>(segs: T[], skipCond: (seg: T) => boolean): T[] => {
  let remove = true

  return segs.reduce((sgs, seg, i) => {
      if (!skipCond(seg) || i === segs.length - 1) remove = false
      if (!remove) sgs.push(seg)

      return sgs
    }, [] as T[])
}

export default truncateTime