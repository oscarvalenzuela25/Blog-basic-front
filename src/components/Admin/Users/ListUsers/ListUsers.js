import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  notification,
  Modal as ModalAntd,
} from "antd";
import {
  EditOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/no-avatar.png";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import AddUserForm from "../AddUserForm";
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
} from "../../../../API/user";
import { getAccessToken } from "../../../../API/auth";

import "./ListUsers.scss";

const { confirm } = ModalAntd;

const ListUsers = (props) => {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUsersActives, setViewUsersActives] = useState(true);
  //State de Modal
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  //Modal para agregar un nuevo usuario por el Admin
  const addUserModel = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo usuario");
    setModalContent(
      <AddUserForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  //Modal para eliminar un usuario
  const showDeleteConfirm = (user) => {
    const accessToken = getAccessToken();

    //ModalAntd.confirm seria la funcion, pero usamos destructuring en el principio para solo usar el objeto confirm
    confirm({
      title: "Eliminando usuario",
      content: `Estas seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accessToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsers(true);
          })
          .catch((error) => {
            notification["error"]({
              message: error,
            });
          });
      },
    });
  };

  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setViewUsersActives(!viewUsersActives)}
          />
          <span>
            {viewUsersActives ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>
        <Button
          type="primary"
          onClick={() => {
            addUserModel();
          }}
        >
          Nuevo Usuario
        </Button>
      </div>

      {viewUsersActives ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        />
      )}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
    showDeleteConfirm,
  } = props;

  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : "..."} ${
        user.lastname ? user.lastname : "..."
      }`
    );
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <List
      className="user-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        />
      )}
    />
  );
}

function UsersInactive(props) {
  const { usersInactive, setReloadUsers, showDeleteConfirm } = props;
  return (
    <List
      className="user-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive
          user={user}
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        />
      )}
    />
  );
}

function UserActive(props) {
  const { user, editUser, setReloadUsers, showDeleteConfirm } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactivateUser = () => {
    const accessToken = getAccessToken();

    activateUserApi(accessToken, user._id, false)
      .then((response) => {
        if (response.mensaje) {
          notification["success"]({
            message: response.mensaje,
          });
          setReloadUsers(true);
        } else {
          notification["error"]({
            message: "Hubo un error en el servidor, intentelo mas tarde",
          });
        }
      })
      .catch((error) => {
        notification["error"]({
          message: error.message,
        });
      });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <EditOutlined />
        </Button>,

        <Button type="danger" onClick={() => desactivateUser()}>
          <StopOutlined />
        </Button>,

        <Button type="danger" onClick={() => showDeleteConfirm(user)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`${user.name ? user.name : "..."} ${
          user.lastname ? user.lastname : "..."
        }`}
        description={user.email}
      />
    </List.Item>
  );
}

function UserInactive(props) {
  const { user, setReloadUsers, showDeleteConfirm } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUser = () => {
    const accessToken = getAccessToken();
    activateUserApi(accessToken, user._id, true)
      .then((response) => {
        if (response.mensaje) {
          notification["success"]({
            message: response.mensaje,
          });
          setReloadUsers(true);
        } else {
          notification["error"]({
            message: "Hubo un error en el servidor",
          });
        }
      })
      .catch((error) => {
        notification["error"]({
          message: error.message,
        });
      });
  };

  return (
    <List.Item
      actions={[
        <Button
          type="primary"
          onClick={() => {
            activateUser();
          }}
        >
          <CheckOutlined />
        </Button>,

        <Button type="danger" onClick={() => showDeleteConfirm(user)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`${user.name ? user.name : "..."} ${
          user.lastname ? user.lastname : "..."
        }`}
        description={user.email}
      />
    </List.Item>
  );
}

export default ListUsers;
