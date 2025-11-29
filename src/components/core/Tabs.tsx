import { Activity, Children, useState, type ReactNode } from "react"

type BaseProps = {
  children: ReactNode
}

type TabsProps = BaseProps & {
  selected: string
}

type TabProps = BaseProps & {
  value: string
}

export const Tabs = ({ selected, children }: TabsProps) => {
  const [selectedTab, useSelectedTab] = useState('timers')

  return (
    <footer>
      {Children.map(children, (child) => (
        <Activity mode="selecte">
          {child}
        </Activity>
      ))}
    </footer>
  )
}

export const Tab = ({ value, children }: TabProps) => {
  return (
    <div className="item">
      {children}
    </div>
  )
}

// export default Tabs