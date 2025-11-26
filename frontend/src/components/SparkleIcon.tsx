interface SparkleIconProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
  animate?: boolean
}

export default function SparkleIcon({ 
  size = 'md', 
  color = '#e85d3c',
  className = '',
  animate = false
}: SparkleIconProps) {
  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 60
  }
  
  const dimension = sizeMap[size]
  
  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animate ? 'animate-sparkle' : ''}`}
      style={{ display: 'inline-block' }}
    >
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        fill={color}
      />
      <path
        d="M19 4L19.5 6.5L22 7L19.5 7.5L19 10L18.5 7.5L16 7L18.5 6.5L19 4Z"
        fill={color}
        opacity="0.6"
      />
      <path
        d="M7 15L7.5 17L9 17.5L7.5 18L7 20L6.5 18L5 17.5L6.5 17L7 15Z"
        fill={color}
        opacity="0.6"
      />
    </svg>
  )
}
