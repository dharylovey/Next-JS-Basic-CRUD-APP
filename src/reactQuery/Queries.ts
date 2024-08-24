// usePosts.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import prisma from "@/lib/prisma";

interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UsePostsOptions {
  page: number;
  pageSize: number;
}

const usePosts = ({ page, pageSize }: UsePostsOptions) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", page, pageSize],
    queryFn: async () => {
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
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      return posts;
    },
  });

  return { data, error, isLoading };
};

export default usePosts;
