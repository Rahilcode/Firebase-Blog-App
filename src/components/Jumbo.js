import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
const Jumbo = () => {
  return (
    <div>
      <img
        style={{ height: "90vh", objectFit: "cover" }}
        className="d-block w-100"
        src="https://img.freepik.com/free-vector/son-father-home-library-son-busy-dad_107791-8661.jpg?size=626&ext=jpg"
        alt="jumbotron"
      />
      <Carousel.Caption>
        <h3>Explore the latest Articles</h3>
        <p>Be Up To Date with what is going on around the world.</p>
      </Carousel.Caption>
    </div>
  );
};

export default Jumbo;
