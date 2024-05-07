import { Metadata } from "next";

import ListeEntreprise from "../_components/entreprises/liste-entreprise";
import { ProjectManager } from "../_components/global/project-manager";
import { getProjectById } from "@/data/projects/projects";
import { currentUser } from "@/lib/auth";
import { getEntrepriseAndDetailByUserId, getEntrepriseByUserId } from "@/data/entreprises/entreprises";
import UpdateDetailEntreprise from "../_components/materialite/update-detail-entreprise";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Matérialié",
  description: "Matérialié - CSRD AI",
};

export default async function MaterialitePage() {
  // recuperation de l'utilisateur
  const user = await currentUser();
  const idProjet = user?.idProject;
  const projet = await getProjectById(idProjet);

  // Recuperation des entreprises :
  const checkEntreprise = await getEntrepriseAndDetailByUserId(user.id);

  const entrepriseToComplete = checkEntreprise.filter((item) => {
    return !item.details || item.details.length === 0 || !item.details.some((detail) => detail.projetId === idProjet);
  });

  if (entrepriseToComplete.length > 0) {
    return (
      <>
        <h1 className='text-center text-2xl my-10 font-semibold'>
          Avant de commencer votre matrice de double matérialité <br />
          veuillez remplir les informations suivantes pour l&apos;année fiscale {projet?.annee}
        </h1>
        <div className='w-11/12 mx-auto grid grid-cols-2 gap-3 gap-y-6'>
          {entrepriseToComplete.map((item) => {
            return <UpdateDetailEntreprise key={item.id} data={item} />;
          })}
        </div>
      </>
    );
  }

  return (
    <div className='flex-col md:flex'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-3xl font-bold tracking-tight'>Matrice de double matérialité</h2>
          <div className='flex items-center space-x-2'>
            <ProjectManager />
          </div>
        </div>
        <Tabs defaultValue='entreprises' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='chaine_de_valeurs'>Chaine de valeurs</TabsTrigger>
            <TabsTrigger value='parties_prenantes'>Parties prenantes</TabsTrigger>
            <TabsTrigger value='double_materialite'>Double matérialité</TabsTrigger>

            <TabsTrigger value='raports' disabled>
              Rapport
            </TabsTrigger>
            <TabsTrigger value='notifications' disabled>
              Notifications
            </TabsTrigger>
            <TabsTrigger value='equipes'>Pilotage</TabsTrigger>
          </TabsList>
          <TabsContent value='chaine_de_valeurs' className='space-y-4'>
            <div className='grid gap-4 grid-cols-3'>
              <div>
                <h1>Amont</h1>
              </div>
              <div>
                <h1>Interne</h1>
              </div>
              <div>
                <h1>Aval</h1>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='parties_prenantes' className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'></div>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'></div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
