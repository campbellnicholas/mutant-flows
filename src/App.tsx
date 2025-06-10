import { useState, useEffect } from 'react'
import SkillRoller from './components/SkillRoller'
import RotRoller from './components/RotRoller'
import TabNavigation from './components/TabNavigation'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'skills' | 'rot'>('skills')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="app">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="roller-container">
        {activeTab === 'skills' ? <SkillRoller /> : <RotRoller />}
      </div>
    </div>
  )
}

export default App
