import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useGetTagsQuery } from "../../features/api/tagApi";
import useAuth from "../../hooks/useAuth";
import useNavigator from "../../hooks/useNavigator";
import { Button, InputField, Modal, Spinner, TagButton, TextArea } from "../ui";

const QuestionForm = ({ isOpen, onClose, defaultValues, OnEvent, actions }) => {
  const methods = useForm({
    defaultValues: defaultValues || {},
  });
  const { handleSubmit, reset } = methods;
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const { isAuthenticated } = useAuth();
  const { goTo } = useNavigator();
  const handleClose = () => {
    reset();
    onClose();
  };

  const handleClick = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const { data: tagsData } = useGetTagsQuery({ page: currentPage, pageSize });

  const handleNextPage = () => {
    console.log(tagsData?.currentPage < tagsData?.totalPages);
    if (tagsData?.currentPage < tagsData?.totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (tagsData?.currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para realizar esta acción.");
      goTo("/auth/login");
      return;
    }

    try {
      data.tags = selectedTags;
      await OnEvent(data).unwrap();
      if (!actions?.isError) {
        handleClose();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error al crear la pregunta");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={defaultValues ? "Editar Área" : "Agregar Pregunta"}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
          autoComplete="off"
        >
          {actions?.isLoading ? (
            <Spinner />
          ) : (
            <>
              <InputField
                name="title"
                type="text"
                label="Título"
                placeholder="Ingresa el título"
                rules={{
                  required: "El titulo es obligatorio",
                }}
              />

              <TextArea
                name="content"
                label="Descripción"
                placeholder="Escribe aquí..."
                rules={{
                  required: "La descripción es obligatoria",
                  minLength: {
                    value: 6,
                    message: "Mínimo 6 caracteres",
                  },
                }}
              />
              <div>
                <h2 className="text-lg font-semibold text-center text-gray-800">
                  Selecciona las etiquetas:
                </h2>

                <div className="flex justify-items-center">
                  <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="cursor-pointer disabled:cursor-not-allowed disabled:text-black flex w-8 h-8 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-emerald-300 hover:border-gray-300 disabled:opacity-50"
                  >
                    <ChevronLeft />
                  </button>
                  <div className="flex space-x-2 mx-auto">
                    {tagsData?.tags?.map((tag) => (
                      <TagButton
                        key={tag._id}
                        label={tag.name}
                        active={selectedTags.includes(tag._id)}
                        onClick={() => handleClick(tag._id)}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={tagsData?.currentPage >= tagsData?.totalPages}
                    className="cursor-pointer disabled:cursor-not-allowed disabled:text-black flex w-8 h-8 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-emerald-300 hover:border-gray-300 disabled:opacity-50"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="mt-4">
            <Button
              variant="solid"
              className="w-full py-2"
              type="submit"
              disabled={actions?.isLoading}
            >
              {actions?.isLoading ? "Cargando..." : "Enviar"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default QuestionForm;
