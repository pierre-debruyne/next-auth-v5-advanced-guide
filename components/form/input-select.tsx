import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface InputSelectProps {
  form: any;
  name: string;
  label: string;
  isPending: boolean;
  placeholder: string;
  tab: Array<any> | Object;
}

export const InputSelect = ({ form, name, label, isPending, placeholder, tab }: InputSelectProps) => {
  if (!form) return null;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
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
  );
};
