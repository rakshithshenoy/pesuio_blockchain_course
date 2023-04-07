import React from "react";

export default function Card(props) {
  return (
    <div
      className={`w-[20%] border-2 border-solid border-[#330e0e]  mb-12 ${
        props.title === "people" ? "h-[500px]" : "h-[300px]"
      } `}
    >
      <img src={props.cardImage}></img>
      <p>Title: {props.title}</p>
      <p className="border-blue-500 border-4 p-4 m-2">
        Description: {props.description}
      </p>
      <p className="bg-red-700 text-red-200">Price: {props.price}</p>
    </div>
  );
}
