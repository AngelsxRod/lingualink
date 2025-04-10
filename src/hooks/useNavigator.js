import { useNavigate } from "react-router-dom";

const useNavigator = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const goBack = () => {
    navigate(-1);
  };

  return { goTo, goBack };
};

export default useNavigator;
