import React, { Fragment, useState, useEffect, useRef } from "react";
import "./App.css";
import Input from "./Input";

function App(props) {
  const [isTrue, setIsTrue] = useState(true);
  const [crowd, setCrwod] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dob, setdob] = useState("");

  //refs
  const firstNameRef = useRef();
  const lastNameRef = useRef(null);
  const dobRef = useRef(null);

  const toggleTrue = () => {
    if (isTrue) {
      setIsTrue(false);
      return;
    }

    setIsTrue(true);
  };

  useEffect(() => {
    let people = [
      {
        id: 1,
        firstName: "Marry",
        lastName: "Jones",
        dob: "1997-05-02",
      },
      {
        id: 2,
        firstName: "John",
        lastName: "Smith",
        dob: "1986-03-14",
      },
    ];
    setCrwod(people);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(firstName, lastName, dob);
    if (lastName !== "") {
      addPerson(firstName, lastName, dob);
    }
  };

  const addPerson = (newFirst, newLast, newDOB) => {
    let newPerson = {
      id: crowd.length + 1,
      firstName: newFirst,
      lastName: newLast,
      dob: newDOB,
    };

    const newList = crowd.concat(newPerson);

    const sorted = newList.sort((a, b) => {
      if (a.lastName < b.lastName) {
        return -1;
      } else if (a.lastName > b.lastName) {
        return 1;
      }

      return 0;
    });

    setCrwod(sorted);
    setfirstName("");
    setlastName("");
    setdob("");

    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    dobRef.current.value = "";
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

      <hr></hr>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first-name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            name="first-name"
            ref={firstNameRef}
            id="first-name"
            className="form-control"
            autoComplete="first-name-new"
            onChange={(event) => setfirstName(event.target.value)}
          />
        </div>

        <Input
          title="Last Name"
          type="text"
          ref={lastNameRef}
          name="last-name"
          autoComplete="last-name-new"
          className="form-control"
          onChange={(event) => setlastName(event.target.value)}
        ></Input>

        <Input
          title="DOB"
          type="date"
          name="dob"
          ref={dobRef}
          autoComplete="dob-new"
          className="form-control"
          onChange={(event) => setdob(event.target.value)}
        ></Input>

        <input type="submit" value="Submit" className="btn btn-primary"></input>
      </form>

      <div>
        First Name : {firstName} <br />
        Last Name : {lastName}
        <br />
        DOB Name : {dob}
        <br />
      </div>

      <hr></hr>
      <h3>People</h3>
      <ul className="list-group">
        {crowd.map((m) => (
          <li key={m.id} className="list-group-item">
            {m.firstName}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
