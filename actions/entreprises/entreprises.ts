"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { EntrepriseAddFirstSchema, EntrepriseAddSchema, EntrepriseUpdateDetailSchema } from "@/schemas";
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

export const updateEntreprise = async (values: z.infer<typeof EntrepriseAddSchema>) => {
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
    const { name, type, statut, pays, secteur, principale, id } = validatedFields.data;
    let updatedEntreprise = await db.entreprises.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        type: type,
        statut: statut,
        pays: pays,
        secteur: secteur,
        principale: principale ? true : false,
      },
    });

    return { success: "Entreprise modifiée !" };
  } catch (error) {
    console.log(error);
    return { error: "Erreur lors de la modification de l'entreprise" };
  }
};

export const getEntrepriseById = async (id: string) => {
  try {
    const result = await db.entreprises.findUnique({ where: { id } });
    return result;
  } catch {
    return null;
  }
};

export const updateEntrepriseDetail = async (values: z.infer<typeof EntrepriseUpdateDetailSchema>) => {
  const user = await currentUser();
  const validatedFields = EntrepriseUpdateDetailSchema.safeParse(values);

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
    const { id, chiffreAff, nbEmployes, benefice } = validatedFields.data;

    await db.entrepriseDetails.create({
      data: {
        entrepriseId: id,
        chiffreAff: chiffreAff,
        nbEmployes: nbEmployes,
        benefice: benefice,
        projetId: user.idProject,
      },
    });

    return { success: "Entreprise créée, veuillez patienter..." };
  } catch (error) {
    console.log(error);
    return { error: "Erreur lors de la création de l'entreprise" };
  }
};
