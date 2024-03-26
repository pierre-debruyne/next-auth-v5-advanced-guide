import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface InputTextProps {
  form: any;
  name: string;
  label: string;
  isPending: boolean;
  placeholder: string;
}

export const InputText = ({ form, name, label, isPending, placeholder }: InputTextProps) => {
  if (!form) return null;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} disabled={isPending} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
