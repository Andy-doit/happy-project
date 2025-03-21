import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Control, FieldValues, Path } from "react-hook-form";

interface CustomInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
    type?: string;
    required?: boolean;
}

export function InputField<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type = "text",
    required = false,
}: CustomInputProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <div className="grid gap-2">
                        <Label htmlFor={name}>{label}</Label>
                        <Input
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            required={required}
                            value={field.value ?? ""} 
                            onChange={(e) => {
                                if (type === "number") {
                                    field.onChange(e.target.value === "" ? "" : Number(e.target.value));
                                } else {
                                    field.onChange(e.target.value);
                                }
                            }}
                        />
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    );
}
