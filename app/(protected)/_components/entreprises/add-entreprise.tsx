"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaPlusCircle } from "react-icons/fa";
import { EntrepriseAddSchema } from "@/schemas";
import { countryList } from "@/constant/liste-pays";
import { secteurList } from "@/constant/liste-secteurs";
import { InputText } from "@/components/form/input-text";
import { InputSelect } from "@/components/form/input-select";
import { entrepriseType, entrepriseTypeJuridique } from "@/constant/liste-short";
import { addEntreprise } from "@/actions/entreprises/entreprises";
import { useRouter } from "next/navigation";

// formatage de la liste des pays pour le select
const listePays = Object.entries(countryList).map(([code, name]) => ({ value: code, label: name }));

// formatage de la liste des secteurs pour le select
const listeSecteur = Object.entries(secteurList).map(([code, name]) => ({ value: code, label: name }));

const AddEntreprise = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof EntrepriseAddSchema>>({
    resolver: zodResolver(EntrepriseAddSchema),
    defaultValues: {
      name: "",
      type: "SIEGE",
      statut: "",
      pays: "FR",
      secteur: null,
      principale: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof EntrepriseAddSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addEntreprise(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) router.refresh();
      });
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className='cursor-pointer'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-lg font-medium'>Ajouter une entreprise</CardTitle>
              <FaPlusCircle className='h-4 w-4 text-muted-foreground text-green-600' />
            </CardHeader>
            <CardContent>
              <p className='text-xs'>Cliquez ici pour renseigner une nouvelle entreprise.</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className='w-full max-w-fit'>
          <DialogHeader>
            <DialogTitle>Ajouter une entreprise</DialogTitle>
            <DialogDescription>Veuillez rentrer les informations de chaque entreprises à intégré dans le périmetre consolidé.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className=' grid grid-cols-2 gap-3'>
                <InputText name='name' label="Nom de l'entreprise" form={form} isPending={isPending} placeholder='Entreprise XYZ' type='text' />
                <InputSelect name='statut' label='Statut juridique' form={form} isPending={isPending} placeholder="Choisir un type d'entreprise" tab={entrepriseTypeJuridique} />
                <InputSelect name='type' label="Type d'entreprise" form={form} isPending={isPending} placeholder="Choisir un type d'entreprise" tab={entrepriseType} />
                <InputSelect name='pays' label='Pays' form={form} isPending={isPending} placeholder='Choisir un pays' tab={listePays} />
                <InputSelect name='secteur' label="Secteur d'activité" form={form} isPending={isPending} placeholder="Choisir un secteur d'activité" tab={listeSecteur} />
                <InputText name='principale' label={null} form={form} isPending={isPending} placeholder={null} type='hidden' />
              </div>
              <Button disabled={isPending} type='submit' className='w-full'>
                Créer l&apos;entreprise
              </Button>
            </form>
          </Form>
          <FormError message={error} />
          <FormSuccess message={success} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddEntreprise;
