"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/../components/ui/button";
import { Input } from "@/../components/ui/input";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/../components/ui/form";
import { PlusCircle, Loader2 } from "lucide-react";
import { cn } from "@/../lib/utils";
import { useRouter } from "next/navigation";
import { SectionsList } from "./section-list";  // Similar component to ChaptersList
import { Course, Section } from "@prisma/client";


interface SectionsFormProps {
  initialData: Course &   {sections: Section[] };
  courseId: string
}

const formSchema = z.object({
  title: z.string().min(1),
});


export const SectionsForm = ({ initialData, courseId }: SectionsFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleCreating = () => setIsCreating((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/sections`, values);
      toast.success("Section Created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/sections/reorder`, { list: updateData });
      toast.success("Sections reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/creator/courses/${courseId}/sections/${id}`);
  };

  return (
    <div className="relative mt-6 border bg-slate-700 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-100 rounded-md p-4">
          <div className="absolute h-full w-full bg-slate-500/2 top-0 right-0 flex items-center justify-center">
            <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
          </div>
        </div>
      )}

      <div className="font-medium flex items-center justify-between text-gray-200">
        Course sections
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? <>Cancel</> : <><PlusCircle className="h-4 w-4 mr-2" /> Add a section</>}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Name of the section"
                      {...field}
                      className="text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">Create</Button>
            </div>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div className={cn("text-sm mt-2", !initialData.sections.length && "text-slate-500 italic")}>
          {!initialData.sections.length && "No sections"}
          <SectionsList onEdit={onEdit}  items={initialData.sections || []} />
        </div>
      )}
    </div>
  );
};
