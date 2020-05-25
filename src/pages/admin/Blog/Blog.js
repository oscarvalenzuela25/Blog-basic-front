import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import Modal from "../../../components/Modal";
import { getPostsApi } from "../../../API/post";

//Componentes
import PostList from "../../../components/Admin/Blog/PostList";
import Pagination from "../../../components/Pagination";
import AddEditPostForm from "../../../components/Admin/Blog/AddEditPostForm";
import SpinLoading from "../../../components/SpinLoading";

import "./Blog.scss";
const Blog = (props) => {
  const [modalTitle, setModalTitle] = useState("");
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [posts, setPosts] = useState({});
  const [reloadPosts, setReloadPosts] = useState(false);
  const [loading, setLoading] = useState(true);
  const { location, history } = props;
  const { page = 1, limit = 5 } = queryString.parse(location.search);

  useEffect(() => {
    getPostsApi(limit, page)
      .then((response) => {
        if (response?.code === 200) {
          setPosts(response.posts);
          setLoading(false);
        } else {
          notification["warning"]({
            message: response.mensaje,
          });
        }
      })
      .catch((error) => {
        notification["error"]({
          message: error.mensaje ? error.mensaje : error.message,
        });
      });
    setReloadPosts(false);
  }, [page, reloadPosts]);

  const addPost = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo post");
    setModalContent(
      <AddEditPostForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPosts={setReloadPosts}
        post={null}
      />
    );
  };

  const editPost = (post) => {
    setIsVisibleModal(true);
    setModalTitle("Editando post");
    setModalContent(
      <AddEditPostForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPosts={setReloadPosts}
        post={post}
      />
    );
  };

  if (loading) {
    return <SpinLoading />;
  }

  return (
    <div className="blog">
      <div className="blog__add-post">
        <Button type="primary" onClick={() => addPost()}>
          Nuevo Post
        </Button>
      </div>

      <PostList
        posts={posts}
        setReloadPosts={setReloadPosts}
        editPost={editPost}
      />
      <Pagination posts={posts} location={location} history={history} />

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width="75%"
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default withRouter(Blog);
