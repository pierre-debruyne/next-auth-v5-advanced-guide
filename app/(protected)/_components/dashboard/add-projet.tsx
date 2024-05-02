"use client";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { InputText } from "@/components/form/input-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjetAddSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { addProjet } from "@/actions/projects/project";

const AddProjet = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProjetAddSchema>>({
    resolver: zodResolver(ProjetAddSchema),
    defaultValues: {
      annee: "2024",
    },
  });

  const onSubmit = (values: z.infer<typeof ProjetAddSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addProjet(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) window.location.reload();
      });
    });
  };

  return (
    <div className='flex flex-col items-center justify-center h-full space-y-4'>
      <h1 className='text-3xl font-semibold text-center'>Vous souhaitez débuter l’analyse de durabilité pour l’année fiscale :</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <InputText name='annee' label={null} form={form} isPending={isPending} placeholder='2024' type='number' />
          <Button size='lg'>Commencez ! </Button>
        </form>
      </Form>
      <FormError message={error} />
      <FormSuccess message={success} />

      <p className='text-md text-center'>Explication si necessaire, texte à écrire</p>
    </div>
  );
};
export default AddProjet;
