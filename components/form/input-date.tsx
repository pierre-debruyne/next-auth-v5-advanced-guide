import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface InputTextProps {
  form: any;
  name: string;
  label: string;
  isPending: boolean;
  placeholder: string;
  description?: string | null;
}

export const InputDate = ({ form, name, label, isPending, placeholder, description = null }: InputTextProps) => {
  if (!form) return null;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                  {field.value ? format(field.value, "PPP", { locale: fr }) : <span>{placeholder}</span>}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar mode='single' selected={field.value} onSelect={field.onChange} disabled={isPending} initialFocus locale={fr} />
            </PopoverContent>
          </Popover>
          {description && <FormDescription className='font-semibold text-red-600'>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
