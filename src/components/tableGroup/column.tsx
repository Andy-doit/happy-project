import { ColumnDef } from "@tanstack/react-table";
import { ArticleListResType } from "@/contansts/type";
import { Badge } from "../ui/badge";
import ActionButton from "./actionButton";


type Article = ArticleListResType["data"][number];
interface GetArticleColumnsProps {
  actions?: {
    icon: React.ReactNode;
    action: (article: Article) => void;
    variant?: "default" | "outline" | "destructive";
    modalTitle?: string;
    modalContent?: (article: Article) => React.ReactNode;
    modalId?: (article: Article) => string;
  }[];
}

export function getArticleColumns({ actions = [] }: GetArticleColumnsProps): ColumnDef<Article>[] {
  return [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "author", header: "Author" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "createdAt", header: "Created Date" },
    {
      accessorKey: "status", header: "Status",
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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const article = row.original;

        return (
          <div className="flex space-x-2">
            {actions.map((action, index) => (
              <ActionButton
                key={index}
                icon={action.icon}
                onClick={() => action.action(article)}
                variant={action.variant}
                modalId={action.modalId ? action.modalId(article) : `article-modal-${action.modalTitle?.toLowerCase()}-${article.id}`}
                modalTitle={action.modalTitle}
                modalContent={action.modalContent ? action.modalContent(article) : undefined}
              />
            ))}
          </div>
        );
      },
    },
  ];
}
