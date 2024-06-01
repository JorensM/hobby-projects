// Types
import { Project } from '@/types/Project'

// Components
import ProjectCard from '../cards/ProjectCard'

type ProjectsListProps = {
    items: Project[]
}

export default function ProjectsList( { items }: ProjectsListProps) {
    return (
        <ul className='flex flex-col gap-2'>
            {items.map(project => <ProjectCard item={project} />)}
        </ul>
    )
}