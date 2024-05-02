import * as z from "zod";
import { EntrepriseType, UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const EntrepriseAddSchema = z.object({
  name: z.string().min(1, { message: "Veuillez indiquer le nom de l'entreprise" }),
  type: z.enum([EntrepriseType?.SIEGE, EntrepriseType?.FILLIALE]),
  statut: z.string().min(1, { message: "Veuillez indiquer le statut juridique de l'entreprise" }),
  pays: z.string().min(1, { message: "Veuillez indiquer le pays de l'entreprise" }),
  nbEmployes: z.number({
    required_error: "Veuillez indiquer le nombre d'employés",
    invalid_type_error: "Veuillez indiquer le nombre d'employés",
  }),
  secteur: z.number({
    required_error: "Veuillez indiquer le secteur d'activité de l'entreprise",
    invalid_type_error: "Veuillez indiquer le secteur d'activité de l'entreprise",
  }),

  //secteur: z.string().min(1, { message: "Veuillez indiquer le secteur d'activité de l'entreprise" }),
});

export const ProjetAddSchema = z.object({
  // valider un champ année sur 4 chiffres
  annee: z.string().min(4, { message: "Veuillez indiquer l'année fiscale sur 4 chiffres" }),
});
