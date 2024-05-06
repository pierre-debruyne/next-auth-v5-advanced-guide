"use client";

import React, { useEffect, useState, useTransition } from "react";
import * as z from "zod";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EntrepriseAddSchema } from "@/schemas";
import { countryList } from "@/constant/liste-pays";
import { secteurList } from "@/constant/liste-secteurs";
import { updateEntreprise } from "@/actions/entreprises/entreprises";
import { useRouter } from "next/navigation";
import FormEntreprise from "./form-entreprise";

const UpdateEntreprise = ({ dataEntreprise, setDataEntreprise }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof EntrepriseAddSchema>>({
    resolver: zodResolver(EntrepriseAddSchema),
    defaultValues: {
      name: dataEntreprise?.name || "",
      type: dataEntreprise?.type || "SIEGE",
      statut: dataEntreprise?.statut || "",
      pays: dataEntreprise?.pays || "FR",
      secteur: dataEntreprise?.secteur || "",
      principale: dataEntreprise?.principale || 0,
    },
  });

  const onSubmit = (values: z.infer<typeof EntrepriseAddSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      updateEntreprise(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          setOpen(false);
          setDataEntreprise(null);
          router.refresh();
          form.reset({
            name: "",
            type: "SIEGE",
            statut: "",
            pays: "FR",
            secteur: "",
            principale: 0,
          });
          setError("");
          setSuccess("");
        }
      });
    });
  };

  const handleChange = (e) => {
    setOpen(e);
    if (!e) {
      form.reset({
        name: "",
        type: "SIEGE",
        statut: "",
        pays: "FR",
        secteur: "",
        principale: 0,
        id: null,
      });
      setDataEntreprise(null);
    }
  };

  // ajouter un useEffect
  useEffect(() => {
    if (dataEntreprise) {
      form.reset({
        name: dataEntreprise.name,
        type: dataEntreprise.type,
        statut: dataEntreprise.statut,
        pays: dataEntreprise.pays,
        secteur: dataEntreprise.secteur,
        principale: dataEntreprise.principale ? 1 : 0,
        id: dataEntreprise.id,
      });
      setOpen(true);
    }
  }, [dataEntreprise]);

  return (
    <>
      <Dialog open={open} onOpenChange={(e) => handleChange(e)}>
        <DialogContent className='w-full max-w-fit'>
          <DialogHeader>
            <DialogTitle>Modifier une entreprise</DialogTitle>
            <DialogDescription>Veuillez rentrer les informations de votre entreprise à intégrer dans le périmetre consolidé.</DialogDescription>
          </DialogHeader>
          <FormEntreprise success={success} error={error} form={form} isPending={isPending} onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default UpdateEntreprise;
