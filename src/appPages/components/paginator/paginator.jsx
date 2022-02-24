import { useEffect } from "react";
import css from "./paginator.module.css";
import { useNavigate } from "react-router-dom";

const Paginator = (props) => {
  useEffect(() => {}, [props.pageNumber]);
  const navigate = useNavigate();

  const setPageNumber = (number) => {
    props.setPage(number);
    navigate(`/friends/${number}`);
  };

  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) pages.push(i);
  return (
    <div className={css.paginator}>
      {props.pageNumber >= 5 && (
        <span className={css.prevNext} onClick={() => setPageNumber(1)}>
          First
        </span>
      )}
      {props.pageNumber >= 8 && (
        <span
          className={css.prevNext}
          onClick={() => setPageNumber(props.pageNumber - 7)}
        >
          Prev
        </span>
      )}
      {pages
        .filter(
          (item) => item <= props.pageNumber + 3 && item >= props.pageNumber - 3
        )
        .map((item) => {
          if (item === props.pageNumber) {
            return (
              <span className={css.activePage} key={item}>
                {item}
              </span>
            );
          }
          return (
            <span key={item} onClick={() => setPageNumber(item)}>
              {item}
            </span>
          );
        })}
      {props.pageNumber <= pagesCount - 7 && (
        <span
          className={css.prevNext}
          onClick={() => setPageNumber(props.pageNumber + 7)}
        >
          Next
        </span>
      )}
      {props.pageNumber <= pagesCount - 4 && (
        <span
          className={css.prevNext}
          onClick={() => setPageNumber(pagesCount)}
        >
          Last
        </span>
      )}
    </div>
  );
};

export default Paginator;
