import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import Link from 'next/link';
import ProjectsList from '@/components/lists/ProjectsList';
import fetchUsersProjects from '@/utils/supabase/fetchUsersProjects';

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const usersProjects = await fetchUsersProjects(user.id);

  return (
    <div className="flex-1 w-full flex flex-col gap-4 items-center">
      <div className='flex-grow w-full max-w-[1000px]'>
          <h2 className='text-4xl mb-4'>Dashboard</h2>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-2 items-center justify-between'>
              <h3 className='text-2xl w-fit'>My projects</h3>
              <Link href='/protected/project/new' className='bg-blue-400 p-2 rounded-md hover:bg-blue-500'>Create project</Link>
            </div>
            <ProjectsList
              items={usersProjects}
            />
          </div>
      </div>
    </div>
  );
}
