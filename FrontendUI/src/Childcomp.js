import React from "react";
import './Childcomp.css';

/*function Disp(props) {
    return (
        <>
            <h2>Name : </h2><h3>{props.nme}</h3>
            <h2>Age : </h2><h3>{props.age}</h3>
            <h2>Occupation : </h2><h3>{props.occupation}</h3>
        </>
    );
}

function Childcomp() {
    const info = { nme: "ReactJs", age: "18", occupation: "Student" };

    return (
        <>
        <center>
            <Disp nme={info.nme} age={info.age} occupation={info.occupation} />
        </center>
        </>
    );
}*/
function Childcomp({ data }) {
  return (
    <div>
      <h2>Details Entered:</h2>
      <p>Name: {data.name}</p>
      <p>Age: {data.age}</p>
      <p>Occupation: {data.occupation}</p>
    </div>
  );
}

export default Childcomp;
