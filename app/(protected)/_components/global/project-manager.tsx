import { getProjectsByUserId } from "@/data/projects/projects";
import { currentUser } from "@/lib/auth";
import { ProjectSelect } from "./project-select";
import Loading from "./loading";
import { Suspense } from "react";

export const ProjectManager = async () => {
  const user = await currentUser();
  const projects = await getProjectsByUserId(user.id);

  const currentProject = projects.find((project) => project.id === user.idProject);

  return (
    <Suspense fallback={<Loading />}>
      <div className='flex flex-col gap-1'>{currentProject && user && <ProjectSelect currentProject={currentProject} projects={projects} />}</div>
    </Suspense>
  );
};
