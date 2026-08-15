import {
  useGetQuestionsQuery,
  useCreateQuestionMutation,
} from "../../features/api/questionApi";
import { useGetTagsQuery } from "../../features/api/tagApi"; // Importar la consulta de tags
import { Button, ForumCard, Spinner, Sidebar } from "../../components/ui";
import { useState, Suspense, lazy, useEffect } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"; // Asegúrate de tener lucide-react instalado
import useAuth from "../../hooks/useAuth";

const QuestionForm = lazy(() => import("../../components/forms/QuestionForm"));

interface QuestionFilters {
  tags?: string[];
  sortBy?: string;
}

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<QuestionFilters>({});
  const [page, setPage] = useState(1);
  const {
    data: questionsData,
    isLoading: isLoadingQuestions,
    error,
  } = useGetQuestionsQuery({
    page: page,
    pageSize: 10,
    ...filters,
  });
  const { data: tagsData, isLoading: isLoadingTags } = useGetTagsQuery({
    page: 1,
    pageSize: 50,
  });

  const { isAuthenticated } = useAuth();
  const [createQuestion, { isLoading: isCreating, isError }] =
    useCreateQuestionMutation();

  const questions = questionsData?.questions || [];
  const tags = tagsData?.tags || [];
  const totalPages = questionsData?.totalPages || 1;

  useEffect(() => {
    if (!isLoadingQuestions && questions.length === 0 && page > 1) {
      setPage(1);
    }
  }, [questions, isLoadingQuestions, page]);

  const handleFilterChange = (newFilters: QuestionFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar con tags dinámicos */}
      <Sidebar
        tags={isLoadingTags ? [] : tags.map((tag) => tag.name)}
        onFilterChange={handleFilterChange}
      />

      <div className="flex-1 px-4 container mx-auto py-4 lg:ml-54 ml-0">
        <div className="flex justify-end">
          {isAuthenticated && (
            <Button
              variant="solid"
              className="py-2 fixed bottom-6 right-8 z-20"
              type="submit"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <div className="flex items-center space-x-2">
                <Plus />
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
        <div className="flex flex-col items-center">
          {isLoadingQuestions && (
            <p className="text-gray-600">Cargando preguntas...</p>
          )}
          {!isLoadingQuestions && error && (
            <p className="text-red-600">Error al cargar las preguntas.</p>
          )}
          {!isLoadingQuestions && questions.length === 0 && (
            <p className="text-gray-500">No hay preguntas disponibles.</p>
          )}

          {!isLoadingQuestions &&
            questions.map((question) => (
              <ForumCard key={question._id} question={question} />
            ))}

          {/* Paginador */}
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="outline"
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="flex items-center space-x-2"
            >
              <ChevronLeft />
              <span>Anterior</span>
            </Button>
            <span className="text-gray-700">
              Página {page} de {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="flex items-center space-x-2"
            >
              <span>Siguiente</span>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
