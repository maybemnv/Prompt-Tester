import MutationCard from './MutationCard'
import type { Mutation } from '../types'

interface CategorySectionProps {
  title: string
  description: string
  mutations: Mutation[]
}

export default function CategorySection({ title, description, mutations }: CategorySectionProps) {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-1">
          {title} <span className="text-slate-500">({mutations.length})</span>
        </h2>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mutations.map((mutation, index) => (
          <MutationCard key={index} mutation={mutation} />
        ))}
      </div>
    </div>
  )
}
