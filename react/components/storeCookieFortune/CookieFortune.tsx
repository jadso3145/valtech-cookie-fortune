import React, { useState } from "react";
import { useIntl } from "react-intl";

import { luckyNum } from "../../utils/getLuckyNum";
import { fetchFortune } from "../../utils/fetchFortune";
import styles from "./styles.css";
import { textVariables } from "../../utils/messages";
import confetti from "canvas-confetti";

const CookieFortune = () => {
  const [cookiemsg, setCookiemsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [luckyNumber, setLuckyNumber] = useState<string>("");
  const [showMsg, setShowMsg] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const intl = useIntl();
  const { formatMessage } = intl;

  const getDataMsg = async () => {
    setLoading(true);
    const fortune = await fetchFortune();

    if (fortune) {
      setCookiemsg(fortune);
      setLuckyNumber(luckyNum());
    }

    setTimeout(() => setLoading(false), 700);
  };

  const handleClick = () => {
    setShowMsg(true);
    getDataMsg();
    if (loading === false) {
     setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
     }, 900);

    }
  };

  return (
    <main
      className={`flex items-center justify-center h-100 ${styles.mainDiv}`}
    >
      <div className={styles.contentContainer}>
        {loading ? (
          <span className={styles.loader} />
        ) : showMsg && cookiemsg ? (
          <div className={styles.cookieMsg}>
            <div className={styles.textContainer}>
              <h3 className={styles.cookieMsgText}>{cookiemsg}</h3>
              <h5 className={styles.luckyNum}>{luckyNumber}</h5>
            </div>
            <img src="https://i.postimg.cc/QxM0dvHd/cookie2.jpg" alt="Fortune Cookie 2" />
          </div>
        ) : (
          <div className={styles.cookieCloseImg}>
            <img
              src="https://i.postimg.cc/0jy1VZZ2/cookie1.jpg"
              alt="Fortune Cookie"
              className={`${styles.cookieImage} ${
                isShaking ? styles.shake : ""
              }`}
              onMouseOver={() => setIsShaking(true)}
              onMouseOut={() => setIsShaking(false)}
            />
          </div>
        )}
      </div>

      <button
        onClick={handleClick}
        disabled={loading}
        onMouseOver={() => setIsShaking(true)}
        onMouseOut={() => setIsShaking(false)}
      >
        {loading
          ? formatMessage(textVariables.loading)
          : formatMessage(textVariables.getYourFortune)}
      </button>
    </main>
  );
};

export default CookieFortune;
