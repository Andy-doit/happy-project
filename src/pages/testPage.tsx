import { useEffect, useMemo, useState } from "react";
import SidebarAdmin from "@/components/siderbarAdmin/siderbarAdmin";
import { DataTable } from "@/components/tableGroup/data-table";
import { getArticleColumns } from "@/components/tableGroup/column";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import adminApiRequest from "@/apiRequest/admin";
import { ArticleListResType } from "@/contansts/type";
import { ArticleListRes } from "@/schemaValidations/admin.schema";
import { useUserStore } from "@/hooks/store";
import { UserModal } from "@/components/modal/userModal";


export default function TestPage() {
    const [data, setData] = useState<ArticleListResType["data"]>([]);
    const [loading, setLoading] = useState(true);

    const { setModalType } = useUserStore();
    const columns = useMemo(() => getArticleColumns(setModalType), [setModalType]);


    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await adminApiRequest.listArticle();

                if (response.status === 200 && response.payload?.data) {
                    const parsedData = ArticleListRes.parse(response.payload);
                    setData(parsedData.data);
                } else {
                    console.error("Invalid API response format:", response);
                }
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <SidebarProvider>
            <SidebarAdmin />
            <SidebarInset>
                {loading ? <p>Loading...</p> : (
                    <div>
                        <DataTable
                            columns={columns}
                            data={data}
                        />
                    </div>
                )}
                <UserModal />
            </SidebarInset>
        </SidebarProvider>
    );
}
