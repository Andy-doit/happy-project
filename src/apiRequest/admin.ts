import { ArticleListResType } from "@/contansts/type";
import http from "@/lib/http";

const adminApiRequest = {
    listArticle: () => http.get<ArticleListResType>('admins/articles'),


}
export default adminApiRequest;