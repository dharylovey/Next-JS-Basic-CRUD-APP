"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostFormProps } from "@/zodSchema/postSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { ClipLoader } from "react-spinners";
import { FaRegEdit } from "react-icons/fa";
import { updatePost } from "@/action/PostAction";

interface UpdateFormProps {
  id: string;
  initialData: PostFormProps;
}

export default function EditForm({ id, initialData }: UpdateFormProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useForm<PostFormProps>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData,
  });

  const {
    formState: { isSubmitting, isDirty },
  } = form;

  const onSubmit = async (data: PostFormProps) => {
    try {
      await updatePost(id, data);
      toast.success("Post updated successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to update post");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <FaRegEdit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-lg font-medium">
          Update a Post
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-2 m-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Title"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write something"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={isSubmitting || !isDirty}
              variant={"default"}
              className="w-full"
            >
              {isSubmitting ? (
                <ClipLoader color="white" size={20} />
              ) : (
                "Update Post"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
