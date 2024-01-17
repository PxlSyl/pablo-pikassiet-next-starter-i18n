import React from 'react'

interface IDynamicIconProps {
  icon: React.ComponentType<{ className?: string }>
}

const DynamicIcon: React.FC<IDynamicIconProps> = ({ icon: Icon, ...props }) => {
  return <Icon {...props} />
}

export default DynamicIcon
