import { Component } from "react";
import styles from "./SignUpForm.module.css";

const EMAIL_EXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_EXP = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
      touched: {},
    };
  }

  handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    this.setState((prev) => ({
      [name]: type === "checkbox" ? checked : value,
      touched: { ...prev.touched, [name]: true },
    }));
  };

  getErrors() {
    const { name, email, password, confirmPassword, agree } = this.state;
    return {
      name: name.trim().length < 2,
      email: !EMAIL_EXP.test(email),
      password: !PASSWORD_EXP.test(password),
      confirmPassword:
        !PASSWORD_EXP.test(confirmPassword) || confirmPassword !== password,
      agree: !agree,
    };
  }

  getInputClass(field) {
    if (!this.state.touched[field]) return styles.labelInput;
    return `${styles.labelInput} ${
      this.getErrors()[field] ? styles.invalid : styles.valid
    }`;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = Object.values(this.getErrors()).some(Boolean);
    if (hasErrors) {
      this.setState({
        touched: {
          name: true,
          email: true,
          password: true,
          confirmPassword: true,
          agree: true,
        },
      });
      return;
    }

    console.log("Form is valid", this.state);
  };

  render() {
    const { name, email, password, confirmPassword, agree, touched } =
      this.state;
    const agreeInvalid = touched.agree && !agree;

    return (
      <form className={styles.mainForm} onSubmit={this.handleSubmit} noValidate>
        <h1 className={styles.mainTitleForm}>Sign Up</h1>
        <label className={styles.labelForm}>
          <span className={styles.labelFormName}>Name</span>
          <input
            className={this.getInputClass("name")}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label className={styles.labelForm}>
          <span className={styles.labelFormName}>Email</span>
          <input
            className={this.getInputClass("email")}
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </label>
        <label className={styles.labelForm}>
          <span className={styles.labelFormName}>Password</span>
          <input
            className={this.getInputClass("password")}
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </label>
        <label className={styles.labelForm}>
          <span className={styles.labelFormName}>Confirm password</span>
          <input
            className={this.getInputClass("confirmPassword")}
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
          />
        </label>
        <label
          className={`${styles.checkboxLabel} ${
            agreeInvalid ? styles.checkboxInvalid : ""
          }`}
        >
          <input
            className={styles.checkboxInput}
            type="checkbox"
            name="agree"
            checked={agree}
            onChange={this.handleChange}
          />
          <span className={styles.labelFormName}>I agree to the terms</span>
        </label>
        <button className={styles.mainFormBtn} type="submit">
          Sign Up
        </button>
      </form>
    );
  }
}

export default SignUpForm;
