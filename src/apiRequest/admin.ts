import { ArticleBodyType, ArticleListResType, ArticleResType, CategoriesListResType } from "@/contansts/type";
import http from "@/lib/http";

const adminApiRequest = {
  listArticle: () => http.get<ArticleListResType>('admins/articles'),
  getArticleById: (id: string) => http.get<ArticleResType>(`admins/articles/${id}`),
  updateArticle: (id: string, body: ArticleBodyType) => http.put<ArticleResType>(`admins/articles/${id}`, body),
  createArticle: (body: ArticleBodyType) => http.post<ArticleResType>(`admins/articles`, body),
  deleteArticle: (ids: string[]) => http.delete(`admins/articles`, ids),
  listCategories: () => http.get<CategoriesListResType>('admins/categories')


}
export default adminApiRequest;