import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { Control, FieldValues, Path } from "react-hook-form";

interface SelectFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    options: { value: string; label: string }[];
    placeholder?: string;
}

export function SelectField<T extends FieldValues>({
    control,
    name,
    label,
    options,
    placeholder = "Select an option",
}: SelectFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <div className="grid gap-2">
                        <Label htmlFor={name}>{label}</Label>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    );
}
