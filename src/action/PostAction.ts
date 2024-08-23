"use server";

import prisma from "@/lib/prisma";
import { PostFormProps, postSchema } from "@/zodSchema/postSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPostById(id: string) {
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // artificial delay

  const postId = await prisma.post.findMany({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!postId) {
    return { message: "No posts found" };
  }

  revalidatePath("/");

  return postId;
}

export async function getPosts() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  revalidatePath("/");
  return posts;
}

export async function createPost(data: PostFormProps) {
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // artificial delay

  try {
    const validatedData = postSchema.parse(data);

    if (!validatedData) {
      return { message: "All fields are required" };
    }
    const { title, content } = validatedData;
    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    revalidatePath("/");
    return post;
  } catch (error) {
    return { error: "Internal server error" };
  }
}

export async function updatePost(id: string, data: PostFormProps) {
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // artificial delay

  try {
    const validatedData = postSchema.parse(data);
    if (!validatedData) {
      return { message: "All fields are required" };
    }

    const { title, content } = validatedData;
    const result = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
      },
    });
    revalidatePath("/");
    return result;
  } catch (error) {
    return { error: "Internal server error" };
  }
}

export async function deletePost(id: string) {
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // artificial delay

  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
  redirect("/");
}
