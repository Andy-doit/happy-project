import { ColumnDef } from "@tanstack/react-table";
import { ArticleListResType, FormActionType, EDIT_FORM, DELETE_FORM } from "@/contansts/type";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import { useUserStore } from "@/hooks/store";


type Article = ArticleListResType["data"][number];

export function getArticleColumns(
  openModal: (type: FormActionType, id: string) => void
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
        const { setArticleId } = useUserStore();
        return (
          <div className="flex">
            <Button
              size="icon"
              onClick={() => {
                openModal(EDIT_FORM, article.id)
                setArticleId(article.id);
              }
              }
            >
              <Pencil />
            </Button>
            <Button
              className="ml-3"
              size="icon"
              variant="destructive"
              onClick={() => {
                openModal(DELETE_FORM, article.id);
                setArticleId(article.id);
              }
              }>
              <Trash />
            </Button>
          </div >
        );
      },
    },
  ];
}


