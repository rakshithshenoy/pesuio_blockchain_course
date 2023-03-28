import React from "react";

export default function Card(props) {
  return (
    <div className="w-[20%] border-2 border-solid border-[#330e0e] ml-12 mb-12">
      <img  src={props.cardImage}></img>
      <p >Title: {props.title}</p>
      <p className="border-blue-500 border-2 pl-4">Description: {props.description}</p>
      <p className="bg-red-700 text-red-200">Price: {props.price}</p>
    </div>
  );
}
