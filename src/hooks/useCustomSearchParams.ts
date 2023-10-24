import { useSearchParams } from "react-router-dom";

export const useCustomSearchParams = () => {
  const [params, setParams] = useSearchParams();

  const setPage = (page: number) => {
    setParams({ page: page.toString() });
  };

  const setName = (name: string) => {
    setParams({ name: name.toString() });
  };

  return {
    page: params.get("page") || "1",
    setPage,
    name: params.get("name") || "",
    setName,
  };
};
