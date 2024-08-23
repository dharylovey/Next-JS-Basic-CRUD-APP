"use client";

import React from "react";
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
} from "./ui/form";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "./ui/dialog";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { createPost } from "@/action/PostAction";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { Post } from "@prisma/client";
import { GoPlus } from "react-icons/go";

export default function PostForm({ posts }: { posts?: Post[] }) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<PostFormProps>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { isSubmitting, isDirty } = form.formState;

  const onSubmit = async (data: PostFormProps) => {
    const validatedData = postSchema.parse(data);

    if (!validatedData) {
      return toast.error("All fields are required");
    }

    const post = await createPost(validatedData);

    if (post) {
      toast.success("Post created successfully");
      form.reset();
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className="flex items-center gap-2"
        >
          <GoPlus />
          <span>Create Post</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-lg font-medium">
          Create a New Post
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
              {isSubmitting ? <ClipLoader color="white" size={20} /> : "Post"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
