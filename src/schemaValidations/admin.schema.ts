
import z from 'zod'
import { format, parseISO } from "date-fns";

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

