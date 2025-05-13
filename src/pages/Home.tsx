import React, { useEffect, useState } from "react";
import IdeaCard from "../components/IdeaCard";
import { BookmarkedBy, Idea } from "../types";
import { onValue, ref, update } from "firebase/database";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [showBookMark, setShowBookMark] = useState(false);
  const user = auth.currentUser;

  const navigate = useNavigate();

  useEffect(() => {
    const ideasRef = ref(db, "ideas");
    onValue(ideasRef, (snapshot) => {
      const data = snapshot.val();
      const loadedIdeas: Idea[] = data
        ? Object.entries(data).map(([id, value]: any) => ({
            id,
            ...value,
          }))
        : [];
      setIdeas(loadedIdeas);
    });
  }, []);

  const handleBookMark = async (ideaId: string, isBookmarked: boolean) => {
    if (!user) return;
    const idea = ideas.find((idea) => idea.id === ideaId);
    if (!idea) return;

    const bookmarkedBy = idea.bookmarkedBy || [];

    let updatedBookmarkedBy;

    if (isBookmarked) {
      updatedBookmarkedBy = bookmarkedBy.filter(
        (user: BookmarkedBy) => user.uid !== user.uid
      );
    } else {
      const alreadyBookmarked = bookmarkedBy.some(
        (user: BookmarkedBy) => user.uid === user.uid
      );
      updatedBookmarkedBy = alreadyBookmarked
        ? bookmarkedBy
        : [...bookmarkedBy, { email: user.email, uid: user.uid }];
    }

    await update(ref(db, `ideas/${ideaId}`), {
      bookmarkedBy: updatedBookmarkedBy,
    });
  };

  const bookmarkedIdeas = ideas.filter(
    (idea) =>
      idea.bookmarkedBy &&
      user &&
      Array.isArray(idea.bookmarkedBy) &&
      idea.bookmarkedBy.some((user: BookmarkedBy) => user.uid === user.uid)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700">
          Ý tưởng khởi nghiệp IT
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowBookMark(false)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              !showBookMark ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Tất cả ý tưởng
          </button>
          <button
            onClick={() => setShowBookMark(true)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              showBookMark ? "bg-yellow-400 text-white" : "bg-gray-200"
            }`}
          >
            Đã lưu
          </button>
          <button
            onClick={() => navigate("/add-idea")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition"
          >
            Đăng ý tưởng mới
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition">
            Đăng xuất
          </button>
        </div>
      </div>
      {/* Idea List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(showBookMark ? bookmarkedIdeas : ideas).map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            onClick={() => navigate(`/idea/${idea.id}`)}
            onBookmark={handleBookMark}
            isBookmarked={
              !!(
                idea.bookmarkedBy &&
                user &&
                idea.bookmarkedBy.some(
                  (user: BookmarkedBy) => user.uid === user.uid
                )
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
