import { Send } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, TextArea } from "../ui/";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

interface AnswerFormValues {
  content: string;
}

interface FormActions {
  isLoading?: boolean;
  isError?: boolean;
}

interface AnswerFormProps {
  defaultValues?: Partial<AnswerFormValues>;
  OnEvent: (args: {
    data: AnswerFormValues;
    questionId: string;
  }) => { unwrap: () => Promise<unknown> };
  actions?: FormActions;
  questionId: string;
}

const AnswerForm = ({ defaultValues, OnEvent, actions, questionId }: AnswerFormProps) => {
  const methods = useForm<AnswerFormValues>({
    defaultValues: defaultValues || {},
  });
  const { handleSubmit, reset, setValue } = methods;

  const { isAuthenticated } = useAuth();
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (data: AnswerFormValues) => {
    try {
      await OnEvent({
        data,
        questionId,
      }).unwrap();
      if (!actions?.isError) {
        reset();
        toast.success("Respuesta creada con éxito");
      }
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Error al crear la pregunta");
    }
  };

  const handleContentChange = () => {
    if (!isAuthenticated) {
      setValue("content", "");
      return;
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Agregar un comentario
      </h3>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="space-y-6"
        >
          <TextArea
            name="content"
            placeholder="Escribe aquí..."
            rules={{
              required: "La descripción es obligatoria",
              minLength: {
                value: 6,
                message: "Mínimo 6 caracteres",
              },
              onChange: handleContentChange,
            }}
          />
          <div className="justify-end flex items-center">
            <Button
              variant="outline"
              className="py-2 flex items-center disabled:cursor-not-allowed"
              type="submit"
              disabled={actions?.isLoading || isAuthenticated === false}
            >
              {actions?.isLoading ? "Cargando..." : "Enviar respuesta"}
              <span className="ml-2">
                <Send className="text-emerald-500" />
              </span>
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AnswerForm;
