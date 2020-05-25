import React from "react";
import { Pagination as PaginationAntd } from "antd";

import "./Pagination.scss";
const Pagination = (props) => {
  const { posts, location, history } = props;
  const currentPage = parseInt(posts.page);

  const onChangePage = (newPage) => {
    history.push(`${location.pathname}?page=${newPage}`);
  };

  return (
    <PaginationAntd
      defaultCurrent={currentPage}
      total={posts.total}
      pageSize={posts.limit ? posts.limit : 0}
      onChange={(newPage) => onChangePage(newPage)}
      className="pagination"
    />
  );
};

export default Pagination;
