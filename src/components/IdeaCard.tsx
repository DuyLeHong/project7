import React from "react";
import { Idea } from "../types";

type IdeaCardProps = {
  idea: Idea;
  onClick: () => void;
};

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onClick }) => (
  <div
    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden"
    onClick={onClick}
  >
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
