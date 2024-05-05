"use server";

import { unstable_update } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProjetAddSchema, ProjetChangeSchema } from "@/schemas";
import * as z from "zod";

export const addProjet = async (values: z.infer<typeof ProjetAddSchema>) => {
  const user = await currentUser();
  const validatedFields = ProjetAddSchema.safeParse(values);

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
    const { annee, debut, fin } = validatedFields.data;
    let returnData = await db.projet.create({
      data: {
        annee: annee,
        debut: debut,
        fin: fin,
        users: {
          connect: [{ id: user.id }],
        },
      },
    });

    // save id projet in session
    unstable_update({
      user: {
        ...user,
        idProject: returnData.id,
      },
    });

    // save id projet in user db
    await db.user.update({
      where: { id: user.id },
      data: {
        idProject: returnData.id,
      },
    });

    return { success: "Projet créé, veuillez patienter..." };
  } catch (error) {
    console.log(error);
    return { error: "Erreur lors de la création du projet" };
  }
};

export const changeProjet = async (values: z.infer<typeof ProjetChangeSchema>) => {
  const user = await currentUser();
  const validatedFields = ProjetChangeSchema.safeParse(values);

  if (!user) {
    return { error: "User not found!" };
  }

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  try {
    const { id } = validatedFields.data;
    // save id projet in session
    unstable_update({
      user: {
        ...user,
        idProject: id,
      },
    });

    // save id projet in user db
    await db.user.update({
      where: { id: user.id },
      data: {
        idProject: id,
      },
    });

    return { success: "Année de référence mise à jour !" };
  } catch (error) {
    return { error: "Erreur lors de la création du projet" };
  }
};
