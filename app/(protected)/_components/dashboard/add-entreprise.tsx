"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaBriefcase, FaPlusCircle } from "react-icons/fa";
import { EntrepriseAddSchema } from "@/schemas";
import { EntrepriseType } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countryList } from "@/constant/liste-pays";
import { secteurList } from "@/constant/liste-secteurs";
import { InputText } from "@/components/form/input-text";

const AddEntreprise = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EntrepriseAddSchema>>({
    resolver: zodResolver(EntrepriseAddSchema),
    defaultValues: {
      name: "",
      type: "SIEGE",
      statut: "",
      nbEmployes: null,
      pays: "FR",
      secteur: null,
    },
  });

  const onSubmit = (values: z.infer<typeof EntrepriseAddSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      /*
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
      */
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className='cursor-pointer'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-lg font-medium'>Créer une entreprise</CardTitle>
              <FaPlusCircle className='h-4 w-4 text-muted-foreground text-green-600' />
            </CardHeader>
            <CardContent>
              <p className='text-xs'>Cliquez ici pour ajouter une nouvelle entreprise.</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className='w-full max-w-fit'>
          <DialogHeader>
            <DialogTitle>Ajouter une entreprise</DialogTitle>
            <DialogDescription>Veuillez rentrer les informations de votre entreprise ou filliale .</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className=' grid grid-cols-2 gap-3'>
                <InputText name='name' label="Nom de l'entreprise" form={form} isPending={isPending} placeholder='Entreprise XYZ' />
                <InputText name='statut' label='Statut juridique' form={form} isPending={isPending} placeholder='SAS, SARL, ...' />
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type d&apos;entreprise</FormLabel>
                      <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un type d'entreprise" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={EntrepriseType.SIEGE}>Siège</SelectItem>
                          <SelectItem value={EntrepriseType.FILLIALE}>Filliale</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='pays'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type d&apos;entreprise</FormLabel>
                      <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Choisir un pays' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(countryList).map(([code, name]) => (
                            <SelectItem key={code} value={code}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='secteur'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secteur d&apos;activité</FormLabel>
                      <Select disabled={isPending} onValueChange={(value) => field.onChange(Number(value))} defaultValue={`${field.value}`}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un secteur d'activité" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(secteurList).map(([code, name]) => (
                            <SelectItem key={code} value={code}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='nbEmployes'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre d&apos;employés</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")} // Convertir en nombre si possible
                          disabled={isPending}
                          placeholder='284'
                          type='number'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button disabled={isPending} type='submit' className='w-full'>
                Créer l&apos;entreprise
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddEntreprise;
