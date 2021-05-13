import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { USER_LOGOUT } from "../../actions/types";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("state");
      console.log("signout");
      dispatch({ type: USER_LOGOUT });
      history.push("/login");
    }, 1000);
  }, []);
  return (
    <>
      <center>{loading && <h1>Loading...</h1>}</center>
    </>
  );
};

export default Logout;
