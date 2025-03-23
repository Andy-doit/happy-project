import adminApiRequest from "@/apiRequest/admin";
import { ArticleBodyType, ArticleListResType, ArticleResType, CategoriesListResType } from "@/contansts/type";
import { ArticleListRes } from "@/schemaValidations/admin.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useArticles = (page: number, limit: number, search: string) => {
  return useQuery<ArticleListResType>({
    queryKey: ["articles", page, limit, search],
    queryFn: async () => {
      const response = await adminApiRequest.listArticle({
        page,
        limit,
        search,
      });

      return ArticleListRes.parse(response.payload);
    },
    placeholderData: (previousData) => previousData,
  });
};
export const useArticleById = (articleId?: string) => {
  return useQuery<ArticleResType, Error>({
    queryKey: ["article", articleId],
    queryFn: async () => {
      const response = await adminApiRequest.getArticleById(articleId!);
      return response.payload;
    },
    enabled: !!articleId,
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
    mutationFn: ({ id, ...body }: ArticleBodyType & { id: string }) => {
      return adminApiRequest.updateArticle(id, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useDeleteArticleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => adminApiRequest.deleteArticle(ids),
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

