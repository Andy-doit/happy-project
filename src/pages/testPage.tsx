import { useMemo } from "react";
import SidebarAdmin from "@/components/siderbarAdmin/siderbarAdmin";
import { DataTable } from "@/components/tableGroup/data-table";
import { getArticleColumns } from "@/components/tableGroup/column";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { useUserStore } from "@/hooks/store";
import { ArticleModal } from "@/components/articleModal/articleModal";
import { useArticles } from "@/hooks/useAdmin";
import AdminListHeader from "@/components/adminListHeader";
import PageHeader from "@/components/adminListHeader";
import SearchInput from "@/components/searchInput";
import { Button } from "@/components/ui/button";
import { ADD_FORM } from "@/contansts/type";


export default function TestPage() {
  const { setModalType } = useUserStore();
  const columns = useMemo(() => getArticleColumns(setModalType), [setModalType]);
  const { data, isLoading } = useArticles();

  return (
    <SidebarProvider>
      <SidebarAdmin />
      <SidebarInset>
        <PageHeader
          title="Article"
          actions={() => (
            <div className="w-full flex justify-between">
              <Button
                onClick={() => setModalType(ADD_FORM)}

              >
                Add
              </Button>
            </div>
          )}
        />
        {isLoading ? <p>Loading...</p> : (
          <div>
            <DataTable
              columns={columns}
              data={data?.data || []}
            />
          </div>
        )}
        <ArticleModal />
      </SidebarInset>
    </SidebarProvider>
  );
}
