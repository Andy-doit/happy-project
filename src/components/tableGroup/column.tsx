import { ColumnDef } from "@tanstack/react-table";


export function getArticleColumns(): ColumnDef<{ id: string; }>[] {
    return [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "title", header: "Title" },
        { accessorKey: "author", header: "Author" },
        { accessorKey: "category", header: "Category" },
        { accessorKey: "createdAt", header: "Created Date" },
        { accessorKey: "status", header: "Status" },

    ]
}


