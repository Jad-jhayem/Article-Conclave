import styles from "@/styles/ContactUs.module.scss";
import "bootstrap/dist/css/bootstrap.css";

const contactUs = () => {
  return (
    <div className={styles.container}>
      <div className="mb-3 d-grid gap-2">
        <label for="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">
          your message
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="7"
        ></textarea>
      </div>
    </div>
  );
};
export default contactUs;
