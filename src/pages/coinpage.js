import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CryptoState } from "../Cryptocontext";
import { SingleCoin } from "../config/api";
import { LinearProgress, Typography, makeStyles } from "@material-ui/core";
import Coininfo from "../components.js/coininfo";
import { numberWithCommas } from "../components.js/Banner/carousel";
import { doc } from "@firebase/firestore";
import { db } from "../firebase";
import ReactHtmlParser from "react-html-parser";
import { setDoc } from "firebase/firestore";
import { setsEqual } from "chart.js/helpers";

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setcoin] = useState();

  const { currency, symbol, user, watchlist, setalert } = CryptoState();

  const fetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setcoin(data);
  };

  console.log(coin);

  useEffect(() => {
    fetchCoins();
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketdata: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const inwatchlist = watchlist.includes(coin?.id);

  const addtowatchlist = async () => {
    const coinref = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinref, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });

      setalert({
        open: true,
        message: `${coin.name} Added to the whichlist !`,
        type: "success",
      });
    } catch (error) {
      setalert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />

        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>

        <Typography varient="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>

        <div className={classes.marketdata}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              current price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market cap :{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
            </Typography>
          </span>

          {user && (
            <button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#EEBC1D",
              }}
              onClick={addtowatchlist}
            >
              {inwatchlist ? "Remove from watchlist " : "Add to Watchlist"}
            </button>
          )}
        </div>
      </div>

      <Coininfo coin={coin} />
    </div>
  );
};

export default Coinpage;
