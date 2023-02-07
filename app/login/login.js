"use client"; // this is a client component

import React, { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";
import Button from "../../components/loadingButton/button";
import { omit } from "lodash";

const Login = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const validate = (event, name, value) => {
    switch (name) {
      case "username":
        if (value.length <= 4) {
          setErrors({
            ...errors,
            username: "Username atleast have 5 letters",
          });
        } else {
          //set the error state empty or remove the error for username input
          //omit function removes/omits the value from given object and returns a new object
          let newObj = omit(errors, "username");
          setErrors(newObj);
        }
        break;
      case "password":
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          setErrors({
            ...errors,
            password:
              "Password should contains atleast 8 charaters and containing uppercase, lowercase and numbers",
          });
        } else {
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validate(event, name, val);

    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length !== 0 || Object.keys(values).length === 0)
      return;

    try {
      setServerError("");
      setShowLoader(true);

      const { username, password } = values;

      const response = await axios.post("/api/login", { username, password });

      const { token } = response.data;
      //localStorage.setItem("token", token);

      //window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);

      setShowLoader(false);
      setServerError(error.response.data.message);
    }
  };

  return (
    <div className={styles.login_box + " p-3"}>
      <h1 className="display-6 mb-3">Motistore v2</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username: </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
            className={"form-control" + (errors.username ? " is-invalid" : "")}
            required
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>
        <div className="mb-3">
          <label>Password: </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className={"form-control" + (errors.password ? " is-invalid" : "")}
            required
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="mb-3">
          <Button
            text="Login"
            loading={showLoader}
            disabled={showLoader}
            className="btn btn-primary"
            type="submit"
          />
        </div>
        {serverError && (
          <div className="mb-3">
            <div className="alert alert-danger" role="alert">
              {serverError}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
