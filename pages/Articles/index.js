import styles from "@/styles/articlePage.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLogIn } from "@/context/LogIn";

const articlePage = () => {
  //state to store articles fetched from database so we can update it immediately on the screen
  const [articles, setArticles] = useState([]);
  const { userName } = useLogIn();

  const url = process.env.NEXT_PUBLIC_URL;

  // fetch function to call api
  const fetch = async () => {
    let res = await axios.get(`${url}/api/articles/fetch`);
    let data = res.data.articles;
    setArticles(data);
  };

  // calls fetch function on initial render
  useEffect(() => {
    fetch();
  }, []);
  console.log(userName);
  return (
    <div className={styles.container}>
      {/* map goes by every article 1 by 1 */}
      {articles.map((article, index) => (
        <div key={index} className={styles.articles}>
          <div className={styles.articleTitle}>{article.title}</div>
          <div className={styles.dateAndCategory}>
            <div className={styles.articleDate}>{article.date_published}</div>
            <div className={styles.articleCategory}>{article.category}</div>
          </div>
          <div className={styles.articleContent}>{article.content}</div>
          <div className={styles.articleAuthor}>{userName}</div>
        </div>
      ))}
    </div>
  );
};

export default articlePage;
