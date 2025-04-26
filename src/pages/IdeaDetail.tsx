import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Comment, Idea } from "../types";
import CommentForm from "../components/CommentForm";
import { onValue, ref, update } from "firebase/database";
import { auth, db } from "../firebaseConfig";

const IdeaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ideasRef = ref(db, `ideas/${id}`);
    onValue(ideasRef, (snapshot) => {
      const data = snapshot.val();
      if (data)
        setIdea({
          id: id!,
          ...data,
        });
    });
  }, [id]);

  useEffect(() => {
    const user = auth.currentUser;

    if (idea && user) {
      const votedUsers: string[] = idea.votedUsers || [];
      setHasVoted(votedUsers.includes(user.uid));
    } else {
      setHasVoted(false);
    }
  }, [idea]);

  const handleVote = async () => {
    if (!idea) return;

    const user = auth.currentUser;
    if (!user) {
      alert("Bạn cần đăng nhập để thực hiện hành động này.");
      navigate("/login");
      return;
    }

    const votedUsers: string[] = idea.votedUsers || [];
    if (votedUsers.includes(user.uid)) return;

    await update(ref(db, `ideas/${id}`), {
      votes: idea.votes + 1,
      votedUsers: [...idea.votedUsers, user.uid],
    });
  };

  const handleComment = async (content: string) => {
    if (!idea) return;

    const user = auth.currentUser;
    if (!user) {
      alert("Bạn cần đăng nhập để thực hiện hành động này.");
      navigate("/login");
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      user: user.email || "",
      content,
      createdAt: new Date().toISOString(),
    };

    await update(ref(db, `ideas/${id}`), {
      comments: [...(idea.comments || []), newComment],
    });
  };

  if (!idea) return <div className="text-center py-10">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">{idea.title}</h2>
        {idea.imageUrl && (
          <img
            src={idea.imageUrl}
            alt={idea.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}
        <p className="mb-4 text-gray-700">{idea.description}</p>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-gray-600">Tác giả: {idea.author}</span>
          <span className="text-gray-600">Votes: {idea.votes}</span>
          <button
            onClick={handleVote}
            disabled={hasVoted}
            className={`px-3 py-1 rounded transition text-white ${
              hasVoted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            {hasVoted ? "Đã vote" : "Vote"}
          </button>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-blue-600">Bình luận</h3>
        <CommentForm onSubmit={handleComment} />
        <ul className="mt-4 space-y-2">
          {(idea.comments || []).map((c) => (
            <li key={c.id} className="bg-gray-100 p-3 rounded">
              <b className="text-blue-700">{c.user}</b>: {c.content}{" "}
              <i className="text-gray-500">
                ({new Date(c.createdAt).toLocaleString()})
              </i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IdeaDetail;
