// Types for the tab navigation
type Tab = 'skills' | 'rot'

// Props for the TabNavigation component
type TabNavigationProps = {
  onTabChange: (tab: Tab) => void
  activeTab: Tab
}

/**
 * TabNavigation component for switching between different dice rollers
 * @param {TabNavigationProps} props - Component props
 * @param {function} props.onTabChange - Callback when tab changes
 * @param {Tab} props.activeTab - Currently active tab
 */
const TabNavigation = ({ onTabChange, activeTab }: TabNavigationProps) => {
  return (
    <div className="tab-navigation">
      <button
        className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
        onClick={() => onTabChange('skills')}
      >
        Skills Roller
      </button>
      <button
        className={`tab-button ${activeTab === 'rot' ? 'active' : ''}`}
        onClick={() => onTabChange('rot')}
      >
        Rot Roller
      </button>
    </div>
  )
}

export default TabNavigation 