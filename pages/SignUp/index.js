import "bootstrap/dist/css/bootstrap.css";
import styles from "@/styles/signUp.module.scss";
import axios from "axios";
import { useState } from "react";
import { Button, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { useRouter } from "next/router";
import { useLogIn } from "@/context/LogIn";

const signUp = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [verifyPassword, setVerifyPassword] = useState(null);
  const [name, setName] = useState(null);
  const [checked, setchecked] = useState(false);
  const [error, setError] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setUserEmail, setUserName, userName } =
    useLogIn();

  const router = useRouter();

  const url = process.env.NEXT_PUBLIC_URL;

  const insertUser = async () => {
    axios
      .post(`${url}/api/users/add`, {
        username: name,
        email: email,
        password: password,
      })
      //.then waits to insert the user to database , chack if succesful then does the function
      .then((res) => {
        let x = res.data.user;
        if (x.lenght > 0) {
          setIsLoggedIn(true);
          setUserEmail(email);
          setUserName(name);
          return true;
        }
        return false;
      })
      .catch((e) => {
        console.log("Couldn't register user");
      });
  };

  const handleEmail = (value) => {
    if (value.match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3}).\w+([.-]?\w+)+$/)) {
      setEmail(value);
    } else {
      setEmail(null);
    }
  };

  const handlePassword = (value) => {
    if (value == password) {
      setVerifyPassword(value);
    } else {
      setVerifyPassword(null);
    }
  };

  const handleUsername = (value) => {
    if (value != password) {
      setName(value);
    } else {
      setName(null);
    }
  };

  const addNewsletter = async () => {
    if (checked) {
      const data = { email: email };
      axios
        .post(`${url}/api/newsLetter/addsub`, data)
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleSubmit = () => {
    if (insertUser() == true) {
      addNewsletter();
      router.push(`/${name}`);
    } else {
      setError(true);
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className={styles.container}>
          <form className={styles.form}>
            <div className="mb-3">
              <TextField
                className={styles.txtField}
                label="Username"
                variant="outlined"
                onChange={(e) => {
                  handleUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <TextField
                className={styles.txtField}
                label="Email"
                variant="outlined"
                //onClicck when a function needs a parameter
                onChange={(e) => {
                  handleEmail(e.target.value);
                }}
              />
              <div id="emailHelp" className={styles.txtField}>
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <TextField
                className={styles.txtField}
                label="Password"
                variant="outlined"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <TextField
                className={styles.txtField}
                label="Verify Password"
                variant="outlined"
                type="password"
                onChange={(e) => {
                  handlePassword(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 form-check">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) => setchecked(event.target.checked)}
                  />
                }
                label="Subscribe to newsletter"
              />
            </div>
            <Button
              variant="contained"
              disabled={
                password == null ||
                email == null ||
                verifyPassword == null ||
                name == null ||
                password == "" ||
                email == "" ||
                verifyPassword == "" ||
                name == ""
              }
              //onClick when a fuction doen't need a parameter
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            {error == true && (
              <div className={styles.userexist}>
                <p className={styles.txtuserexist}>User already exist</p>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className={styles.loggedIn}>
          <h1 className={styles.txtLoggedIn}>You are already logged in</h1>
        </div>
      )}
    </>
  );
};

export default signUp;
