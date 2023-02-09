import styles from "@/styles/user.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLogIn } from "@/context/LogIn";
import { Edit, Delete, Add } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

const articlePage = () => {
  //state to store articles fetched from database so we can update it immediately on the screen
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = process.env.NEXT_PUBLIC_URL;

  const router = useRouter();

  const { user } = router.query;
  const { isLoggedIn, userName } = useLogIn();

  // fetch function to call api
  const fetch = async () => {
    let res = await axios.get(`${url}/api/articles/${user}`);
    let data = res.data.articles;

    setArticles(data);
    setLoading(false);
  };

  // calls fetch function on initial render
  useEffect(() => {
    if (router.isReady && isLoggedIn && userName == user) {
      fetch();
    }
  }, [router.isReady]);

  const deleteArticle = async (article) => {
    let data = article;
    delete data["_id"];
    let res = await axios.post(`${url}/api/articles/remove`, data);
    fetch();
  };

  const setToSessionStorage = async (article) => {
    sessionStorage.setItem("title", article.title);
    sessionStorage.setItem("date_published", article.date_published);
    sessionStorage.setItem("category", article.category);
    sessionStorage.setItem("content", article.content);
  };

  const editArticle = (article) => {
    setToSessionStorage(article);
    router.push(`/${user}/editArticle`);
  };

  return (
    <>
      {isLoggedIn && userName == user ? (
        <>
          {loading == true ? (
            <div className={styles.loadingContainer}>
              <CircularProgress />
            </div>
          ) : (
            <div className={styles.container}>
              <div className={styles.plusLink}>
                <Link href={`${user}/newArticle`}>
                  <div className={styles.icbackground}>
                    <Add sx={{ fontSize: 65 }} className={styles.icAdd} />
                  </div>
                </Link>
              </div>

              <div className={styles.articleContainer}>
                {/* map goes by every article 1 by 1 */}
                {articles.map((article, index) => (
                  <div key={index} className={styles.articles}>
                    <div className={styles.articleTitle}>{article.title}</div>
                    <div className={styles.dateAndCategory}>
                      <div className={styles.articleDate}>
                        {article.date_published}
                      </div>
                      <div className={styles.articleCategory}>
                        {article.category}
                      </div>
                    </div>
                    <div className={styles.articleContent}>
                      {article.content}
                    </div>
                    <div className={styles.articleAuthor}>{userName}</div>
                    <div className={styles.editArticle}>
                      <div
                        className={styles.articleEdit}
                        onClick={() => editArticle(article)}
                      >
                        <Edit></Edit>
                      </div>

                      {/* it takes a parameter so it's a function */}
                      <div
                        className={styles.articleDelete}
                        onClick={() => deleteArticle(article)}
                      >
                        <Delete></Delete>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
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

export default articlePage;
