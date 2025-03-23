
import SearchInput from "./searchInput";
import { Button } from "./ui/button";

interface PageHeaderProps {
    title: string;
    buttonLabel: string;
    onSearch: (value: string) => void;
    onButtonClick: () => void;
}

export default function PageHeader({ title, buttonLabel, onSearch, onButtonClick }: PageHeaderProps) {
    return (
        <div className="py-2 flex items-center justify-between w-full">
            <p className="text-2xl font-bold">{title}</p>
            <div className="flex-1 flex justify-center px-4">
                <SearchInput onSearch={onSearch} className="max-w-xs w-full" />
            </div>
            <Button onClick={onButtonClick}>{buttonLabel}</Button>
        </div>
    );
}
