import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";


export default function SearchInput() {
    return (
        <>
            <div className="flex w-full max-w-sm items-center border border-gray-300 rounded-lg px-2.5 py-1.5">
                <SearchIcon className="h-4 w-4 mr-2.5" />
                <Input type="search" placeholder="Search..." className="w-full border-0" />
            </div>
        </>
    );
}