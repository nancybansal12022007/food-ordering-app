import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
    //console.log("Parnet constructor");
  }
  render() {
    //console.log("Parent Render");
    return (
      <div className="p-10 m-4 text-center">
        <h1 className="font-bold">About Us Page</h1>
        <UserClass name={"Nancy Bansal"} location={"Indore"} />
      </div>
    );
  }
}

export default About;
