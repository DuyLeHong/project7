import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { db, auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const AddIdea: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("Bạn cần đăng nhập để thực hiện hành động này.");
      navigate("/login");
      return;
    }

    await push(ref(db, "ideas"), {
      title,
      description,
      imageUrl,
      author: user.email,
      votes: 0,
      comment: [],
    });

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-xl border border-blue-100">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-700 text-center tracking-tight drop-shadow">
          Đăng ý tưởng mới
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-5 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <textarea
            placeholder="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-5 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none min-h-[120px]"
          />
          <input
            type="text"
            placeholder="Link ảnh minh hoạ"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-5 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          {imageUrl && (
            <div className="flex justify-center mb-2">
              <img
                src={imageUrl}
                alt="Preview"
                className="h-40 rounded shadow border object-contain"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            Đăng ý tưởng
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIdea;
