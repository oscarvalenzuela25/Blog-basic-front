import React from "react";
import { List, Button, Modal, notification } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAccessToken } from "../../../../API/auth";
import { deletePostApi } from "../../../../API/post";

import "./PostList.scss";

const PostList = (props) => {
  const { posts, setReloadPosts, editPost } = props;

  const deletePost = (id) => {
    Modal.confirm({
      title: "Estas segur@ de querer eliminar este post",
      icon: <ExclamationCircleOutlined />,
      content: "Si eliminas este post, no podras recuperarlo",
      okText: "Eliminar!",
      cancelText: "Cancelar",
      onOk() {
        const accessToken = getAccessToken();
        deletePostApi(accessToken, id)
          .then((result) => {
            if (result?.code === 200) {
              notification["success"]({
                message: result.mensaje,
              });
            } else {
              notification["warning"]({
                message: result.mensaje,
              });
            }
            setReloadPosts(true);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  };

  return (
    <div className="post-list">
      <List
        dataSource={posts.docs}
        renderItem={(post) => (
          <Post post={post} deletePost={deletePost} editPost={editPost} />
        )}
      />
    </div>
  );
};

const Post = (props) => {
  const { post, deletePost, editPost } = props;

  return (
    <List.Item
      actions={[
        <Link to={`/blog/${post.url}`} target="_blank">
          <Button type="primary">
            <EyeOutlined />
          </Button>
        </Link>,
        <Button
          type="primary"
          onClick={() => {
            editPost(post);
          }}
        >
          <EditOutlined />
        </Button>,

        <Button type="danger" onClick={() => deletePost(post._id)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta title={post.title} />
    </List.Item>
  );
};

export default PostList;
