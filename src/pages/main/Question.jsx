import { motion } from "framer-motion";
import { ArrowLeft, Clock, ThumbsDown, ThumbsUp, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AnswerForm from "../../components/forms/AnswerForm";

import {
  useGetAnswersQuery,
  useCreateAnswerMutation,
} from "../../features/api/answerApi";
import {
  useGetQuestionByIdQuery,
  useVoteQuestionMutation,
} from "../../features/api/questionApi";
import { formatDate } from "../../Utils/formatDate";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { decodeToken } from "../../Utils/JWTUtil";

const Question = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetQuestionByIdQuery(id);
  const [voteQuestion] = useVoteQuestionMutation();
  const { isAuthenticated, token } = useAuth();

  let userId = null;
  if (isAuthenticated) {
    const decoded = decodeToken(token);
    userId = decoded.id;
  }

  const userVote = data?.votes?.find((v) => v.userId === userId);

  const handleVote = async (vote) => {
    try {
      if (!isAuthenticated) {
        toast.error("Debes iniciar sesión para votar");
        return;
      }
      await voteQuestion({ id, vote });
    } catch (error) {
      console.error("Error al votar la pregunta:", error);
    }
  };

  const { data: dataAnswers } = useGetAnswersQuery({
    page: 1,
    pageSize: 10,
    questionId: id,
  });
  const [
    createAnswer,
    { isLoading: isCreatingAnswer, isError: isErrorAnswer },
  ] = useCreateAnswerMutation();

  const answers = dataAnswers?.answers || [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Cargando...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-rose-500">
        Ocurrió un error al cargar la pregunta.
      </div>
    );

  const formattedDate = formatDate(data.createdAt);

  return (
    <div className="max-w-6xl mx-auto bg-white pb-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 cursor-pointer active:scale-95 transition-transform duration-100"
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: -10 }}
          whileTap={{ scale: 0.9, rotate: 10 }}
        >
          <ArrowLeft className="mr-2" />
        </motion.div>
        Regresar
      </button>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
        <div className="flex items-center gap-2">
          {/* Botón Like */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
            onClick={() => handleVote(1)}
            disabled={userVote?.vote === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all
              ${
                userVote?.vote === 1
                  ? "bg-green-200 border-2 border-green-500 text-green-800"
                  : "bg-green-100 hover:bg-green-200 text-green-800"
              }`}
          >
            <motion.div
              whileHover={{ scale: 1.3, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <ThumbsUp />
            </motion.div>
            <span>{data.positiveVotes}</span>
          </motion.button>

          {/* Botón Dislike */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 10 }}
            onClick={() => handleVote(0)}
            disabled={userVote?.vote === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all
              ${
                userVote?.vote === 0
                  ? "bg-rose-200 border-2 border-rose-500 text-rose-800"
                  : "bg-rose-100 hover:bg-rose-200 text-rose-800"
              }`}
          >
            <motion.div
              whileHover={{ scale: 1.3, rotate: -15 }}
              whileTap={{ scale: 0.9 }}
            >
              <ThumbsDown />
            </motion.div>
            <span>{data.negativeVotes}</span>
          </motion.button>
        </div>
      </div>

      <p className="text-gray-700 text-lg mb-6">{data.content}</p>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <motion.div whileHover={{ scale: 1.2 }}>
            <User className="w-4 h-4" />
          </motion.div>
          Publicado por:{" "}
          <span className="font-medium text-gray-700">
            {data.user.username}
          </span>
        </span>
        <span className="flex items-center gap-1">
          <motion.div whileHover={{ scale: 1.2 }}>
            <Clock className="w-4 h-4" />
          </motion.div>
          {formattedDate}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {data.tags.map((tag) => (
          <span
            key={tag._id}
            className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <AnswerForm
        OnEvent={createAnswer}
        actions={{ isLoading: isCreatingAnswer, isError: isErrorAnswer }}
        questionId={id}
      />

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Respuestas ({dataAnswers?.totalAnswers || 0})
        </h2>
        {answers.map((answer) => (
          <div key={answer._id} className="p-4 bg-gray-100 rounded-lg mb-4">
            <p className="text-gray-700 mb-2">{answer.content}</p>
            <div className="text-sm text-gray-500 flex justify-between">
              <span>
                Por:{" "}
                <span className="font-medium text-gray-700">
                  {answer.user.username}
                </span>
              </span>
              <span>{formatDate(answer.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
