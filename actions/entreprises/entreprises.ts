"use server";
import { unstable_update } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { EntrepriseAddFirstSchema, EntrepriseAddSchema } from "@/schemas";
import * as z from "zod";

export const addFirstEntreprise = async (values: z.infer<typeof EntrepriseAddFirstSchema>) => {
  const user = await currentUser();
  const validatedFields = EntrepriseAddFirstSchema.safeParse(values);

  if (!user) {
    return { error: "User not found!" };
  }

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const userExists = await db.user.findUnique({
    where: { id: user.id },
  });

  if (!userExists) {
    return { error: "User not found in database!" };
  }

  try {
    const { name, type, statut, pays, secteur, chiffreAff, nbEmployes, benefice, principale } = validatedFields.data;
    let newEntreprise = await db.entreprises.create({
      data: {
        name: name,
        type: type,
        statut: statut,
        pays: pays,
        secteur: secteur,
        principale: principale ? true : false,
        adresse: "",
      },
    });

    if (newEntreprise) {
      await db.userEntreprise.create({
        data: {
          userId: user.id,
          entrepriseId: newEntreprise.id,
        },
      });

      // ajout du détail de l'entreprise
      await db.entrepriseDetails.create({
        data: {
          entrepriseId: newEntreprise.id,
          chiffreAff: chiffreAff,
          nbEmployes: nbEmployes,
          benefice: benefice,
          projetId: user.idProject,
        },
      });
    } else {
      return { error: "Erreur lors de la création de l'entreprise" };
    }

    return { success: "Entreprise créée, veuillez patienter..." };
  } catch (error) {
    console.log(error);
    return { error: "Erreur lors de la création de l'entreprise" };
  }
};

export const addEntreprise = async (values: z.infer<typeof EntrepriseAddSchema>) => {
  const user = await currentUser();
  const validatedFields = EntrepriseAddSchema.safeParse(values);

  if (!user) {
    return { error: "User not found!" };
  }

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const userExists = await db.user.findUnique({
    where: { id: user.id },
  });

  if (!userExists) {
    return { error: "User not found in database!" };
  }

  try {
    const { name, type, statut, pays, secteur, principale } = validatedFields.data;
    let newEntreprise = await db.entreprises.create({
      data: {
        name: name,
        type: type,
        statut: statut,
        pays: pays,
        secteur: secteur,
        principale: principale ? true : false,
        adresse: "",
      },
    });

    if (newEntreprise) {
      await db.userEntreprise.create({
        data: {
          userId: user.id,
          entrepriseId: newEntreprise.id,
        },
      });
    } else {
      return { error: "Erreur lors de la création de l'entreprise" };
    }

    return { success: "Entreprise créée, veuillez patienter..." };
  } catch (error) {
    console.log(error);
    return { error: "Erreur lors de la création de l'entreprise" };
  }
};
