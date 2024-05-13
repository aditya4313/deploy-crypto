import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components.js/header";
import Homepage from "./pages/homepage";
import Coinpage from "./pages/coinpage";
import { makeStyles } from "@material-ui/core";
import Alert from "./components.js/Banner/alert";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coins/:id" element={<Coinpage />} />
      </Routes>

      <Alert />
    </div>
  );
}

export default App;
