import React, { useEffect, useState } from "react";
import styles from "./mail.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { QueryPostActiveAccount } from "../../services/queries/query-post.ts";
import { Button } from "@mui/material";

export const MailVerifyCode = () => {
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const findParams = new URLSearchParams(location.search);
  const queryPostActiveAccount = QueryPostActiveAccount();

  useEffect(() => {
    if (findParams.get("type") == "activeAccount") {
      queryPostActiveAccount.mutate({
        email: findParams.get("email"),
        verificationCode: findParams.get("code")
      });
      if (queryPostActiveAccount.isSuccess) {
        setType(findParams.get("type"));
      }
    } else if (findParams.get("type") == "forgotPassword") {
      navigate(`/reset-password/${findParams.get("code")}/${findParams.get("email")}`);
    }
  }, []);


  return <main style={{ marginTop: "100px", marginBottom: "10px", height: "70vh" }} className="main-content">
    <div className={styles.content}>
      <div className={styles.wrapper1}>
        <div className={styles.wrapper2}>
          <h1>Thank you !</h1>
          <p>Thanks for using our services. </p>
          <br />
          {type !== "" ? <p>👉 Your account has been actived 👈</p> : <p>Something wrong</p>}

          <Button className={styles.goHome} variant={"outlined"} onClick={() => navigate("/home")}>Go To Home
            Page</Button>
        </div>
        <br />
        <div className={styles.footerLike}>
          <p>Email not working?<br />
            <Button variant={"outlined"} onClick={() => window.location.reload()}>Click here to send again</Button>
          </p>
        </div>
      </div>
    </div>
  </main>;
};