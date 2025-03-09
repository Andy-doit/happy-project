import { useEffect, useState } from "react";
import SidebarAdmin from "@/components/siderbarAdmin/siderbarAdmin";
import { DataTable } from "@/components/tableGroup/data-table";
import { getArticleColumns } from "@/components/tableGroup/column";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ArticleListResType } from "@/schemaValidations/admin.schema";
import adminApiRequest from "@/apiRequest/admin";

export default function TestPage() {
    const [data, setData] = useState<ArticleListResType["data"]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await adminApiRequest.listArticle();

                if (response.status === 200 && response.payload?.data) {
                    setData(response.payload.data);
                    console.log(response.payload.data)
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

    const handleUpdate = (id: string) => {
        console.log("Update item với ID:", id);
    };

    const handleDelete = (id: string) => {
        console.log("Delete item với ID:", id);
    };

    return (
        <SidebarProvider>
            <SidebarAdmin />
            <SidebarInset>
                {loading ? <p>Loading...</p> : (
                    <DataTable
                        columns={getArticleColumns()}
                        data={data}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                )}
            </SidebarInset>
        </SidebarProvider>
    );
}
