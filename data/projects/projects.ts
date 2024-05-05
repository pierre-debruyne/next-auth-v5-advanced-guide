import { db } from "@/lib/db";

export const getProjectById = async (id: string) => {
  try {
    const result = await db.projet.findUnique({ where: { id } });

    return result;
  } catch {
    return null;
  }
};

export const getProjectsByUserId = async (userId: string) => {
  try {
    const userWithProjects = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        projets: true,
      },
    });
    return userWithProjects.projets;
  } catch {
    return null;
  }
};
