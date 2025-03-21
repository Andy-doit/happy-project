import { Label } from "@/components/ui/label"
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export default function SearchInput() {
    return (
        <div className="relative w-1/3">
            <Label htmlFor="search" className="sr-only">
                Search
            </Label>
            <Input
                id="search"
                placeholder="Search the docs..."
                className="pl-8"
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </div>
    );
}
