import http from "@/lib/http";
import { ArticleListResType } from "@/schemaValidations/admin.schema";


const adminApiRequest = {
    listArticle: () => http.get<ArticleListResType>('admins/articles'),


}
export default adminApiRequest;