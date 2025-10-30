"use client";
import { Post } from "@/components/post";
import { Post as PostType } from "@/db/post.repository";
import { Modal, ModalBody, ModalContent } from "@heroui/react";
import { useRouter } from "next/navigation";

interface PostModalProps {
  post: PostType;
}

export function PostModal({ post }: PostModalProps) {
  const router = useRouter();
  function handleClose() {
    router.back();
  }

  return (
    <Modal defaultOpen={true} backdrop="blur" onClose={handleClose}>
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <Post post={post} />
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
