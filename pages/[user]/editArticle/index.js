import styles from "@/styles/newArticle.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLogIn } from "@/context/LogIn";
import { TextField, Button, Autocomplete } from "@mui/material";

const editArticle = () => {
  const { isLoggedIn, userName } = useLogIn();
  const router = useRouter();
  const { user } = router.query;

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [category, setCategory] = useState(null);
  const [date_published, setDate_Published] = useState(null);

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

  const updateArticle = async () => {
    axios
      .put(`${url}/api/articles/update`, {
        title: title,
        content: content,
        date_published: date_published,
        category: category,
        username: user,
      })
      .then(() => {
        router.push(`/${user}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fromSessionStorage = () => {
    let title = sessionStorage.getItem("title");
    let date_published = sessionStorage.getItem("date_published");
    let category = sessionStorage.getItem("category");
    let content = sessionStorage.getItem("content");

    setTitle(title);
    setDate_Published(date_published);
    setCategory(category);
    setContent(content);
  };

  useEffect(() => {
    fromSessionStorage();
  }, []);

  return (
    <>
      {isLoggedIn && userName == user ? (
        <div className={styles.container}>
          <form className={styles.form}>
            <TextField
              className={styles.title}
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <div className={styles.Category}>
              <Autocomplete
                disablePortal
                freeSolo
                value={category}
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
              value={content}
              variant="outlined"
              multiline
              rows={10}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />

            <div className={styles.email}>{user.email}</div>
            <div className={styles.btnContainer}>
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
                onClick={updateArticle}
              >
                Update
              </Button>
            </div>
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
export default editArticle;
