"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { ProjetChangeSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";
import { toast } from "sonner";
import { changeProjet } from "@/actions/projects/project";
import { InputSelect } from "@/components/form/input-select";

export const ProjectSelect = ({ currentProject, projects }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProjetChangeSchema>>({
    resolver: zodResolver(ProjetChangeSchema),
    defaultValues: {
      id: currentProject.id,
    },
  });

  const formattedProjects = projects.map((project) => ({
    value: project.id,
    label: project.annee,
  }));

  const onSubmit = (values: z.infer<typeof ProjetChangeSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      changeProjet(values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          toast.success(data.success);
        }
      });
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='flex gap-2'>
            <InputSelect form={form} name='id' label={null} isPending={isPending} placeholder='Choisir une année de référence' tab={formattedProjects} />
            <Button disabled={isPending} type='submit' className='w-full'>
              <FaCheck />
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
