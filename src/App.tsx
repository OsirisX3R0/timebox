import { Activity, useState } from 'react'
import Timers from './components/timers/Timers'
import Stopwatch from './components/stopwatch/Stopwatch'

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [tabs] = useState(['timers', 'stopwatch'])
  const [selectedTab, setSelectedTab] = useState('timers')

  const isSelected = (value: string) => selectedTab === value ? 'visible' : 'hidden'

  return (
    <>
      <main>
        <Activity mode={isSelected('timers')}>
          <Timers />
        </Activity>
        <Activity mode={isSelected('stopwatch')}>
          <Stopwatch />
        </Activity>
      </main>
      <footer>
        {tabs.map(tab => <a onClick={() => setSelectedTab(tab)}>{tab.charAt(0).toUpperCase() + tab.substring(1)}</a>)}
      </footer>
    </>
  )
}

export default App
