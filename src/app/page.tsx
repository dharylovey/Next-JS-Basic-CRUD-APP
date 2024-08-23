import PostForm from "@/components/PostForm";
import TableList from "@/components/TableList";
import prisma from "@/lib/prisma";

export default async function Home() {
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

  return (
    <main className="flex flex-col max-w-7xl mx-auto p-10 justify-center items-center space-y-10">
      <div className="flex flex-col space-y-10">
        <div className="flex flex-col space-y-2 items-center">
          <h1 className="text-5xl text-gray-500 mb-5">Simple CRUD app!</h1>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-end mb-2">
          <PostForm posts={posts} />
        </div>
        <TableList posts={posts} />
      </div>
    </main>
  );
}
