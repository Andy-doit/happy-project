import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

type SearchInputProps = {
    onSearch: (value: string) => void;
    className?: string;
};

export default function SearchInput({ onSearch, className }: SearchInputProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className={`relative w-full max-w-sm ${className}`}>
            <Label htmlFor="search" className="sr-only">
                Search
            </Label>
            <Input
                id="search"
                placeholder="Search articles..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </div>
    );
}
