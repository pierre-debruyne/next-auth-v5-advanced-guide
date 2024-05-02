import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface InputTextProps {
  form: any;
  name: string;
  label: string;
  isPending: boolean;
  placeholder: string;
  type: string;
  description?: string | null;
}

export const InputText = ({ form, name, label, isPending, placeholder, type, description = null }: InputTextProps) => {
  if (!form) return null;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} disabled={isPending} placeholder={placeholder} type={type} />
          </FormControl>
          {description && <FormDescription className='font-semibold text-red-600'>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
