import { ReactNode } from "react";
import SearchInput from "./searchInput";

interface PageHeaderProps {
    title: string;
    actions?: () => ReactNode;
}

export default function PageHeader({ title, actions }: PageHeaderProps) {
    return (
        <div className="py-2 flex justify-between items-center">
            <p className="text-2xl font-bold">{title}</p>
            <SearchInput />
            <div className="flex gap-2">{actions && actions()}</div>
        </div>
    );
}
