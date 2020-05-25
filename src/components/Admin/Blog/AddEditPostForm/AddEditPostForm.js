import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, DatePicker, notification } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";
import { getAccessToken } from "../../../../API/auth";
import { addPostApi, updatePostApi } from "../../../../API/post";
import moment from "moment";

import "./AddEditPostForm.scss";

const AddEditPostForm = (props) => {
  const { setIsVisibleModal, setReloadPosts, post } = props;
  const [postData, setPostData] = useState({});

  useEffect(() => {
    if (post) {
      setPostData(post);
    } else {
      setPostData({});
    }
  }, [post]);

  const processPost = () => {
    const { title, url, description, date } = postData;

    if (!title || !url || !description || !date) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (!post) {
        addPost();
      } else {
        editPost();
      }
    }
  };

  const addPost = () => {
    const token = getAccessToken();
    addPostApi(token, postData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.mensaje,
        });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch((error) => {
        console.log(error);
        notification["error"]({
          message: "Error del servidor",
        });
      });
  };

  const editPost = () => {
    const token = getAccessToken();
    updatePostApi(token, postData._id, postData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.mensaje,
        });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch((error) => {
        console.log(error);
        notification["error"]({
          message: "Error del servidor",
        });
      });
  };

  return (
    <div className="add-edit-post-form">
      <AddEditForm
        postData={postData}
        setPostData={setPostData}
        post={post}
        processPost={processPost}
      />
    </div>
  );
};

const AddEditForm = (props) => {
  const { postData, setPostData, post, processPost } = props;

  return (
    <Form className="add-edit-post-form" layout="inline" onFinish={processPost}>
      <Row gutter={24} style={{ width: "100%" }}>
        <Col span={8}>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder="Titulo"
            value={postData.title}
            onChange={(e) => {
              setPostData({ ...postData, title: e.target.value });
            }}
          />
        </Col>
        <Col span={8}>
          <Input
            prefix={<LinkOutlined />}
            placeholder="Url"
            value={postData.url}
            onChange={(e) => {
              setPostData({
                ...postData,
                url: transformTextToUrl(e.target.value),
              });
            }}
          />
        </Col>
        <Col span={8}>
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY HH:mm:ss"
            placeholder="Fecha de Publicacion"
            //showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            //defaultValue={moment("2015-01-01", "YYYY-MM-DD")}
            value={postData.date && moment(postData.date)}
            onChange={(e, value) => {
              setPostData({
                ...postData,
                date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString(),
              });
            }}
          />
        </Col>
      </Row>
      <Row gutter={24} style={{ width: "100%" }}>
        <Col span={24}>
          <Editor
            value={postData.description ? postData.description : ""}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
            }}
            onBlur={(e) => {
              setPostData({ ...postData, description: e.target.getContent() });
            }}
          />
          <Button htmlType="submit" type="primary" className="btn-submit">
            {post ? "Actualizar Post" : "Crear Post"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

function transformTextToUrl(text) {
  const url = text.replace(" ", "-");
  return url.toLowerCase();
}

export default AddEditPostForm;
