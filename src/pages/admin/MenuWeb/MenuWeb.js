import React, { useState, useEffect } from "react";
import { getMenus } from "../../../API/menu";
import MenuWebList from "../../../components/Admin/MenuWeb/MenuWebList";
import SpinLoading from "../../../components/SpinLoading";

const MenuWeb = () => {
  const [menu, setMenu] = useState([]);
  const [reloadMenuWeb, setReloadMenuWeb] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenus().then((result) => {
      setMenu(result);
      setLoading(false);
    });

    setReloadMenuWeb(false);
  }, [reloadMenuWeb]);

  if (loading) {
    return <SpinLoading />;
  }

  return (
    <div className="menu-web">
      <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
    </div>
  );
};

export default MenuWeb;
