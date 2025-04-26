import React, { useEffect, useState } from "react";
import IdeaCard from "../components/IdeaCard";
import { Idea } from "../types";
import { onValue, ref } from "firebase/database";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700">
          Ý tưởng khởi nghiệp IT
        </h1>
        <div className="flex gap-3">
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
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            onClick={() => navigate(`/idea/${idea.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
