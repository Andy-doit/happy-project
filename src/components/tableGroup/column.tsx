import { ColumnDef } from "@tanstack/react-table";
import { ArticleListResType, FormActionType, EDIT_FORM, DELETE_FORM } from "@/contansts/type";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";

type Article = ArticleListResType["data"][number];

export function getArticleColumns(
  setModalType: (type: FormActionType) => void,
  setSelectedArticle: (article: Article | null) => void
): ColumnDef<Article>[] {
  return [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "author", header: "Author" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "createdAt", header: "Created Date" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge
            variant={
              status === "published"
                ? "secondary"
                : status === "draft"
                  ? "warning"
                  : "destructive"
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const article = row.original;

        return (
          <div className="flex">
            <Button
              size="icon"
              onClick={() => {
                console.log("Opening edit modal...", article);

                setModalType(EDIT_FORM);
              }}
            >
              <Pencil />
            </Button>
            <Button
              className="ml-3"
              size="icon"
              variant="destructive"
              onClick={() => {
                console.log("Opening delete modal...", article);

                setModalType(DELETE_FORM);
              }}
            >
              <Trash />
            </Button>
          </div>
        );
      },
    },
  ];
}

