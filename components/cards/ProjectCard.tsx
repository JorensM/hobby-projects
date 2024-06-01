// Core
import Link from 'next/link';

// Types
import { Project } from '@/types/Project'

// Components
import CardTitle from '../typography/CardTitle'

type ProjectCardProps = {
    item: Project
}

export default function ProjectCard( { item }: ProjectCardProps) {

    const excerpt = item.description.slice(0, 100);

    return (
        <div className='flex flex-col p-4 border border-solid border-gray-500 rounded-lg shadow-md gap-4'>
            <CardTitle>{item.title}</CardTitle>
            {excerpt}
            <ul className='flex gap-4'>
                <li>
                    <Link href='#'>Visit</Link>
                </li>
                <li>
                    <Link href='#'>Edit</Link>
                </li>
            </ul>
        </div>
    );
}