import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import circle from "./assets/circle.png";
import cross from "./assets/cross.png";
import edit from './assets/edit.png'
import { withRouter } from "react-router-dom";
import setting from "./assets/setting.png";
import { Button } from "reactstrap";
import { CROSS, CIRCLE, GAMEOVER } from "./context/constant";
import { MySymbolContext } from "./context/context";

var items = new Array(9).fill("empty");
const App = ({ history }) => {
  const [state, setState] = useState({
    symbol: CROSS,
    crossScore: 0,
    circleScore: 0,
    message: null,
  });

  const { symbol, crossScore, circleScore, message } = state;

  const { stateSymbol } = useContext(MySymbolContext);

  useEffect(() => {
    setState({
      symbol: stateSymbol,
      crossScore: 0,
      circleScore: 0,
      message: null,
    });
  }, []);

  const onPress = (index) => {
    if (items[index] === "empty") {
      items[index] = symbol === CROSS ? CROSS : CIRCLE;
      setState({
        symbol: symbol === CROSS ? CIRCLE : CROSS,
        crossScore: crossScore,
        circleScore: circleScore,
        message: null,
      });
    }
    var winner = winLogic();
    if (winner) {
      if (winner === GAMEOVER) {
        setState({
          symbol: stateSymbol,
          crossScore: crossScore,
          circleScore: circleScore,
          message: GAMEOVER,
        });
        return;
      }
      setState({
        symbol: stateSymbol,
        crossScore: winner === CROSS ? crossScore + 1 : crossScore,
        circleScore: winner === CIRCLE ? circleScore + 1 : circleScore,
        message: winner + " Win's",
      });
    }
  };

  const getIcon = (val) => {
    switch (val) {
      case CROSS:
        return cross;
      case CIRCLE:
        return circle;
      default:
        return edit;
    }
  };

  const winLogic = () => {
    if (
      items[0] !== "empty" &&
      items[0] === items[1] &&
      items[0] === items[2]
    ) {
      return items[0];
    } else if (
      items[3] !== "empty" &&
      items[3] === items[4] &&
      items[3] === items[5]
    ) {
      return items[3];
    } else if (
      items[6] !== "empty" &&
      items[6] === items[7] &&
      items[6] === items[8]
    ) {
      return items[6];
    } else if (
      items[0] !== "empty" &&
      items[0] === items[3] &&
      items[0] === items[6]
    ) {
      return items[0];
    } else if (
      items[1] !== "empty" &&
      items[1] === items[4] &&
      items[1] === items[7]
    ) {
      return items[1];
    } else if (
      items[2] !== "empty" &&
      items[2] === items[5] &&
      items[2] === items[8]
    ) {
      return items[2];
    } else if (
      items[0] !== "empty" &&
      items[0] === items[4] &&
      items[0] === items[8]
    ) {
      return items[0];
    } else if (
      items[2] !== "empty" &&
      items[2] === items[4] &&
      items[2] === items[6]
    ) {
      return items[0];
    } else if (!items.includes("empty")) {
      return GAMEOVER;
    }
  };

  const reset=()=>{
    items = Array(9).fill("empty");
    setState({
      symbol: stateSymbol,
      crossScore: crossScore,
      circleScore: circleScore,
      message: null,
    });
  }

  return (
    <div className="d-flex full-height justify-content-center align-items-center flex-column">
      {message ? (
        <div className="d-flex flex-column justify-content-end flex-grow-1">
          <div
            className={`d-flex alert ${
              message === GAMEOVER ? "alert-danger" : "alert-info"
            }`}
          >
            {message}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="d-flex flex-column justify-content-center flex-grow-3">
        <div className="d-flex justify-content-between">
          <h5 className="rounded-pill p-2">{CROSS}</h5>
          <h5 className="rounded-pill shadow p-2 bg-white">
            {crossScore} : {circleScore}
          </h5>
          <h5 className="rounded-pill p-2">{CIRCLE}</h5>
        </div>
        <div className="d-flex flex-wrap justify-content-center align-items-center bg-light m-1 rounded">
          {items.map((val, index) => {
            return (
              <Button
                className="play-button btn-outline-light border-0 bg-white"
                color="white"
                onClick={() => onPress(index)}
              >
                <img
                  className="bg-transparent"
                  src={getIcon(val)}
                  width="60px"
                  height="60px"
                />
              </Button>
            );
          })}
        </div>
      </div>
      <div className="d-flex flex-column justify-content-start flex-grow-1 flex-column">
        {message ? (
          <Button color="primary" onClick={reset} className="rounded-pill shadow mb-3">
            One more game
          </Button>
        ) : (
          ""
        )}
        <div className="d-flex justify-content-center align-content-center">
          <Button color="light" className="rounded-circle shadow">
            <img src={setting} className="bg-transparent" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(App);
