"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/action/PostAction";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";

interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePost(id);
      toast.success("Post deleted successfully");
      setIsDeleting(false);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete post");
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="bg-red-500 text-white">
          <FaRegTrashCan />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-lg font-medium">
          Are you sure you want to delete this post?
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="outline" size="sm">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            disabled={isDeleting}
            size={"sm"}
          >
            {isDeleting ? <ClipLoader color="white" size={20} /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
