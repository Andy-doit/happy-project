import { useEffect, useState } from "react";
import SidebarAdmin from "@/components/siderbarAdmin/siderbarAdmin";
import { DataTable } from "@/components/tableGroup/data-table";
import { getArticleColumns } from "@/components/tableGroup/column";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import adminApiRequest from "@/apiRequest/admin";
import { ArticleListResType } from "@/contansts/type";
import { ArticleListRes } from "@/schemaValidations/admin.schema";
import { Eye, PencilIcon, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function TestPage() {
    const [data, setData] = useState<ArticleListResType["data"]>([]);
    const [loading, setLoading] = useState(true);

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
                    <DataTable
                        columns={getArticleColumns({
                            actions: [
                                {
                                    icon: <Eye className="w-4 h-4" />,
                                    action: (article) => console.log("View:", article),
                                    variant: "outline",
                                    modalId: (article) => `view-${article.id}`,  // Dùng hàm
                                    modalTitle: "Article Details",
                                    modalContent: (article) => (  // Đổi thành hàm nhận article
                                        <div>
                                            <p><strong>Title:</strong> {article.title}</p>
                                            <p><strong>Author:</strong> {article.author}</p>
                                            <p><strong>Category:</strong> {article.category}</p>
                                            <p><strong>Created At:</strong> {article.createdAt}</p>
                                            <p><strong>Status:</strong> {article.status}</p>
                                        </div>
                                    ),
                                },
                                {
                                    icon: <PencilIcon className="w-4 h-4" />,
                                    action: (article) => console.log("Update:", article),
                                    variant: "outline",
                                    modalId: (article) => `edit-${article.id}`,  // Dùng hàm
                                    modalTitle: "Edit Article",
                                    modalContent: (article) => (  // Đổi thành hàm nhận article
                                        <>
                                            <Input defaultValue={article.title} />
                                        </>
                                    ),
                                },
                                {
                                    icon: <Trash className="w-4 h-4" />,
                                    action: (article) => console.log("Delete:", article),
                                    variant: "outline",
                                    modalId: (article) => `delete-${article.id}`,  // Dùng hàm
                                    modalTitle: "Confirm Delete",
                                    modalContent: (article) => (  // Đổi thành hàm nhận article
                                        <p>Are you sure you want to delete "{article.title}"?</p>
                                    ),
                                },
                            ],
                        })}
                        data={data}
                    />

                )}
            </SidebarInset>
        </SidebarProvider>
    );
}