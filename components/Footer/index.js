import styles from "./footer.module.scss";
import Image from "next/image";
import Logo from "../../public/pictures/Logo.png";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

const Footer = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_URL;

  const addNewsletter = async () => {
    if (checked) {
      const data = { name: name, email: email };
      axios
        .post(`${url}/api/newsLetter/addsub`, data)
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
      router.push("/Articles");
    }
  };

  const handleEmail = (value) => {
    if (value.match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3}).\w+([.-]?\w+)+$/)) {
      setEmail(value);
    } else {
      setEmail(null);
    }
  };

  return (
    <div className={styles.footerContainer}>
      <div className={styles.logo}>
        <Image src={Logo} width={80} height={80} alt="Logo image" />
      </div>

      <div className={styles.followUs}>
        <div className={styles.component}>
          <Facebook fontSize="medium" />
        </div>

        <div className={styles.component}>
          <Instagram fontSize="medium" />
        </div>

        <div className={styles.component}>
          <Twitter fontSize="medium" />
        </div>
      </div>
      <div className={styles.subscribe}>
        <p className={styles.subParagraphe}>Subscribe now for weekly updates</p>
        <form className={styles.form}>
          <div className={styles.formItem}>
            <TextField
              variant="standard"
              type="text"
              size="small"
              className={styles.formInput}
              placeholder="name"
              aria-label="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className={styles.formItem}>
            <TextField
              variant="standard"
              type="email"
              size="small"
              className={styles.formInput}
              placeholder="email"
              aria-label="email"
              onChange={(e) => {
                handleEmail(e.target.value);
              }}
            />
          </div>

          <Button
            className={styles.formButton}
            type="submit"
            onClick={addNewsletter}
          >
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Footer;
