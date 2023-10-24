import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./signUpPage.module.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { uploadUser } from "../../../redux/usersRedux";
import { Link } from "react-router-dom";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const SignInPage = () => {
  const [showPassState, setShowPassState] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();
  const onSubmit: SubmitHandler<RegisterForm> = (data: RegisterForm) =>
    saveUser(data);

  const usernamePattern = /^[a-zA-Z](.[a-zA-Z0-9_-]*)$/;
  const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passPattern = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  const showPass = () => {
    setShowPassState(!showPassState);
  };
  const dispatch = useAppDispatch();
  const users = useAppSelector((store) => store.users.users);

  const saveUser = (data: RegisterForm) => {
    delete data.confirmPassword;
    dispatch(uploadUser(data));
  };

  const checkEmail = (email: string) => {
    return users.find(
      (user) => user.email.toLowerCase() == email.toLowerCase()
    ) == undefined
      ? true
      : false;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          placeholder="Username"
          {...register("username", {
            validate: (value: string) => {
              if (value.length < 1) {
                return "Введите Username";
              }
              if (value.length < 7) {
                return "Username должен содержать минимум 8 символов";
              }
              if (!usernamePattern.test(value)) {
                return 'Username может содержать только латинские буквы, цифры, и символы "_", "-" не более двух раз';
              } else {
                return true;
              }
            },
          })}
        />
        {errors.username ? (
          <span style={{ color: "red" }}>{errors.username.message}</span>
        ) : (
          ""
        )}
        <input
          placeholder="Email"
          {...register("email", {
            validate: (value: string) => {
              if (value.length < 1) {
                return "Введите Email";
              }
              if (!emailPattern.test(value)) {
                return "Введите правильный Email";
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
                return "Введите Password";
              }
              if (!passPattern.test(value)) {
                return "Пароль должен содержать минимум 1 цифру, 1 заглавную букву. Минимум 8 символов";
              }
            },
          })}
        />
        {errors.password ? (
          <span style={{ color: "red" }}>{errors.password.message}</span>
        ) : (
          ""
        )}
        <input
          type={showPassState ? "text" : "password"}
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            validate: (value?: string) => {
              if (watch("password") !== value) {
                return "Пароли должны совпадать";
              }
            },
          })}
        />
        {errors.confirmPassword ? (
          <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
        ) : (
          ""
        )}
        <div>
          <label htmlFor="showpass">Показать пароль?</label>
          <input
            className={styles.regInput}
            type="checkbox"
            id="showpass"
            onClick={showPass}
          />
        </div>
        <button className={styles.submitButton} type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className={styles.toLoginIn}>
        U already have account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default SignInPage;
