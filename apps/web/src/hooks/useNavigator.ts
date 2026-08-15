"use client";

import { useRouter } from "next/navigation";

const useNavigator = () => {
  const router = useRouter();

  const goTo = (path: string) => {
    router.push(path);
  };

  const goBack = () => {
    router.back();
  };

  return { goTo, goBack };
};

export default useNavigator;
