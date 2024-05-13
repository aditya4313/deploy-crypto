import { Container, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Carousel from "./carousel";

const useStyles = makeStyles(() => ({
    Banner: {
        backgroundImage: "url(./banner2.jpg)",
    },
    bannercontent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline:{
        display: "flex",
        height: "40%" ,
        flexDirection: "column",
        justifyContent: "center",
        justifyContent: "center",
    }
}));

const Banner = () => {
    const classes = useStyles();

    return (
        <div className={classes.Banner}>
            <Container className={classes.bannercontent}>

                <div className={classes.tagline}>

                    <Typography
                        variant = "h2"
                        style = {{
                            fontWeight : " bold",
                            marginBottom : 15,
                            fontFamily : "Montserrat",
                            display: "flex",
                            justifyContent: "center",
                        }}
                        >
                            Crypto Hunter
                         
                    </Typography> 
                    <Typography
                        variant = "subtitle2"
                        style = {{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                            justifyContent: "center",
                            display: "flex",
                        }}
                        >
                            Get all the info regarding your favorite Crypto currency

                    </Typography>

                </div>
                <Carousel />
            </Container>
        </div>
    );
};

export default Banner;
