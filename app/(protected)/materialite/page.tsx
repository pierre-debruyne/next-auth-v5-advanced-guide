import { Metadata } from "next";

import ListeEntreprise from "../_components/entreprises/liste-entreprise";
import AddProjet from "../_components/dashboard/add-projet";
import { ProjectManager } from "../_components/global/project-manager";
import { getProjectsByUserId } from "@/data/projects/projects";
import { currentUser } from "@/lib/auth";
import { getEntrepriseByUserId } from "@/data/entreprises/entreprises";

export const metadata: Metadata = {
  title: "Entreprises",
  description: "Entreprises - CSRD AI",
};

export default async function DashboardPage() {
  // recuperation de l'utilisateur
  const user = await currentUser();

  // Verification qu'un projet est en cours
  const checkProjet = await getProjectsByUserId(user.id);
  if (!checkProjet || checkProjet.length === 0) {
    return <AddProjet />;
  }
  const entreprises = await getEntrepriseByUserId(user?.id);

  return (
    <>
      <div className='flex flex-col md:flex'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
          <div className='flex items-center justify-between space-y-2'>
            <h2 className='text-3xl font-bold tracking-tight'>Entreprises</h2>
            <div className='flex items-center space-x-2'>
              <ProjectManager />
            </div>
          </div>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <ListeEntreprise entreprises={entreprises} />
          </div>
        </div>
      </div>
    </>
  );
}
