import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FormItem, FormMessage } from "@/components/ui/form";

const DEFAULT_IMAGE_URL = "https://s3.ap-southeast-1.amazonaws.com/nurturewave-be-dev/uploads%2Fimages%2F0b8821d6-1a35-4986-af30-232f74a04b51_download+(2).jpeg";

interface UploadImageFieldProps {
    name: string;
    label: string;
}

export function UploadImageField({ name, label }: UploadImageFieldProps) {
    const { setValue, getValues } = useFormContext(); // React Hook Form để cập nhật giá trị
    const [preview, setPreview] = useState<string>(getValues(name) || DEFAULT_IMAGE_URL);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const objectUrl = URL.createObjectURL(file);
        setValue(name, objectUrl); // Lưu URL vào form
        setPreview(objectUrl);
    };

    return (
        <FormItem>
            <div className="grid gap-2">
                <Label htmlFor={name}>{label}</Label>
                <Input id={name} type="file" accept="image/*" onChange={handleFileChange} />
                {preview && <img src={preview} alt="Preview" className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium" />}
                <FormMessage />
            </div>
        </FormItem>
    );
}