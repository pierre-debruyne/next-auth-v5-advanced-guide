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
  id: z.optional(z.string()),
  name: z.string().min(1, { message: "Veuillez indiquer le nom de l'entreprise" }),
  type: z.enum([EntrepriseType?.SIEGE, EntrepriseType?.FILLIALE, EntrepriseType?.HOLDING, EntrepriseType?.SUCURSALE, EntrepriseType?.AUTRE_SOCIETE]),
  statut: z.string().min(1, { message: "Veuillez indiquer le statut juridique" }),
  pays: z.string().min(1, { message: "Veuillez indiquer le pays" }),
  principale: z.optional(z.number()),
  secteur: z.string(),
});

export const EntrepriseAddFirstSchema = z.object({
  name: z.string().min(1, { message: "Veuillez indiquer le nom de l'entreprise" }),
  type: z.enum([EntrepriseType?.SIEGE, EntrepriseType?.FILLIALE]),
  statut: z.string().min(1, { message: "Veuillez indiquer le statut juridique" }),
  pays: z.string().min(1, { message: "Veuillez indiquer le pays" }),
  principale: z.optional(z.number()),
  nbEmployes: z.preprocess(
    (a) => Number(a),
    z.number({
      required_error: "Veuillez indiquer le nombre de salariés ETP",
      invalid_type_error: "Veuillez indiquer le nombre de salariés ETP",
    })
  ),
  chiffreAff: z.preprocess(
    (a) => Number(a),
    z.number({
      required_error: "Veuillez indiquer le chiffre d'affaire",
      invalid_type_error: "Veuillez indiquer le chiffre d'affaire",
    })
  ),
  benefice: z.preprocess(
    (a) => Number(a),
    z.number({
      required_error: "Veuillez indiquer le bénéfice",
      invalid_type_error: "Veuillez indiquer le bénéfice",
    })
  ),
  secteur: z.string(),
});

export const EntrepriseUpdateDetailSchema = z.object({
  id: z.string(),
  nbEmployes: z.preprocess(
    (a) => Number(a),
    z
      .number({
        required_error: "Veuillez indiquer le nombre de salariés ETP",
        invalid_type_error: "Veuillez indiquer le nombre de salariés ETP",
      })
      .min(1, { message: "Veuillez indiquer le nombre de salariés ETP" })
  ),
  chiffreAff: z.preprocess(
    (a) => Number(a),
    z
      .number({
        required_error: "Veuillez indiquer le chiffre d'affaire",
        invalid_type_error: "Veuillez indiquer le chiffre d'affaire",
      })
      .min(1, { message: "Veuillez indiquer le chiffre d'affaire" })
  ),
  benefice: z.preprocess(
    (a) => Number(a),
    z
      .number({
        required_error: "Veuillez indiquer le bénéfice",
        invalid_type_error: "Veuillez indiquer le bénéfice",
      })
      .min(1, { message: "Veuillez indiquer le bénéfice" })
  ),
});

export const ProjetAddSchema = z.object({
  debut: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  fin: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  annee: z.string().min(4, { message: "Veuillez indiquer l'année fiscale sur 4 chiffres" }),
});
export const ProjetChangeSchema = z.object({
  id: z.string(),
});
