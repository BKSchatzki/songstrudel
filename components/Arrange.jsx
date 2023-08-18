import React from "react";

const Arrange = ({ arrangement, setArrangement, submitting, handleSubmit }) => {
  return (
    <section className="mx-auto flex w-11/12 flex-col items-center justify-center text-center">
      <h1 className="mx-4 mt-4 max-w-xl text-3xl font-bold sm:text-4xl">
        Letting You{" "}
        <span className="bg-gradient-to-t from-red-500 to-amber-500 bg-clip-text text-transparent">
          Cook
        </span>
      </h1>
    </section>
  );
};

export default Arrange;
