import React from "react";
import circle from "../assets/circle.png";
import cross from "../assets/cross.png";
import setting from "../assets/setting.png";
import "../App.css";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";

const FirstPage = ({ history }) => {
  return (
    <div className="d-flex flex-column full-height justify-content-center align-items-center">
      <div className="d-flex flex-grow-1 justify-content-center align-items-center">
        <div className="d-flex justify-content center align-items-center">
          <img src={cross} />
        </div>
        <div className="d-flex justify-content center align-items-center">
          <img src={circle} />
        </div>
      </div>
      <div className="d-flex flex-grow-1 justify-content-center align-items-center flex-column">
        <div className="d-flex justify-content-center flex-grow-1">
          <h3>Choose your play mode</h3>
        </div>
        <div className="d-flex justify-content-center flex-grow-1 flex-column">
          <Button color="primary" className="rounded-pill shadow mb-3">
            With AI
          </Button>
          <Button
            color="light"
            className="rounded-pill shadow"
            onClick={() => {
              history.push("/choose");
            }}
          >
            With a friend
          </Button>
        </div>
        <div className="d-flex justify-content-center flex-grow-1 flex-column align-items-start">
          <Button color="light" className="rounded-circle shadow">
            <img src={setting} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(FirstPage);
