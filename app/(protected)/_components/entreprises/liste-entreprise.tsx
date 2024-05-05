// On utilise "import React" car on va retourner du JSX
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaRegStar, FaStar } from "react-icons/fa";
import AddEntreprise from "./add-entreprise";
import { entrepriseTypeJuridique } from "@/constant/liste-short";
import { countryList } from "@/constant/liste-pays";

const getLabelByValue = (value) => {
  return entrepriseTypeJuridique.find((type) => type.value === value)?.label || "Non trouvé";
};

const ListeEntreprise = async ({ entreprises }) => {
  return (
    <>
      {/* Ajoutez une nouvelle Card à la fin pour créer une entreprise */}
      <AddEntreprise />

      {entreprises?.map((item) => (
        <Card key={item.id} className={`border ${item.principale ? "border-green-300" : "border-transparent"}`}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {item.type} - <span className='uppercase'>{countryList[item.pays]}</span>
            </CardTitle>
            {item?.principale && <FaStar className='h-4 w-4 text-green-500' />}
            {!item?.principale && <FaRegStar className='h-4 w-4 text-gray-500' />}
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{item.name || "Filliale XXX"}</div>
            <p className='text-xs text-muted-foreground'>{getLabelByValue(item.statut)}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
export default ListeEntreprise;
