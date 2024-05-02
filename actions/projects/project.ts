"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProjetAddSchema } from "@/schemas";
import * as z from "zod";

/* TO DO */

export const getAllProjects = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const projects = await db.projet.findMany({
    where: {
      users: {
        some: {
          id: user.id,
        },
      },
    },
  });

  return projects;
};

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
    const { annee } = validatedFields.data;
    await db.projet.create({
      data: {
        annee: annee,
        users: {
          connect: [{ id: user.id }],
        },
      },
    });
    return { success: "Projet créé, veuillez patienter..." };
  } catch (error) {
    console.error("Erreur lors de la création du projet", error);
    return { error: "Erreur lors de la création du projet" };
  }
};
