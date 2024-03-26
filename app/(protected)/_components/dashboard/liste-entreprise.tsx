// On utilise "import React" car on va retourner du JSX
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getEntrepriseByUserId } from "@/data/entreprises/entreprises";
import { currentUser } from "@/lib/auth";
import { FaBriefcase, FaPlusCircle } from "react-icons/fa";
import AddEntreprise from "./add-entreprise";

const ListeEntreprise = async () => {
  const user = await currentUser();
  const entreprises = await getEntrepriseByUserId(user?.id);

  // Vous devez retourner du JSX. Pour cela, englobez votre map dans des parenthèses et ajoutez un fragment ou une div autour
  return (
    <>
      {entreprises?.map((item) => (
        <Card key={item.id}>
          {/* Ajoutez un attribut key pour chaque enfant dans une liste */}
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{item.name || "SAS - France"}</CardTitle> {/* Dynamisez le titre */}
            <FaBriefcase className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{item.type || "Filliale XXX"}</div> {/* Dynamisez le type */}
            <p className='text-xs text-muted-foreground'>{item.nbEmployes || "45"} employés</p> {/* Dynamisez le nombre d'employés */}
          </CardContent>
        </Card>
      ))}
      {/* Ajoutez une nouvelle Card à la fin pour créer une entreprise */}
      <AddEntreprise />
    </>
  );
};
export default ListeEntreprise;
