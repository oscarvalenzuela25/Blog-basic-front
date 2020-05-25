import React, { useState, useEffect } from "react";
import { Switch, List, Button, Modal as ModalAntd, notification } from "antd";
import Modal from "../../../Modal";
import DragSortableList from "react-drag-sortable";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  updateMenuApi,
  activateMenu,
  deleteMenuApi,
} from "../../../../API/menu";
import { getAccessToken } from "../../../../API/auth";
import AddMenuWebForm from "../AddMenuWebForm";
import EditMenuWebForm from "../EditMenuWebForm";

import "./MenuWebList.scss";

//Componente del modal de antd
const { confirm } = ModalAntd;

const MenuWebList = (props) => {
  const { menu, setReloadMenuWeb } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const listItemsArray = [];

    menu.forEach((item) => {
      listItemsArray.push({
        content: (
          <MenuItem
            item={item}
            activeMenu={activeMenu}
            editMenuWebModal={editMenuWebModal}
            deleteMenuWebModal={deleteMenuWebModal}
          />
        ),
      });
    });
    setListItems(listItemsArray);
  }, [menu]);

  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessToken();

    sortedList.map((item) => {
      const { _id } = item.content.props.item;
      const order = item.rank;
      updateMenuApi(accessToken, _id, { order });
    });
  };

  const activeMenu = (id, estado) => {
    const accessToken = getAccessToken();
    const active = estado ? { active: true } : { active: false };
    activateMenu(accessToken, id, active)
      .then((response) => {
        notification["success"]({
          message: response,
        });
      })
      .catch((error) => {
        notification["error"]({
          message: error.message,
        });
      });
  };

  const addMenuWebModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo Menú");
    setModalContent(
      <AddMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
      />
    );
  };

  const editMenuWebModal = (menu) => {
    setIsVisibleModal(true);
    setModalTitle(`Editando menu: ${menu.title}`);
    setModalContent(
      <EditMenuWebForm
        menu={menu}
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
      />
    );
  };

  const deleteMenuWebModal = (id) => {
    confirm({
      title: "Estas seguro de querer eliminar este menu?",
      icon: <ExclamationCircleOutlined />,
      content: "Si lo eliminar no podras volver a recuperarlo",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deletingMenu();
      },
      onCancel() {},
    });

    const deletingMenu = () => {
      const accessToken = getAccessToken();
      deleteMenuApi(accessToken, id)
        .then((result) => {
          notification["success"]({
            message: result,
          });
        })
        .catch((error) => {
          notification["error"]({
            message: error.mensaje ? error.mensaje : error.message,
          });
        });
      setReloadMenuWeb(true);
    };
  };

  return (
    <div className="menu-web-list">
      <div className="menu-web-list__header">
        <Button type="primary" onClick={() => addMenuWebModal()}>
          Nuevo Menú
        </Button>
      </div>

      <div className="menu-web-list__items">
        <DragSortableList items={listItems} onSort={onSort} />
      </div>

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

function MenuItem(props) {
  const { item, activeMenu, editMenuWebModal, deleteMenuWebModal } = props;
  return (
    <List.Item
      actions={[
        <Switch
          defaultChecked={item.active}
          onChange={(e) => {
            activeMenu(item._id, e);
          }}
        />,
        <Button type="primary" onClick={() => editMenuWebModal(item)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => deleteMenuWebModal(item._id)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta title={item.title} description={item.url} />
    </List.Item>
  );
}

export default MenuWebList;
