import {
  useGetQuestionsQuery,
  useCreateQuestionMutation,
} from "../../features/api/questionApi";
import { Button, ForumCard, Spinner } from "../../components/ui";
import { useState, Suspense, lazy } from "react";
import { Plus } from "lucide-react"; // Asegúrate de tener lucide-react instalado
import useAuth from "../../hooks/useAuth";
const QuestionForm = lazy(() => import("../../components/forms/QuestionForm"));

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useGetQuestionsQuery();
  const { isAuthenticated } = useAuth();
  const [createQuestion, { isLoading: isCreating, isError }] =
    useCreateQuestionMutation();
  const questions = data?.questions || [];

  return (
    <div className="px-4 container mx-auto">
      <div className="flex justify-end">
        {isAuthenticated && (
          <Button
            variant="solid"
            className=" py-2"
            type="submit"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <div className="flex items-center space-x-2">
              <Plus className="mr-2" />
              Crear pregunta
            </div>
          </Button>
        )}
      </div>

      {/* Modal Form */}
      {isOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
              <Spinner />
            </div>
          }
        >
          <QuestionForm
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            actions={{ isLoading: isCreating, isError }}
            OnEvent={createQuestion}
          />
        </Suspense>
      )}

      {/* Lista de preguntas */}
      <div className="flex flex-col items-center space-y-4">
        {isLoading && <p className="text-gray-600">Cargando preguntas...</p>}
        {!isLoading && error && (
          <p className="text-red-600">Error al cargar las preguntas.</p>
        )}
        {!isLoading && questions.length === 0 && (
          <p className="text-gray-500">No hay preguntas disponibles.</p>
        )}

        {!isLoading &&
          questions.map((question) => (
            <ForumCard
              key={question._id}
              question={question}
              className="w-full hover:shadow-lg transition-shadow duration-300"
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
