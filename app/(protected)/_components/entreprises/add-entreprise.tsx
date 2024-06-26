"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaPlusCircle } from "react-icons/fa";
import { EntrepriseAddSchema } from "@/schemas";
import { addEntreprise } from "@/actions/entreprises/entreprises";
import { useRouter } from "next/navigation";
import FormEntreprise from "./form-entreprise";

const AddEntreprise = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
        if (data.success) {
          setOpen(false);
          router.refresh();
          form.reset({
            name: "",
            type: "SIEGE",
            statut: "",
            pays: "FR",
            secteur: null,
            principale: 0,
          });
          setError("");
          setSuccess("");
        }
      });
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
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
          <FormEntreprise success={success} error={error} form={form} isPending={isPending} onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddEntreprise;
