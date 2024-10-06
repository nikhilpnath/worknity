import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Office } from "../assets";
import { CustomButton, TextInput } from "../components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiRequest } from "../utils";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { toast } from "react-toastify";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [accountType, setAccountType] = useState("seeker");

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  let schema;

  if (isRegister) {
    schema = yup.object().shape({
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email Is Required"),
      [accountType === "seeker" ? "seekerName" : "companyName"]: yup
        .string()
        .min(5, "Atleast 5 Characters")
        .required(),
      password: yup
        .string()
        .min(8, "length should be atleast 8")
        .max(16, "length cannot exceed 16"),
    });
  } else {
    schema = yup.object().shape({
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email Is Required"),
      password: yup
        .string()
        .min(8, "length should be atleast 8")
        .max(16, "length cannot exceed 16"),
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let URL = null;

    if (isRegister) {
      if (accountType === "seeker") {
        URL = "/user/register";
      } else {
        URL = "/companies/register";
      }
    } else {
      if (accountType === "seeker") {
        URL = "/user/login";
      } else {
        URL = "/companies/login";
      }
    }

    const result = await apiRequest({
      url: URL,
      data: data,
      method: "POST",
    });

    if (result.status === 200) {
      // console.log(result)

      const userData = result.data;

      toast.success(userData.message);

      const info = { token: userData.token, ...userData.user };

      dispatch(login(info));
    } else {
      console.log(result);
      toast.error(result.error || result);
    }
  };

  useEffect(() => {
    user?.token && navigate("/");
  }, [user, navigate]);

  return (
    <>
      <div className="flex justify-center lg:justify-around items-center h-[80vh]">
        <div className=" p-4 w-[26rem] sm:w-[36rem] ">
          <div className=" rounded-2xl bg-white p-6 text-left shadow-xl">
            <h3 className="text-xl font-semibold  text-black">
              {isRegister ? "Create Account" : "Sign In"}
            </h3>

            <div className="flex items-center justify-center py-2 gap-1 ">
              <button
                className={`flex-1 px-1 sm:px-4 py-2 rounded text-sm outline-none ${
                  accountType === "seeker"
                    ? "bg-[#1d4fd862] text-blue-700 font-semibold"
                    : "bg-white border border-blue-400"
                }`}
                onClick={() => setAccountType("seeker")}
              >
                User Account
              </button>

              <button
                className={`flex-1 px-1 sm:px-4 py-2 rounded text-sm outline-none ${
                  accountType !== "seeker"
                    ? "bg-[#1d4fd862] text-blue-900 font-semibold"
                    : "bg-white border border-blue-400"
                }`}
                onClick={() => setAccountType("company")}
              >
                Company Account
              </button>
            </div>

            <form
              className="w-full flex flex-col gap-1"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInput
                name="email"
                label="Email Address"
                placeholder="email@example.com"
                type="text"
                register={register("email")}
                error={errors.email && errors.email.message}
              />

              {isRegister && (
                <div className="w-full flex gap-1 md:gap-2">
                  <div className="w-full">
                    <TextInput
                      label={
                        accountType === "seeker" ? "Full Name" : "Company Name"
                      }
                      name={
                        accountType === "seeker" ? "seekerName" : "companyName"
                      }
                      placeholder={
                        accountType === "seeker"
                          ? "eg. James John"
                          : "eg. Facebook Inc"
                      }
                      type="text"
                      register={register(
                        accountType === "seeker" ? "seekerName" : "companyName"
                      )}
                      error={
                        accountType === "seeker"
                          ? errors.seekerName && errors.seekerName.message
                          : errors.companyName && errors.companyName.message
                      }
                    />
                  </div>
                </div>
              )}

              <div className="w-full flex gap-1 md:gap-2">
                <div className="w-full">
                  <TextInput
                    label="Password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    register={register("password")}
                    error={errors.password && errors.password.message}
                  />
                </div>
              </div>

              <div className="mt-2">
                <CustomButton
                  type="submit"
                  containerStyles={`inline-flex justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white outline-none hover:bg-blue-800`}
                  title={isRegister ? "Create Account" : "Login"}
                />
              </div>
            </form>

            <div className="mt-4 text-sm">
              <p className=" text-gray-700">
                {isRegister
                  ? "Already hav an account?"
                  : "Don't have an account"}

                <span
                  className=" text-blue-600 ml-2 hover:text-blue-700 cursor-pointer"
                  onClick={() => setIsRegister((prev) => !prev)}
                >
                  {isRegister ? "Login" : "Create Account"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <LazyLoadImage
          alt={"office"}
          effect="blur"
          className="hidden lg:block w-[40rem] "
          src={Office}
        />
      </div>
    </>
  );
};

export default Auth;
