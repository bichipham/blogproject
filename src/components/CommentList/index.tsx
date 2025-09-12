"use client";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { map } from "lodash-es";
import { Comment, ListComment, PostCardProps } from "@/type/PostCard.types";
import UserAvatar from "@/components/UserAvatar";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/reduxStore/store";
import { addComment, fetchCommentsByPostId } from "@/reduxStore/commentSlice";

const CommentList = ({ postId }: { postId: string }) => {
  const dispatch = useAppDispatch();
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const user = useAppSelector((state) => state?.auth?.user) || {username: '', id: ''};

  // fetch comments khi load component
  useEffect(() => {
    dispatch(fetchCommentsByPostId(postId))
      .unwrap()
      .then((data) => {
        console.log("data", data);
        setLocalComments(data);
      });
  }, [dispatch, postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const res = await dispatch(
      addComment({ postId, body: newComment, userId: user?.id })
    ).unwrap();
    // res = { id, body, postId, user }
    setLocalComments((prev) => [...prev, res]); // update local
    setNewComment("");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <MessageCircle className="w-5 h-5" /> Comments ({localComments?.length})
      </h2>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="border p-2 flex-1"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <div className="space-y-3">
        {localComments?.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet</p>
        ) : (
          map(localComments, (cmt: Comment) => (
            <div key={cmt.id} className="flex items-center gap-3">
              <UserAvatar
                name={cmt.user.fullName}
                size={36}
                bg="rgba(99,102,241,0.18)"
                color="#3b82f6"
              />
              <div>
                <p className="text-sm font-medium">{cmt?.user?.fullName}</p>
                <p className="text-gray-700 text-sm">{cmt?.body}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentList;
