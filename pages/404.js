import styles from "@/styles/notFound.module.scss";
import React from "react";
import Image from "next/image";
import NotFound from "@/public/Pictures/notFound.jpg";

const notFound = () => {
  return (
    <div className={styles.Container}>
      <Image
        className={styles.image}
        src={NotFound}
        alt="page not found"
        height={1600}
        width={800}
      />
    </div>
  );
};
export default notFound;
