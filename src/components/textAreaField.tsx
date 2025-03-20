import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { Control, FieldValues, Path } from "react-hook-form";
import { Textarea } from "./ui/textarea";

interface TextAreaFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
    required?: boolean;
}

export function TextAreaField<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    required = false,
}: TextAreaFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <div className="grid gap-2">
                        <Label htmlFor={name}>{label}</Label>
                        <Textarea
                            id={name}
                            placeholder={placeholder}
                            required={required}
                            className="h-32 resize-none"
                            {...field}
                        />
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    );
}
