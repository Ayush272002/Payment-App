import { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!username || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const payload = {
        username,
        password,
      };

      const res = await axios.post(
        `${API_BASE_URL}/api/v1/user/signin`,
        payload
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Login failed. Please try again."
        );
      } else if (error.request) {
        toast.error("No response received from server.");
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to sign in"} />

          <InputBox
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            onChange={(e) => setUsername(e.target.value)}
          />

          <InputBox
            label={"Password"}
            placeholder={"********"}
            inputType="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="pt-4">
            <Button label={"Sign In"} onClick={handleSignIn} />
          </div>

          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
