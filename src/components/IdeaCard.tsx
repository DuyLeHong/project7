import React from "react";
import { Idea } from "../types";

type IdeaCardProps = {
  idea: Idea;
  onClick: () => void;
  onBookmark: (ideaId: string, isBookmarked: boolean) => void;
  isBookmarked: boolean;
};

const IdeaCard: React.FC<IdeaCardProps> = ({
  idea,
  onClick,
  onBookmark,
  isBookmarked,
}) => (
  <div
    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden relative"
    onClick={onClick}
  >
    <button
      onClick={(e) => {
        e.stopPropagation();
        onBookmark(idea.id, isBookmarked);
      }}
      className={`absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full shadow-md transition
        ${
          isBookmarked
            ? "bg-yellow-100 text-yellow-500"
            : "bg-gray-100 text-gray-400 hover:bg-yellow-50 hover:text-yellow-400"
        }
        text-2xl`}
      title={isBookmarked ? "Bỏ lưu" : "Lưu ý tưởng"}
    >
      {isBookmarked ? "★" : "☆"}
    </button>
    {idea.imageUrl && (
      <img
        src={idea.imageUrl}
        alt={idea.title}
        className="w-full h-48 object-cover"
      />
    )}
    <div className="p-5">
      <h3 className="text-lg font-bold text-blue-700 mb-2">{idea.title}</h3>
      <p className="text-gray-700 mt-1">{idea.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">By: {idea.author}</span>
        <span className="text-sm text-gray-600">Votes: {idea.votes}</span>
      </div>
    </div>
  </div>
);

export default IdeaCard;
