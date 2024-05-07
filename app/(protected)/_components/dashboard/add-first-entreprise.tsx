"use client";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { InputText } from "@/components/form/input-text";
import { Button } from "@/components/ui/button";
import { EntrepriseAddFirstSchema, ProjetAddSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { addProjet } from "@/actions/projects/project";
import { InputDate } from "@/components/form/input-date";
import Link from "next/link";
import { InputSelect } from "@/components/form/input-select";
import { entrepriseType, entrepriseTypeJuridique } from "@/constant/liste-short";
import { countryList } from "@/constant/liste-pays";
import { secteurList } from "@/constant/liste-secteurs";
import { addFirstEntreprise } from "@/actions/entreprises/entreprises";
import { useRouter } from "next/navigation";

// formatage de la liste des pays pour le select
const listePays = Object.entries(countryList).map(([code, name]) => ({ value: code, label: name }));

// formatage de la liste des secteurs pour le select
const listeSecteur = Object.entries(secteurList).map(([code, name]) => ({ value: code, label: name }));

const AddFirstEntreprise = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof EntrepriseAddFirstSchema>>({
    resolver: zodResolver(EntrepriseAddFirstSchema),
    defaultValues: {
      name: "",
      type: "SIEGE",
      statut: "",
      pays: "FR",
      principale: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof EntrepriseAddFirstSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addFirstEntreprise(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) router.refresh();
      });
    });
  };

  return (
    <div className='flex flex-col items-center justify-center h-full space-y-4'>
      <h1 className='text-xl font-semibold text-center'>
        <span className='text-xl'>Nous avons besoin de quelques informations pour commencer !</span>
        <br />
        Veuillez remplir les informations pour l&apos;entreprise principalement concernée par l’analyse de durabilité <br />
        (sur l&apos;année fiscale indiquée précédemment) :
      </h1>
      <div className='p-6 bg-white rounded-md'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className=' grid grid-cols-2 gap-3'>
              <InputText name='name' label="Nom de l'entreprise" form={form} isPending={isPending} placeholder='Entreprise XYZ' type='text' />
              <InputSelect name='statut' label='Statut juridique' form={form} isPending={isPending} placeholder="Choisir un type d'entreprise" tab={entrepriseTypeJuridique} />
              <InputSelect name='type' label="Type d'entreprise" form={form} isPending={isPending} placeholder="Choisir un type d'entreprise" tab={entrepriseType} />
              <InputSelect name='pays' label='Pays' form={form} isPending={isPending} placeholder='Choisir un pays' tab={listePays} />
              <InputSelect name='secteur' label="Secteur d'activité" form={form} isPending={isPending} placeholder="Choisir un secteur d'activité" tab={listeSecteur} />
              <InputText name='nbEmployes' label='Nombre de salariés ETP' form={form} isPending={isPending} placeholder='274' type='number' />
              <InputText name='chiffreAff' label="Chiffre d'affaire en €" form={form} isPending={isPending} placeholder='2 740 000' type='number' />
              <InputText name='benefice' label='Bénéfices consolidé en €' form={form} isPending={isPending} placeholder='670 000' type='number' />
              <InputText name='principale' label={null} form={form} isPending={isPending} placeholder={null} type='hidden' />
            </div>
            <Button disabled={isPending} type='submit' className='w-full'>
              Créer l&apos;entreprise
            </Button>
          </form>
        </Form>
      </div>
      <FormError message={error} />
      <FormSuccess message={success} />

      <p className='text-md text-center'>
        Si nécéssaire vous pouvez ajouter d&apos;autres entreprises du même groupe en <Link href='/entreprises'>cliquant ici</Link> ou par le menu tout en haut de cette page.
      </p>
    </div>
  );
};
export default AddFirstEntreprise;
