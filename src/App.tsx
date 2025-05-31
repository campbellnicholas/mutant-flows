import { useState } from 'react'
import SkillRoller from './components/SkillRoller'
import RotRoller from './components/RotRoller'
import TabNavigation from './components/TabNavigation'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'skills' | 'rot'>('skills')

  return (
    <div className="app">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="roller-container">
        {activeTab === 'skills' ? <SkillRoller /> : <RotRoller />}
      </div>
    </div>
  )
}

export default App
