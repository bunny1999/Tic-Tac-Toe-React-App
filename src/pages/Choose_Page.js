import React,{useContext,useEffect} from "react";
import circle from "../assets/circle.png";
import cross from "../assets/cross.png";
import "../App.css";
import { withRouter } from "react-router-dom";
import { Button} from "reactstrap";
import { MySymbolContext } from "../context/context";
import { CROSS,CIRCLE } from "../context/constant";
import { CHANGESYMBOL } from "../context/action";

const ChoosePage = ({ history }) => {

  const {stateSymbol,dispatchSymbol} = useContext(MySymbolContext)

  useEffect(() => {
    dispatchSymbol({
      type:CHANGESYMBOL,
      payload:CROSS
    })
  }, [])

  const switchSymbol=(symbl)=>{
    dispatchSymbol({
      type:CHANGESYMBOL,
      payload:symbl===CROSS?CROSS:CIRCLE
    })
  }

  return (
    <div className="d-flex flex-column full-height justify-content-center align-items-center">
      <div className="d-flex flex-grow-1 justify-content-center align-items-center">
        <h3>Pick your side</h3>
      </div>
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <div className={`d-flex justify-content center align-items-center flex-column ${stateSymbol===CIRCLE?'blur':''}`} onClick={()=>switchSymbol(CROSS)} >
            <img className="mb-3" src={cross} />
            <input className="radio-button" name="mysymbl" type="radio" checked={stateSymbol===CROSS?true:null}/>
          </div>
          <div className="align-self-stretch border-right ml-2 mr-2"></div>
          <div className={`d-flex justify-content center align-items-center flex-column ${stateSymbol===CROSS?'blur':''}`} onClick={()=>switchSymbol(CIRCLE)}>
            <img className="mb-3" src={circle} />
            <input className="radio-button" name="mysymbl" type="radio" checked={stateSymbol===CIRCLE?true:null}/>
          </div>
        </div>
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <Button className="rounded-pill shadow" color="light" onClick={()=>history.push("/play")}>
            Continue
          </Button>
        </div>
    </div>
  );
};

export default withRouter(ChoosePage);
