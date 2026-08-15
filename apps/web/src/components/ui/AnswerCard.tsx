"use client";

import { Clock, ThumbsDown, ThumbsUp, User } from "lucide-react";
import type { AnswerWithStats } from "@lingualink/shared";
import { useVoteAnswerMutation } from "../../features/api/answerApi";
import { formatDate } from "../../utils/formatDate";

interface AnswerCardProps {
  answer: AnswerWithStats;
  userId: string;
  isAuthenticated: boolean;
}

export const AnswerCard = ({ answer, userId, isAuthenticated }: AnswerCardProps) => {
  const [voteAnswer] = useVoteAnswerMutation();
  const user = typeof answer.user === "string" ? null : answer.user;

  const handleAnswerVote = async (answerId: string, vote: 0 | 1) => {
    try {
      if (!isAuthenticated) {
        return;
      }
      await voteAnswer({ id: answerId, vote });
    } catch (error) {
      console.error("Error al votar la respuesta:", error);
    }
  };

  return (
    <div key={answer._id} className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg shadow-md mb-4 border border-gray-200">
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-2">
        <div className="flex items-center gap-2 text-gray-600">
          <User className="w-5 h-5" />
          <span className="font-medium text-gray-800">{user?.username}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{formatDate(answer.createdAt)}</span>
        </div>
      </div>

      <p className="text-gray-700 text-base">{answer.content}</p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => handleAnswerVote(answer._id, 1)}
          disabled={!isAuthenticated || answer.votes.some((vote) => vote.userId === userId && vote.vote === 1)}
          className={`disabled:cursor-not-allowed cursor-pointer active:scale-95 flex items-center gap-1 text-sm font-medium transition-colors ${
            answer.votes.some((vote) => vote.userId === userId && vote.vote === 1)
              ? "text-green-600"
              : "text-gray-500 hover:text-green-600"
          }`}
        >
          <ThumbsUp className="w-5 h-5" />
          <span>{answer.positiveVotes || 0}</span>
        </button>
        <button
          onClick={() => handleAnswerVote(answer._id, 0)}
          disabled={!isAuthenticated || answer.votes.some((vote) => vote.userId === userId && vote.vote === 0)}
          className={`disabled:cursor-not-allowed cursor-pointer active:scale-95 flex items-center gap-1 text-sm font-medium transition-colors ${
            answer.votes.some((vote) => vote.userId === userId && vote.vote === 0)
              ? "text-red-600"
              : "text-gray-500 hover:text-red-600"
          }`}
        >
          <ThumbsDown className="w-5 h-5" />
          <span>{answer.negativeVotes || 0}</span>
        </button>
      </div>
    </div>
  );
};
