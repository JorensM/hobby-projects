// Util
import { createClient } from './server';

// Types
import { Project } from '@/types/Project';

export default async function fetchUsersProjects(user_id: string): Promise<Project[]> {
    const supabase = createClient();

    const { data: projects } = await supabase.from('projects')
        .select()
        .eq('user_id', user_id)

    return projects;
}