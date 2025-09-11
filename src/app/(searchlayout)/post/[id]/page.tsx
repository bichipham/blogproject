import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { map } from "lodash-es";
import { Comment, ListComment, PostCardProps } from "@/type/PostCard.types";
import UserAvatar from "@/components/UserAvatar";

// Fetch dữ liệu
async function getPost(id: string): Promise<PostCardProps> {
  const res = await fetch(`https://dummyjson.com/posts/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

async function getComments(id: string): Promise<ListComment> {
  const res = await fetch(`https://dummyjson.com/posts/${id}/comments`, {
    cache: "no-store",
  });
  if (!res.ok) return { comments: [], limit: 0, skip: 0, total: 0 };
  return res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params
  const post = (await getPost(id)) || [];
  const listComments = (await getComments(id)) || [];
  const { title = "", body = "", tags, user, views = "" } = post || {};

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Nội dung Post */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <Image
          src={`https://picsum.photos/id/${id}/640/640`}
          alt={title}
          className="w-full object-cover"
          width={640}
          height={640}
        />
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>By Bichi</span>
            <span>{views} views</span>
          </div>
          <p className="text-gray-700 leading-relaxed">{body}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Comment */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MessageCircle className="w-5 h-5" /> Comments (
          {listComments?.comments?.length})
        </h2>

        <div className="space-y-3">
          {listComments?.comments?.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet</p>
          ) : (
            map(listComments?.comments, (cmt: Comment) => (
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
    </div>
  );
}

