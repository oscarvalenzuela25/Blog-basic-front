import React, { useState, useEffect } from "react";
import { getAccessToken } from "../../../API/auth";
import { getUsersActiveApi } from "../../../API/user";

//Componentes
import ListUsers from "../../../components/Admin/Users/ListUsers";
import SpinLoading from "../../../components/SpinLoading";
import "./Users.scss";

const User = () => {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = getAccessToken();

  useEffect(() => {
    getUsersActiveApi(token, true).then((response) => {
      setUsersActive(response.users);
    });
    getUsersActiveApi(token, false).then((response) => {
      setUsersInactive(response.users);
      setLoading(false);
    });
    setReloadUsers(false);
  }, [token, reloadUsers]);

  if (loading) {
    return <SpinLoading />;
  }
  console.log(loading);

  return (
    <>
      <ListUsers
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
    </>
  );
};

export default User;
