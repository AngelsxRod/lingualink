"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, ThumbsDown, ThumbsUp, User } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import type { TagSummary } from "@lingualink/shared";
import { formatDate } from "../../../../utils/formatDate";
import AnswerForm from "../../../../components/forms/AnswerForm";
import { AnswerCard } from "../../../../components/ui";
import { useCreateAnswerMutation, useGetAnswersQuery } from "../../../../features/api/answerApi";
import { useGetQuestionByIdQuery, useVoteQuestionMutation } from "../../../../features/api/questionApi";
import useAuth from "../../../../hooks/useAuth";

const Question = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, error, isLoading } = useGetQuestionByIdQuery(id as string);
  const [voteQuestion] = useVoteQuestionMutation();
  const { isAuthenticated, user } = useAuth();
  const { data: dataAnswers } = useGetAnswersQuery({
    page: 1,
    pageSize: 10,
    questionId: id as string,
  });

  const userId: string | null = isAuthenticated ? (user?._id ?? null) : null;

  const handleVote = async (vote: 0 | 1) => {
    try {
      if (!isAuthenticated) {
        toast.error("Debes iniciar sesión para votar");
        return;
      }
      await voteQuestion({ id: id as string, vote });
    } catch (error) {
      console.error("Error al votar la pregunta:", error);
    }
  };

  const [createAnswer, { isLoading: isCreatingAnswer, isError: isErrorAnswer }] = useCreateAnswerMutation();

  const answers = dataAnswers?.answers || [];
  const userVote = data?.votes?.find((v) => v.userId === userId);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Cargando...
      </div>
    );

  if (error || !data)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-rose-500">
        Ocurrió un error al cargar la pregunta.
      </div>
    );

  const formattedDate = formatDate(data.createdAt);
  const user_ = typeof data.user === "string" ? null : data.user;
  const tags = (typeof data.tags[0] === "string" ? [] : data.tags) as TagSummary[];

  return (
    <div className="max-w-6xl mx-auto bg-white p-4">
      <button
        onClick={() => router.back()}
        className="flex items-center justify-center mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 cursor-pointer active:scale-95 transition-transform duration-100"
      >
        <motion.div whileHover={{ scale: 1.2, rotate: -10 }} whileTap={{ scale: 0.9, rotate: 10 }}>
          <ArrowLeft className="mr-2" />
        </motion.div>
        Regresar
      </button>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
            onClick={() => handleVote(1)}
            disabled={userVote?.vote === 1}
            className={`disabled:cursor-not-allowed flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all
              ${
                userVote?.vote === 1
                  ? "bg-green-200 border-2 border-green-500 text-green-800"
                  : "bg-green-100 hover:bg-green-200 text-green-800"
              }`}
          >
            <ThumbsUp />
            <span>{data.positiveVotes}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 10 }}
            onClick={() => handleVote(0)}
            disabled={userVote?.vote === 0}
            className={`disabled:cursor-not-allowed flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all
              ${
                userVote?.vote === 0
                  ? "bg-rose-200 border-2 border-rose-500 text-rose-800"
                  : "bg-rose-100 hover:bg-rose-200 text-rose-800"
              }`}
          >
            <ThumbsDown />
            <span>{data.negativeVotes}</span>
          </motion.button>
        </div>
      </div>

      <p className="text-gray-700 text-lg mb-6">{data.content}</p>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <User className="w-4 h-4" />
          Publicado por: <span className="font-medium text-gray-700">{user_?.username}</span>
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {formattedDate}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span key={tag._id} className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
            {tag.name}
          </span>
        ))}
      </div>

      <AnswerForm
        OnEvent={createAnswer}
        actions={{ isLoading: isCreatingAnswer, isError: isErrorAnswer }}
        questionId={id as string}
      />
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Respuestas ({dataAnswers?.totalAnswers || 0})</h2>
        {answers.map((answer) => (
          <AnswerCard key={answer._id} answer={answer} userId={userId as string} isAuthenticated={isAuthenticated} />
        ))}
      </div>
    </div>
  );
};

export default Question;
