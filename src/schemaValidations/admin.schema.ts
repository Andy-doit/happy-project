
import z from 'zod'
import { format, parseISO } from "date-fns";
import { ArticleDetailType } from '@/contansts/type';


export const ArticleBody = z.object({
  title: z.string(),
  content: z.string(),
  picture: z.string(),
  status: z.string(),
  type: z.string(),
  timeToRead: z.number(),
  categoryId: z.union([
    z.string(),
    z.object({ id: z.string(), name: z.string() })
  ]).transform((category) =>
    typeof category === "string" ? category : category.id
  ),
  author: z.string(),
});



export const ArticleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  picture: z.object({
    createAt: z.string().optional(),
    id: z.string(),
    uri: z.string(),
    type: z.string(),
  }).nullable(),
  content: z.string(),
  status: z.string(),
  author: z.string(),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }).transform((category) => category.name),
  createdAt: z.string().transform((dateStr) => {
    const date = parseISO(dateStr);
    return format(date, "dd/MM/yyyy HH:mm");
  }),
  type: z.string(),

});

export const ArticleRes = z.object({
  data: ArticleSchema,
  message: z.string()
})
export const ArticleListRes = z.object({
  data: z.array(ArticleSchema),
  message: z.string()
})
export const ArticleParams = z.object({
  page: z.number(),
  limit: z.number(),

})
export const CategoriesSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string()
})
export const CategoriesRes = z.object({
  data: CategoriesSchema,
  message: z.string()
})
export const CategoriesListRes = z.object({
  data: z.array(CategoriesSchema),
  message: z.string()
})

