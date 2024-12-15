"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = void 0;
var _reactTabs = require("@radix-ui/react-tabs");
var _tabs = require("../../components/ui/tabs");
var _input = require("../../components/ui/input");
var _button = require("../../components/ui/button");
var _react = require("react");
var _sonner = require("sonner");
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _reducers = require("@/store/reducers");
const Auth = () => {
  const [email, setEmail] = (0, _react.useState)("");
  const navigate = (0, _reactRouterDom.useNavigate)();
  const userInfo = (0, _reactRedux.useSelector)(state => state.auth.userInfo);
  const [password, setPassword] = (0, _react.useState)("");
  const [confirmPassword, setConfirmPassword] = (0, _react.useState)("");
  const dispatch = (0, _reactRedux.useDispatch)();
  const validateLogin = () => {
    if (!email.length) {
      _sonner.toast.error("Email is Required");
      return false;
    }
    if (!password.length) {
      _sonner.toast.error("Password is Required");
      return false;
    }
    return true;
  };
  const validateSignUp = () => {
    if (!email.length) {
      _sonner.toast.error("Email is required");
    }
    ;
    if (!password.length) {
      _sonner.toast.error("Password is required");
    }
    ;
    if (confirmPassword !== password) {
      _sonner.toast.error("Passwords do not match");
    }
    return true;
  };
  const handleSignup = async () => {
    try {
      if (validateSignUp()) {
        const resp = await fetch('https://chat-application-4std.onrender.com/api/auth/signup', {
          method: 'POST',
          // Specify the request method
          credentials: 'include',
          // Include the credentials in the request
          headers: {
            'Content-Type': 'application/json' // Specify the content type
          },
          body: JSON.stringify({
            // Replace with actual signup data
            email,
            password,
            confirmPassword
          })
        });
        if (resp.status === 201) {
          const response = await resp.json();
          dispatch((0, _reducers.setUserInfo)(response.user));
          _sonner.toast.success("Account created successfully");
          navigate("/profile");
        } else {
          _sonner.toast.error("An error occurred");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      _sonner.toast.error("An error occurred");
    }
  };
  const handleLogin = () => {
    if (validateLogin()) {
      fetch('https://chat-application-4std.onrender.com/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      }).then(async res => {
        if (res.status === 200) {
          const response = await res.json();
          dispatch((0, _reducers.setUserInfo)(response.user));
          navigate("/");
        } else {
          _sonner.toast.error("An error occurred");
        }
      }).catch(err => {
        console.error("Error during login:", err);
        _sonner.toast.error("An error occurred");
      });
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: " h-[100vh] w-[100vw] flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-[80vh] bg-white bottom-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center gap-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center flex-col"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl font-bold md:text-6xl"
  }, "Welcome"), /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-center"
  }, "Fill in the blanks to get started with the best chat app")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center w-full"
  }, /*#__PURE__*/React.createElement(_tabs.Tabs, {
    className: "w-3/4",
    defaultValue: "login"
  }, /*#__PURE__*/React.createElement(_tabs.TabsList, {
    className: "bg-transparent  outline-none rounded-none w-full flex"
  }, /*#__PURE__*/React.createElement(_reactTabs.TabsTrigger, {
    value: "login",
    className: "  outline-none data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2  border-t-0 border-l-0 border-r-0  bg-white rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all"
  }, "Login"), /*#__PURE__*/React.createElement(_reactTabs.TabsTrigger, {
    value: "signup",
    className: "bg-white  outline-none data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 border-t-0 border-l-0 border-r-0 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all"
  }, "Sign Up")), /*#__PURE__*/React.createElement(_tabs.TabsContent, {
    className: "flex flex-col gap-5 ",
    value: "login"
  }, /*#__PURE__*/React.createElement(_input.Input, {
    placeholder: "Email",
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    className: "rounded-full p-6"
  }), /*#__PURE__*/React.createElement(_input.Input, {
    placeholder: "Password",
    type: "password",
    value: password,
    onChange: e => setPassword(e.target.value),
    className: "rounded-full p-6"
  }), /*#__PURE__*/React.createElement(_button.Button, {
    className: "rounded-full p-6",
    onClick: handleLogin
  }, "Login")), /*#__PURE__*/React.createElement(_tabs.TabsContent, {
    className: "flex flex-col gap-5 ",
    value: "signup"
  }, /*#__PURE__*/React.createElement(_input.Input, {
    placeholder: "Email",
    value: email,
    onChange: e => setEmail(e.target.value),
    type: "email",
    className: "rounded-full p-6"
  }), /*#__PURE__*/React.createElement(_input.Input, {
    placeholder: "Password",
    value: password,
    onChange: e => setPassword(e.target.value),
    type: "password",
    className: "rounded-full p-6"
  }), /*#__PURE__*/React.createElement(_input.Input, {
    placeholder: "Confirm Password",
    value: confirmPassword,
    onChange: e => setConfirmPassword(e.target.value),
    type: "password",
    className: "rounded-full p-6"
  }), /*#__PURE__*/React.createElement(_button.Button, {
    className: "rounded-full p-6",
    onClick: handleSignup
  }, "SignUp"))))))));
};
exports.Auth = Auth;