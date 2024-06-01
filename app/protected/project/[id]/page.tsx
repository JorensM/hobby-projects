// Core
import { redirect } from 'next/navigation';

// Util
import { createClient } from '@/utils/supabase/server';

// Types
import { Project } from '@/types/Project';

export default async function ProjectPage( { params }: { params: { id: string }}) {
    const projectID = params.id;

    let project = null as Project | null;

    let isNewProject = false;
    

    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    let isOwnProject = true;

    

    const fetchProjectIfNotNew = async () => {
        if(projectID != 'new') {
            const { data } = await supabase.from('projects').select().eq('id', projectID).single();
            if(data && data.user_id == user?.id) {
                console.log('is own project')
                isOwnProject = true;
                project = data;
            } else {
                isOwnProject = false;
            }
        } else {
            isNewProject = true;
        }
    }

    console.log('project: ', project);

    await fetchProjectIfNotNew();

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
            { isOwnProject && (project || isNewProject) ? 
                <>
                    <h1 className='text-2xl mb-4'>{projectID == 'new' ? 'Create new' : 'Edit'} project</h1>
                    <form action={handleSubmit} className='flex flex-col'>
                        <label>Title</label>
                        <input name='title' id='title' defaultValue={project?.title || ''}></input>
                        <label>Link</label>
                        <input name='link' id='link' defaultValue={project?.link || ''}></input>
                        <label>Description</label>
                        <textarea name='description' id='description' rows={8} defaultValue={project?.description || ''}></textarea>
                        <button className='bg-blue-400 hover:bg-blue-500 w-fit px-6 py-2 rounded-md mt-2 ml-auto'>Save</button>
                    </form>
                </>
                
            : !project ? <h1>Could not find project</h1> 
            : <h1>You do not have access to this project</h1>}
            
        </div>
    )
}