import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { FormEvent } from 'react';

export default async function ProjectPage( { params }: { params: { id: string }}) {
    const projectID = params.id;

    let project = {
        title: '',
        link: '',
        description: ''
    }

    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    let isOwnProject = true;

    if(projectID != 'new') {
        const { data } = await supabase.from('projects').select().eq('id', projectID).single();
        if(data.user_id == user?.id) {
            console.log('is own project')
            isOwnProject = true;
            project = data;
        } else {
            isOwnProject = false;
        }

    }

    const handleSubmit = async (formData: FormData) => {
        "use server"

        const supabase = createClient();

        console.log(formData.get('title'))

        if(projectID == 'new') {
            const res = await supabase
                .from('projects')
                .insert({
                    title: formData.get('title'),
                    link: formData.get('link'),
                    description: formData.get('description')
                })
                .select()
            console.log(res);
            const newlyCreatedProjectID = res.data![0].id;
            redirect('/project/' + newlyCreatedProjectID);
        } else {
            const res = await supabase
                .from('projects')
                .update({
                    title: formData.get('title'),
                    link: formData.get('link'),
                    description: formData.get('description')
                })
                .eq('id', projectID)
                .select();

            console.log('updated');
            console.log(res);

            redirect('/project/' + projectID)
        }
    }
    return(
        <div className='w-full'>
            { isOwnProject ? 
                <>
                    <h1 className='text-2xl mb-4'>{projectID == 'new' ? 'Create new' : 'Edit'} project</h1>
                    <form action={handleSubmit} className='flex flex-col'>
                        <label>Title</label>
                        <input name='title' id='title' defaultValue={project.title}></input>
                        <label>Link</label>
                        <input name='link' id='link' defaultValue={project.link}></input>
                        <label>Description</label>
                        <textarea name='description' id='description' rows={8} defaultValue={project.description}></textarea>
                        <button className='bg-blue-400 hover:bg-blue-500 w-fit px-6 py-2 rounded-md mt-2 ml-auto'>Save</button>
                    </form>
                </>
                
            : <h1>You do not have access to this project</h1>}
            
        </div>
    )
}