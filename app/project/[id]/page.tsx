import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { FormEvent } from 'react';

export default async function ProjectPage( { params }: { params: { id: string }}) {
    const projectID = parseInt(params.id);

    const supabase = createClient();

    const { data: project } = await supabase
        .from('projects')
        .select()
        .eq('id', projectID)
        .single();

    const { data: { user } } = await supabase.auth.getUser();

    const isOwnProject =  project.user_id == user?.id
    console.log(project);
    return(
        <div className='w-full'>
            <h1 className='text-2xl'>{project.title}</h1>
            <Link href={project.link} className='text-blue-400'>{project.link}</Link>
            <p className='mt-4'>
                {project.description}
            </p>
            {
                isOwnProject ? 
                <Link href={'/protected/project/' + projectID} className='text-blue-400 mt-8'>Edit</Link>
                : null
            }
        </div>
    )
}