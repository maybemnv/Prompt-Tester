export default function LoadingScanner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="relative w-20 h-20 mb-4">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 rounded-full" style={{ borderColor: '#e0e0e0' }}></div>
        
        {/* Spinning ring */}
        <div 
          className="absolute inset-0 border-4 border-transparent rounded-full animate-spin" 
          style={{ borderTopColor: '#f4a261' }}
        ></div>
        
        {/* Inner pulse */}
        <div 
          className="absolute inset-3 rounded-full animate-pulse" 
          style={{ backgroundColor: 'rgba(244, 162, 97, 0.2)' }}
        ></div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-1" style={{ color: '#1a1a1a' }}>
          Generating Attack Variations
        </h3>
        <p className="text-secondary text-xs">
          Creating jailbreaks, adversarial mutations, and edge cases...
        </p>
      </div>
      
      {/* Progress indicators */}
      <div className="mt-6 flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ 
              backgroundColor: '#f4a261',
              animationDelay: `${i * 0.2}s` 
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
