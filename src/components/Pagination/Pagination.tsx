import styles from "./pagination.module.css";
import { useSearchParams } from "react-router-dom";

interface ForPagination {
  countPages: number;
  handleClick: (params: string) => void;
}

const Pagination = ({ countPages, handleClick }: ForPagination) => {
  const [page] = useSearchParams();

  const currentPage = Number(page.get("page") ? page.get("page") : "1");

  const pageArray = [];
  const firstPage = 1;
  for (let i = 1; i < countPages - 1; i++) {
    pageArray.push(i + 1);
  }
  const lastPage = pageArray.length + 2;
  const shouldShow = (page: number) => {
    if (Number(page) - currentPage < 3 && Number(page) - currentPage >= 0) {
      return true;
    }
    if (currentPage - Number(page) < 3 && currentPage - Number(page) >= 0) {
      return true;
    }
    if (Number(page) === 1 || Number(page) == lastPage) {
      return true;
    }
    return false;
  };

  const dropsForLastPage = () => {
    if (currentPage - 3 < lastPage && currentPage + 3 < lastPage) {
      return true;
    }
  };
  const dropsForFirstPage = () => {
    if (currentPage - 3 > firstPage && currentPage + 3 > firstPage) {
      return true;
    }
  };
  return (
    <ul className={styles.pagination}>
      <li
        className={styles.paginationItem}
        style={{ backgroundColor: currentPage == firstPage ? "#FF9800" : "" }}
        onClick={() => handleClick(firstPage.toString())}
      >
        {firstPage}
      </li>
      {dropsForFirstPage() ? (
        <span className={styles.firstPageSpan}>...</span>
      ) : (
        ""
      )}
      {pageArray.map((page) =>
        shouldShow(page) ? (
          <li
            className={styles.paginationItem}
            style={{ backgroundColor: currentPage == page ? "#FF9800" : "" }}
            key={page}
            onClick={() => handleClick(page.toString())}
          >
            {page}
          </li>
        ) : (
          ""
        )
      )}
      {dropsForLastPage() ? (
        <span className={styles.lastPageSpan}>...</span>
      ) : (
        ""
      )}
      <li
        className={styles.paginationItem}
        style={{ backgroundColor: currentPage == lastPage ? "#FF9800" : "" }}
        onClick={() => handleClick(lastPage.toString())}
      >
        {lastPage}
      </li>
    </ul>
  );
};

export default Pagination;
