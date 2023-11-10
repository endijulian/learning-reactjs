import React, { Fragment, useState } from "react";
import "./HelloWorld.css";

function HelloWorld(props) {
  const [isTrue, setIsTrue] = useState(true);

  const toggleTrue = () => {
    if (isTrue) {
      setIsTrue(false);
      return;
    }

    setIsTrue(true);
  };

  return (
    <>
      <hr />
      <h1 className="h1-green">{props.msg}</h1>
      {isTrue && (
        <>
          <p>The current value of isTrue is true</p>
          <hr />
        </>
      )}
      <hr />
      {isTrue ? <p>Is True</p> : <p>Is False</p>}

      <a href="#!" className="btn btn-outline-secondary" onClick={toggleTrue}>
        Toggle isTrue
      </a>
    </>
  );
}

export default HelloWorld;
