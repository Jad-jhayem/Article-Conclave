import "bootstrap/dist/css/bootstrap.css";
import styles from "@/styles/logIn.module.scss";
import axios from "axios";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useLogIn } from "@/context/LogIn";

const logIn = () => {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [invalidUsername, setInvalidusername] = useState(false);
  const [invalidPassword, setInvalidPasssword] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setUserEmail, setUserName } = useLogIn();

  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_URL;

  const handleLogIn = async () => {
    setInvalidusername(false);
    setInvalidPasssword(false);

    axios
      .get(`${url}/api/users/${name}`)
      .then((res) => {
        const data = res.data.user;
        if (data[0].password == password) {
          setIsLoggedIn(true);
          setUserEmail(data[0].email);
          setUserName(name);

          router.push(`/${name}`);
        } else {
          setInvalidPasssword(true);
        }
      })
      .catch((e) => {
        setInvalidusername(true);
      });
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className={styles.container}>
          <form className={styles.form}>
            <div className="mb-3">
              <TextField
                className={styles.txtField}
                error={invalidUsername}
                label="Username"
                variant="outlined"
                //onClicck when a function needs a parameter
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <TextField
                className={styles.txtField}
                error={invalidPassword}
                label="Password"
                variant="outlined"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <Button
              variant="contained"
              className={styles.btnLogIn}
              disabled={
                password == null || name == null || password == "" || name == ""
              }
              //onClick when a fuction doen't need a parameter
              onClick={handleLogIn}
            >
              Log In
            </Button>
            {invalidUsername == true && (
              <div className={styles.userexist}>
                <p className={styles.txtuserexist}>User doesn't exist</p>
              </div>
            )}
            {invalidPassword == true && (
              <div className={styles.userexist}>
                <p className={styles.txtuserexist}>Incorrect password</p>
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

export default logIn;
