'use client'

type TabProps = {
  children: React.ReactNode
}

function Tab({ children }: TabProps) {
  return <div className="tab-content-panel">{children}</div>
}

export default Tab
