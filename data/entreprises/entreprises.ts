import { db } from "@/lib/db";

export const getEntrepriseById = async (id: string) => {
  try {
    const result = await db.entreprises.findUnique({ where: { id } });
    return result;
  } catch {
    return null;
  }
};

export const getEntrepriseByUserId = async (userId: string) => {
  try {
    const result = await db.userEntreprise.findMany({
      where: {
        userId: userId,
      },
      include: {
        entreprise: true,
      },
    });

    const entreprises = result.map((userEntreprise) => userEntreprise.entreprise);
    return entreprises;
  } catch {
    return null;
  }
};
