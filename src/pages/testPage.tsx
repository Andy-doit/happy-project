import { useState, useMemo } from "react";
import PageHeader from "@/components/adminListHeader";
import { ArticleModal } from "@/components/articleModal/articleModal";
import { PaginationDemo } from "@/components/pagination";
import SidebarAdmin from "@/components/siderbarAdmin/siderbarAdmin";
import { getArticleColumns } from "@/components/tableGroup/column";
import { DataTable } from "@/components/tableGroup/data-table";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ADD_FORM } from "@/contansts/type";
import { useUserStore } from "@/hooks/store";
import { useArticles } from "@/hooks/useAdmin";

export default function TestPage() {
  const { setModalType } = useUserStore();
  const columns = useMemo(() => getArticleColumns(setModalType), [setModalType]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;
  const { data, isLoading } = useArticles(page, limit, searchTerm);

  return (
    <SidebarProvider>
      <SidebarAdmin />
      <SidebarInset>
        <PageHeader
          title="Article"
          buttonLabel="Add Article"
          onSearch={setSearchTerm}
          onButtonClick={() => setModalType(ADD_FORM)}
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <DataTable columns={columns} data={data?.data || []} />
            <PaginationDemo
              currentPage={page}
              totalPages={data?.metadata.totalPages || 1}
              onPageChange={setPage}
            />
          </>
        )}
        <ArticleModal />
      </SidebarInset>
    </SidebarProvider>
  );
}
