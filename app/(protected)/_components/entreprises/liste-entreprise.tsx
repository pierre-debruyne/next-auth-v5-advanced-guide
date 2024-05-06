"use client";
// On utilise "import React" car on va retourner du JSX
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaRegStar, FaStar } from "react-icons/fa";
import AddEntreprise from "./add-entreprise";
import { entrepriseType, entrepriseTypeJuridique } from "@/constant/liste-short";
import { countryList } from "@/constant/liste-pays";
import UpdateEntreprise from "./update-entreprise";

const getLabelByValue = (data, value) => {
  return data.find((type) => type.value === value)?.label || "Non trouvé";
};

const ListeEntreprise = ({ entreprises }) => {
  const [dataEntreprise, setDataEntreprise] = useState(null);

  const handleClick = (item) => {
    setDataEntreprise(item);
  };

  return (
    <>
      {/* Ajoutez une nouvelle Card à la fin pour créer une entreprise */}
      <AddEntreprise />
      <UpdateEntreprise dataEntreprise={dataEntreprise} setDataEntreprise={setDataEntreprise} />

      {entreprises?.map((item) => (
        <Card key={item.id} className={`cursor-pointer border ${item.principale ? "border-green-300" : "border-transparent"}`} onClick={() => handleClick(item)}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium uppercase'>
              {getLabelByValue(entrepriseType, item.type)} - {countryList[item.pays]}
            </CardTitle>
            {item?.principale && <FaStar className='h-4 w-4 text-green-500' />}
            {!item?.principale && <FaRegStar className='h-4 w-4 text-gray-500' />}
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{item.name || "Filliale XXX"}</div>
            <p className='text-xs text-muted-foreground'>{getLabelByValue(entrepriseTypeJuridique, item.statut)}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
export default ListeEntreprise;
