import { useState } from "react";

const LoginForm = ({ mode, onSubmit }) => {
  const [userDetails, set_userDetails] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
  });

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;

    set_userDetails({ ...userDetails, [name]: value });
  };

  return (
    <form className="text-center">
      <input
        type="text"
        placeholder="John Doe"
        name="name"
        value={userDetails.name}
        onChange={handleUserDetailsChange}
      />
      <input
        type="email"
        placeholder="johndoe@email.com"
        name="email"
        value={userDetails.email}
        onChange={handleUserDetailsChange}
      />
      <input
        type="password"
        placeholder="*******"
        name="password"
        value={userDetails.password}
        onChange={handleUserDetailsChange}
      />
      <input
        type="text"
        placeholder="Software Engineer"
        name="designation"
        value={userDetails.designation}
        onChange={handleUserDetailsChange}
      />

      <button onClick={(e) => onSubmit(e, userDetails)}>
        {mode === "login" ? "Login" : "Create Account"}
      </button>
    </form>
  );
};

export default LoginForm;
