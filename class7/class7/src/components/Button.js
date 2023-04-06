import React from "react";

const Button = (props) => {
  return (
    <button
      onClick={() => {
        console.log(typeof props.type, typeof props.number);
        let v;
        if (props.type == "subtract") {
          v = parseInt(props.number) - 1;
        } else {
          v = parseInt(props.number) + 1;
        }
        props.setNumber(v);
      }}
      className="bg-[#201f1f] text-[#fff] text-2xl rounded-full w-8 h-8 flex justify-center items-center border-2 border-[#fff]"
    >
      <p> {props.data}</p>
    </button>
  );
};

export default Button;
