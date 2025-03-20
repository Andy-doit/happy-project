import adminApiRequest from "@/apiRequest/admin";
import { ArticleBodyType, ArticleListResType, ArticleResType, CategoriesListResType } from "@/contansts/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useArticles = () => {
    return useQuery<ArticleListResType>({
        queryKey: ["articles"],
        queryFn: async () => {
            const response = await adminApiRequest.listArticle();
            return response.payload;
        },
    });
};
export const useArticleById = (id: string) => {
    return useQuery<ArticleResType>({
        queryKey: ["article", id],
        queryFn: async () => {
            const response = await adminApiRequest.getArticleById(id);
            return response.payload;
        },
        enabled: !!id,
    });
};

export const useCreateArticleMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: ArticleBodyType) => adminApiRequest.createArticle(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
        },
    });
};

export const useUpdateArticleMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...body }: ArticleBodyType & { id: string }) =>
            adminApiRequest.updateArticle(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
        },
    });
};

export const useCategories = () => {
    return useQuery<CategoriesListResType>({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await adminApiRequest.listCategories();
            return response.payload;
        },
    });
};

