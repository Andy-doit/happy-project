
import z from 'zod'

export const ArticleSchema = z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    picture: z.string(),
    content: z.string(),
    status: z.string(),
    author: z.string(),
    category: z.object({
        id: z.string(),
        name: z.string(),
    }),
    createdAt: z.coerce.date().transform((date) => {
        return new Intl.DateTimeFormat("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Ho_Chi_Minh",
        }).format(date);
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
    sort: z.object({
        id: z.number(),
        status: z.string(),
        author: z.string(),
    })
})

