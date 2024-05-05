"use client";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { InputText } from "@/components/form/input-text";
import { Button } from "@/components/ui/button";
import { ProjetAddSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { addProjet } from "@/actions/projects/project";
import { InputDate } from "@/components/form/input-date";
import { useRouter } from "next/navigation";

const AddProjet = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ProjetAddSchema>>({
    resolver: zodResolver(ProjetAddSchema),
    defaultValues: {
      annee: "2024",
      debut: new Date(),
      fin: new Date(),
    },
  });

  const onSubmit = (values: z.infer<typeof ProjetAddSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addProjet(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) router.refresh();
      });
    });
  };

  return (
    <div className='flex flex-col items-center justify-center h-full space-y-4'>
      <h1 className='text-3xl font-semibold text-center'>
        Vous souhaitez débuter
        <br />
        l’analyse de durabilité pour l’année fiscale :
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col content-center gap-2'>
            <div className='grid grid-cols-3 gap-2'>
              <InputDate name='debut' label={null} form={form} isPending={isPending} placeholder="Début de l'exercice" />
              <InputDate name='fin' label={null} form={form} isPending={isPending} placeholder="Fin de l'exercice" />
              <InputText name='annee' label={null} form={form} isPending={isPending} placeholder='2024' type='number' />
            </div>
            <Button size='lg' variant='default'>
              Commencez !
            </Button>
          </div>
        </form>
      </Form>
      <FormError message={error} />
      <FormSuccess message={success} />

      <p className='text-md text-center'>Explication si necessaire, texte à écrire</p>
    </div>
  );
};
export default AddProjet;
