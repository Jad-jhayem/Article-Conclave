import styles from "@/styles/newArticle.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLogIn } from "@/context/LogIn";
import { TextField, Button, Autocomplete } from "@mui/material";

const addArticle = () => {
  const { isLoggedIn, userName } = useLogIn();
  const router = useRouter();
  const { user } = router.query;

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [category, setCategory] = useState(null);

  const url = process.env.NEXT_PUBLIC_URL;

  const categoryOptions = [
    "Politics",
    "Technologie",
    "Entrepreneurship",
    "Sports",
    "Productivity",
    "Health",
    "Technology",
    "other",
  ];

  const insertArticle = async () => {
    axios
      .post(`${url}/api/articles/insert`, {
        title: title,
        content: content,
        date_published: formatDate(),
        category: category,
        username: user,
      })
      .then(() => {
        router.push(`/${user}`);
      })
      .catch((e) => {
        console.log("Couldn't add article");
      });
  };
  function formatDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  }

  return (
    <>
      {isLoggedIn && userName == user ? (
        <div className={styles.container}>
          <form className={styles.form}>
            <TextField
              className={styles.title}
              label="Title"
              variant="outlined"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <div className={styles.Category}>
              <Autocomplete
                disablePortal
                freeSolo
                d="combo-box-demo"
                options={categoryOptions}
                onChange={(event, value) => {
                  if (value == null) setCategory(null);
                  else {
                    setCategory(value);
                  }
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
            </div>

            <TextField
              className={styles.content}
              label="Content"
              variant="outlined"
              multiline
              rows={10}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />

            <div className={styles.email}>{user.email}</div>
            <Button
              className={styles.btnAdd}
              variant="contained"
              disabled={
                title == null ||
                category == null ||
                content == null ||
                title == "" ||
                content == ""
              }
              //onClick when a fuction doen't need a parameter
              onClick={insertArticle}
            >
              +
            </Button>
          </form>
        </div>
      ) : (
        <div className={styles.loggedIn}>
          <h1 className={styles.txtLoggedIn}>
            Please log in to access this page
          </h1>
        </div>
      )}
    </>
  );
};
export default addArticle;
