import React, { useState, useEffect } from "react";
import { notification } from "antd";
import moment from "moment";
import "moment/locale/es";
import { getPostApi } from "../../../../API/post";
import { Helmet } from "react-helmet";
import SpinLoading from "../../../SpinLoading";

import "./PostInfo.scss";

const PostInfo = (props) => {
  const { url } = props;
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    getPostApi(url)
      .then((response) => {
        if (response.code !== 200) {
          notification["warning"]({
            message: response.mensaje,
          });
        } else {
          setPostInfo(response.post);
        }
      })
      .catch((error) => {
        notification["error"]({
          message: error.mensaje ? error.mensaje : error.message,
        });
      });
  }, [url]);

  if (!postInfo) {
    return <SpinLoading />;
  }

  return (
    <>
      <Helmet>
        <title>{postInfo.title} | Oscar Valenzuela Dev</title>
        <meta
          name="description"
          content="Post | Web sobre programacion"
          data-react-helmet="true"
        />
      </Helmet>
      <div className="post-info">
        <h1 className="post-info__title">{postInfo.title}</h1>

        <div className="post-info__creation-date">
          {moment(PostInfo.date).local("es").format("LL")}
        </div>

        {/* Forma en como se incrusta elementos HTML dentro de un contenedor*/}
        <div
          className="post-info__description"
          dangerouslySetInnerHTML={{ __html: postInfo.description }}
        />
      </div>
    </>
  );
};

export default PostInfo;
