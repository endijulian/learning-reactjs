import React, { Component } from "react";
import "./App.css";
import Input from "./Input";

export default class AppClass extends Component {
  constructor(props) {
    super(props);

    this.lastNameRef = React.createRef(null);
    this.firstNameRef = React.createRef();
    this.dobRef = React.createRef();

    this.state = {
      isTrue: false,
      crowd: [],
    };
  }

  setfirstName(newName) {
    this.setState({ firstName: newName });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.firstName !== "") {
      this.addPerson(this.state.firstName, this.state.lastName, this.state.dob);
    }
  };

  addPerson(newFirst, newLast, newDob) {
    let newPerson = {
      id: this.state.crowd.length + 1,
      firstName: newFirst,
      lastName: newLast,
      dob: newDob,
    };

    const newList = this.state.crowd.concat(newPerson);

    const sorted = newList.sort((a, b) => {
      if (a.lastName < b.lastName) {
        return -1;
      } else if (a.lastName > b.lastName) {
        return 1;
      }

      return 0;
    });

    this.setState({ crowd: sorted });
    this.setState({ firstName: "", lastName: "", dob: "" });

    this.firstNameRef.current.value = "";
    this.lastNameRef.current.value = "";
    this.dobRef.current.value = "";
  }

  componentDidMount() {
    this.setState({
      firstName: "",
      lastName: "",
      dob: "",
      crowd: [
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
      ],
    });
  }

  toggleTrue = () => {
    if (this.state.isTrue) {
      this.setState({
        isTrue: false,
      });

      return;
    }
    this.setState({
      isTrue: true,
    });
  };

  render() {
    return (
      <>
        <hr />
        <h1 className="h1-green">{this.props.msg}</h1>
        {this.state.isTrue && (
          <>
            <p>The current value of isTrue is true</p>
            <hr />
          </>
        )}
        <hr />
        {this.state.isTrue ? <p>Is True</p> : <p>Is False</p>}

        <a
          href="#!"
          className="btn btn-outline-secondary"
          onClick={this.toggleTrue}
        >
          Toggle isTrue
        </a>

        <hr></hr>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="first-name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              name="first-name"
              ref={this.firstNameRef}
              id="first-name"
              className="form-control"
              autoComplete="first-name-new"
              onChange={(event) => this.setfirstName(event.target.value)}
            />
          </div>

          <Input
            title="Last Name"
            type="text"
            ref={this.lastNameRef}
            name="last-name"
            autoComplete="last-name-new"
            className="form-control"
            onChange={(event) =>
              this.setState({ lastName: event.target.value })
            }
          ></Input>

          <Input
            title="DOB"
            type="date"
            name="dob"
            ref={this.dobRef}
            autoComplete="dob-new"
            className="form-control"
            onChange={(event) => this.setState({ dob: event.target.value })}
          ></Input>

          <input
            type="submit"
            value="Submit"
            className="btn btn-primary"
          ></input>
        </form>

        <div>
          First Name : {this.state.firstName} <br />
          Last Name : {this.state.lastName}
          <br />
          DOB Name : {this.state.dob}
          <br />
        </div>

        <hr></hr>
        <h3>People</h3>
        <ul className="list-group">
          {this.state.crowd.map((m) => (
            <li key={m.id} className="list-group-item">
              {m.firstName}
            </li>
          ))}
        </ul>
      </>
    );
  }
}
