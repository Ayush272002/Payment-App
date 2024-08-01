import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import axios from "axios";
import BottomWarning from "../components/BottomWarning";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const payload = {
        firstName,
        lastName,
        username,
        password,
      };
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/user/signup`,
        payload
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Signup failed. Please try again."
        );
      } else if (error.request) {
        toast.error("No response received from server.");
      } else {
        toast.error("An error occurred during signup.");
      }
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />

          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            label={"First Name"}
            placeholder={"John"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            label={"Last Name"}
            placeholder={"Doe"}
          />

          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
          />

          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder={"********"}
            inputType="password"
          />

          <InputBox
            onChange={(e) => setConfirmPassword(e.target.value)}
            label={"Confirm Password"}
            placeholder={"********"}
            inputType="password"
          />

          <div className="pt-4">
            <Button onClick={handleSignUp} label={"Sign Up"} />
          </div>

          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Log In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
