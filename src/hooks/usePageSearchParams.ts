import { useSearchParams } from "react-router-dom";

export const usePageSearchParams = () => {
  const [params, setParams] = useSearchParams();

  const setPage = (page: number) => {
    setParams({ page: page.toString() });
  };

  return { page: params.get("page") || "1", setPage };
};
