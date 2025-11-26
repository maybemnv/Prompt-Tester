export default function LoadingScanner() {
  return (
    <div className="mt-12 flex flex-col items-center justify-center py-16">
      <div className="relative w-24 h-24 mb-6">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
        
        {/* Spinning ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        
        {/* Inner pulse */}
        <div className="absolute inset-3 bg-blue-500/20 rounded-full animate-pulse"></div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">
          Generating Attack Variations
        </h3>
        <p className="text-slate-400 text-sm">
          Creating jailbreaks, adversarial mutations, and edge cases...
        </p>
      </div>
      
      {/* Progress indicators */}
      <div className="mt-8 flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  )
}
