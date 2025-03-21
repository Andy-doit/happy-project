import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArticleBody } from "@/schemaValidations/admin.schema";
import { useCategories } from "@/hooks/useAdmin";
import { Form } from "../ui/form";
import { InputField } from "../inputField";
import { SelectField } from "../selectField";
import { UploadImageField } from "../uploadImageField";
import { TextAreaField } from "../textAreaField";
import { ArticleBodyType } from "@/contansts/type";
import { StatusOptions } from "@/contansts/data";

interface AddEditArticleFormProps {
    articleDetail?: ArticleBodyType;
    onSubmit: (data: ArticleBodyType) => void;
}

export default function AddEditArticleForm({ articleDetail, onSubmit }: AddEditArticleFormProps) {
    const { data: categories } = useCategories();

    const categoryOptions = categories?.data.map((cate) => ({
        value: cate.id,
        label: cate.name,
    })) ?? [];

    const normalizedArticleDetail = articleDetail
        ? {
            ...articleDetail,
            categoryId: (articleDetail.categoryId as any)?.id ?? articleDetail.categoryId,
        }
        : undefined;

    const form = useForm<ArticleBodyType>({
        resolver: zodResolver(ArticleBody),
        defaultValues: normalizedArticleDetail ?? {
            title: "",
            content: "",
            picture: "",
            status: "",
            type: "",
            timeToRead: 0,
            categoryId: "",
            author: "",
        },
    });

    return (
        <Form {...form}>
            <form
                id="article-form"
                className="px-4 overflow-y-auto overflow-x-hidden mt-2"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <InputField name="title" label="Title" placeholder="Title" control={form.control} />
                <InputField name="author" label="Author" placeholder="Author" control={form.control} />
                <SelectField name="status" control={form.control} label="Status" options={StatusOptions} placeholder="Choose a Status" />
                <SelectField name="categoryId" control={form.control} label="Category" options={categoryOptions} placeholder="Choose a Category" />
                <InputField name="timeToRead" type="number" label="Duration (Ex: 3mins)" placeholder="Time to read" control={form.control} />
                <UploadImageField name="picture" label="Picture" />
                <TextAreaField placeholder="Content" control={form.control} name="content" label="Content" />
            </form>
        </Form>
    );
}
