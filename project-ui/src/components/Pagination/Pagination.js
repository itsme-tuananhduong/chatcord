import React, { useMemo } from "react";
import { Pagination } from "react-bootstrap";

function CustomPagination(props) {
  const { current = 1, total = 0, limit = 5, onChangePage } = props;
  const maxPage = useMemo(() => {
    return Math.ceil(total / limit);
  }, [total, limit]);

  const onClickPage = (page) => {
    if (page === current) return;
    onChangePage(page);
  };

  const renderItems = () => {
    let items = [];
    for (let number = 1; number <= maxPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === current}
          onClick={(event) => onClickPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return <Pagination>{renderItems()}</Pagination>;
}

export default CustomPagination;
