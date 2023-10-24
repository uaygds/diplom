import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./logInPage.module.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { loginUser } from "../../../redux/usersRedux";

type LogInForm = {
  email: string;
  password: string;
};

const LogInPage = () => {
  const [showPassState, setShowPassState] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>();
  const onSubmit: SubmitHandler<LogInForm> = (data: LogInForm) => {
    if (checkUser({ pass: data.password, email: data.email })) {
      dispatch(loginUser(true));
    }
  };

  const showPass = () => {
    setShowPassState(!showPassState);
  };
  const dispatch = useAppDispatch();
  const users = useAppSelector((store) => store.users.users);

  const checkEmail = (email: string) => {
    return users.find(
      (user) => user.email.toLowerCase() == email.toLowerCase()
    );
  };

  const checkUser = ({ pass, email }: { pass: string; email: string }) => {
    if (checkEmail(email)) {
      return users.find(
        (user) => user.email.toLowerCase() == email && user.password === pass
      ) == undefined
        ? false
        : true;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          placeholder="Email"
          {...register("email", {
            validate: (value: string) => {
              if (value.length < 1) {
                return "Введите Email";
              }

              if (!checkEmail(value)) {
                return "Этот Email уже зарегистрирован";
              }
            },
          })}
        />
        {errors.email ? (
          <span style={{ color: "red" }}>{errors.email.message}</span>
        ) : (
          ""
        )}
        <input
          type={showPassState ? "text" : "password"}
          placeholder="Password"
          {...register("password", {
            validate: (value: string) => {
              if (value.length < 1) {
                return "Введите Пароль";
              }
            },
          })}
        />
        {errors.password ? (
          <span style={{ color: "red" }}>{errors.password.message}</span>
        ) : (
          ""
        )}
        <div>
          <label htmlFor="showpass">Показать пароль?</label>
          <input type="checkbox" id="showpass" onClick={showPass} />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default LogInPage;
