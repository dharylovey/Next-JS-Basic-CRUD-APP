"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Post } from "@prisma/client";
import DeleteButton from "./DeletePost";
import EditForm from "./EditForm";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";

export default function TableList({ posts }: { posts: Post[] }) {
  return (
    <div className="w-full flex">
      <Table>
        <TableCaption className="text-2xl">A list of post</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date Created</TableHead>
            <TableHead className="w-[100px]">Date Updated</TableHead>
            <TableHead className="w-[200px]">Title</TableHead>
            <TableHead className="w-[500px]">Content</TableHead>
            <TableHead className="w-[80px] text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="text-xs italic">
                {post.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell className="text-xs italic">
                {post.updatedAt.toLocaleDateString()}
              </TableCell>
              <TableCell className="text-primary capitalize ">
                {post.title}
              </TableCell>
              <TableCell className="text-primary capitalize">
                {post.content}
              </TableCell>
              <TableCell className="text-right">
                {
                  <div className="flex space-x-2 items-center justify-around">
                    <Suspense fallback={<ClipLoader size={20} />}>
                      <EditForm
                        id={post.id}
                        initialData={{
                          title: post.title,
                          content: post.content,
                        }}
                      />
                    </Suspense>
                    <Suspense fallback={<ClipLoader size={20} />}>
                      <DeleteButton id={post.id} key={post.id} />
                    </Suspense>
                  </div>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
