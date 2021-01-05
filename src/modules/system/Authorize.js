import { message } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signOut } from "../../actions/authActions";

const Authorize = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const check_authorize = () => {
    if (!auth.ip_address && !auth.user_name) {
      // if (!context.authorize.status) {
      message.warning({
        content: "Authentication is required. You need to sign in.",
        duration: 2,
      });
      history.push("/login");
      dispatch(signOut());
      return false;
    } else {
      return true;
    }
  };
  const set_authorize = (data) => {
    console.log(data);
    // setContext({
    //   ...context,
    //   authorize: {
    //     ...context.authorize,
    //     data,
    //   },
    // });
  };
  return { check_authorize, set_authorize };
};

export default Authorize;
