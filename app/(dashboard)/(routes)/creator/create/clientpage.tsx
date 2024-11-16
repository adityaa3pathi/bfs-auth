"use client";  // This indicates it's a client component

import * as z from "zod";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from "@/../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/../components/ui/input";
import { Button } from "@/../components/ui/button";
import toast from "react-hot-toast";

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
});

const CreatePageClient = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { title: "" },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values);
            router.push(`/creator/courses/${response.data.id}`);
            toast.success("Course created");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course Title</FormLabel>
                            <FormControl>
                                <Input
                                    className="text-gray-600"
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'How to master dribble'"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Describe the course briefly.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center gap-x-2">
                    <Link href="/">
                        <Button type="button" variant="ghost" className="hover:bg-black">
                            Cancel
                        </Button>
                    </Link>

                    <Button
                        type="submit"
                        className="text-sky-100 bg-black"
                        disabled={!isValid || isSubmitting}
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CreatePageClient;
