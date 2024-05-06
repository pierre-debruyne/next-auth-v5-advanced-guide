import { Form } from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { countryList } from "@/constant/liste-pays";
import { secteurList } from "@/constant/liste-secteurs";
import { InputText } from "@/components/form/input-text";
import { InputSelect } from "@/components/form/input-select";
import { entrepriseType, entrepriseTypeJuridique } from "@/constant/liste-short";
import { Button } from "@/components/ui/button";

// formatage de la liste des pays pour le select
const listePays = Object.entries(countryList).map(([code, name]) => ({ value: code, label: name }));

// formatage de la liste des secteurs pour le select
const listeSecteur = Object.entries(secteurList).map(([code, name]) => ({ value: code, label: name }));

const FormEntreprise = ({ form, isPending, error, success, onSubmit }) => {
  return (
    <>
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
            Modifier l&apos;entreprise
          </Button>
        </form>
      </Form>
      <FormError message={error} />
      <FormSuccess message={success} />
    </>
  );
};
export default FormEntreprise;
