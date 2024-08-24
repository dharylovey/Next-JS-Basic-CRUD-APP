"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
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
import PaginationComponent from "./PostPagination";

const ITEMS_PER_PAGE = 10;

export default function TableList({ posts }: { posts: Post[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - ITEMS_PER_PAGE;
    return posts.slice(indexOfFirstPost, indexOfLastPost);
  }, [posts, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full flex flex-col relative h-[75vh]">
      <div className="flex-grow overflow-auto">
        <Table className="min-w-[600px]">
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
            {currentPosts.map((post) => (
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-4 sticky bottom-0 bg-white py-4 border-t">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
