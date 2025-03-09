import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { SquarePen, Trash2 } from "lucide-react";

interface DataTableProps<TData extends { id: string }> {
    columns: ColumnDef<TData>[];
    data: TData[];
    onUpdate: (id: string) => void;
    onDelete: (id: string) => void;
}

export function DataTable<TData extends { id: string }>({
    columns,
    data,
    onUpdate,
    onDelete,
}: DataTableProps<TData>) {

    const actionColumn: ColumnDef<TData> = {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button onClick={() => onUpdate(row.original.id)} size="icon" variant="outline">
                    <SquarePen />
                </Button>
                <Button onClick={() => onDelete(row.original.id)} size="icon" variant="outline">
                    <Trash2 />
                </Button>
            </div>
        ),
    };


    const table = useReactTable({
        data,
        columns: [...columns, actionColumn],
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border overflow-x-auto">
            <Table className="w-full">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="px-4 py-2 text-left">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.original.id} className="hover:bg-gray-100  text-left">
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="px-4 py-2 break-words max-w-[400px] whitespace-normal"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
