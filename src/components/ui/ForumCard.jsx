import { useState } from "react";
import { formatDate } from "../../Utils/formatDate";
import { Link } from "react-router-dom";
import { User, Clock, MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";

export const ForumCard = ({ question }) => {
  const { title, content, user, createdAt, _id, answersCount } = question;

  const formattedDate = formatDate(createdAt);

  const maxContentLength = 130;
  const truncatedContent =
    content.length > maxContentLength
      ? content.slice(0, maxContentLength) + "..."
      : content;

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white shadow-md border border-gray-100 rounded-lg mt-5 hover:shadow-lg transition-shadow duration-300">
      <Link to={`/question/${_id}`} className="block text-decoration-none">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-gray-700 text-lg mb-6  line-clamp-4">{content}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            Publicado por:{" "}
            <span className="font-medium text-gray-700">{user.username}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formattedDate}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {question.tags.map((tag) => (
            <span
              key={tag._id}
              className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 text-center text-gray-700">
          <div>
            <MessageCircle className="w-5 h-5 mx-auto mb-1" />
            <span className="block text-xl font-bold">
              {question.answersCount}
            </span>
            <span className="text-sm">Respuestas</span>
          </div>
          <div>
            <ThumbsUp className="w-5 h-5 mx-auto mb-1" />
            <span className="block text-xl font-bold">
              {question.positiveVotes}
            </span>
            <span className="text-sm">Votos Positivos</span>
          </div>
          <div>
            <ThumbsDown className="w-5 h-5 mx-auto mb-1" />
            <span className="block text-xl font-bold">
              {question.negativeVotes}
            </span>
            <span className="text-sm">Votos Negativos</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
