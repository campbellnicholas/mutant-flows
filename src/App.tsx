import { useState, useEffect } from 'react'
import SkillRoller from './components/SkillRoller'
import RotRoller from './components/RotRoller'
import TabNavigation from './components/TabNavigation'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'skills' | 'rot'>('skills')
  const [theme, setTheme] = useState<'light' | 'dark' | 'dystopian'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = document.documentElement.getAttribute('data-theme');
      return (savedTheme === 'dark' || savedTheme === 'dystopian') ? savedTheme : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => {
      switch (prev) {
        case 'light':
          return 'dark';
        case 'dark':
          return 'dystopian';
        case 'dystopian':
          return 'light';
        default:
          return 'light';
      }
    })
  }

  const getThemeEmoji = () => {
    switch (theme) {
      case 'dark':
        return '🌙';
      case 'dystopian':
        return '🧟';
      default:
        return '☀️';
    }
  }

  return (
    <div className="app">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {getThemeEmoji()}
      </button>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="roller-container">
        {activeTab === 'skills' ? <SkillRoller /> : <RotRoller />}
      </div>
    </div>
  )
}

export default App
