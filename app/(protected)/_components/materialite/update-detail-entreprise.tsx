"use client";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { InputText } from "@/components/form/input-text";
import { Button } from "@/components/ui/button";
import { EntrepriseUpdateDetailSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { updateEntrepriseDetail } from "@/actions/entreprises/entreprises";
import { useRouter } from "next/navigation";

const UpdateDetailEntreprise = ({ data }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof EntrepriseUpdateDetailSchema>>({
    resolver: zodResolver(EntrepriseUpdateDetailSchema),
    defaultValues: {
      nbEmployes: null,
      chiffreAff: null,
      benefice: null,
      id: data?.id,
    },
  });

  const onSubmit = (values: z.infer<typeof EntrepriseUpdateDetailSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      updateEntrepriseDetail(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) router.refresh();
      });
    });
  };

  return (
    <div className='flex flex-col items-center justify-center h-full space-y-4'>
      <h1 className='text-xl font-semibold text-center'>{data.name} </h1>
      <div className='p-6 bg-white rounded-md'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className=' grid grid-cols-3 gap-3'>
              <InputText name='nbEmployes' label='Nombre de salariés ETP' form={form} isPending={isPending} placeholder='274' type='number' />
              <InputText name='chiffreAff' label="Chiffre d'affaire en €" form={form} isPending={isPending} placeholder='2 740 000' type='number' />
              <InputText name='benefice' label='Bénéfices consolidé en €' form={form} isPending={isPending} placeholder='670 000' type='number' />
              <InputText name='id' label={null} form={form} isPending={isPending} placeholder={null} type='hidden' />
            </div>
            <Button disabled={isPending} type='submit' className='w-full'>
              Enregistrer
            </Button>
          </form>
        </Form>
      </div>
      <FormError message={error} />
      <FormSuccess message={success} />
    </div>
  );
};
export default UpdateDetailEntreprise;
