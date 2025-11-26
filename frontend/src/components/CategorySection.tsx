import MutationCard from './MutationCard'
import type { Mutation } from '../types'

interface CategorySectionProps {
  title: string
  description: string
  mutations: Mutation[]
}

export default function CategorySection({ title, description, mutations }: CategorySectionProps) {
  return (
    <div className="mb-10">
      <div className="mb-5">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#1a1a1a' }}>
          {title} <span className="text-muted text-xl">({mutations.length})</span>
        </h2>
        <p className="text-secondary text-sm">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mutations.map((mutation, index) => (
          <MutationCard key={index} mutation={mutation} />
        ))}
      </div>
    </div>
  )
}
