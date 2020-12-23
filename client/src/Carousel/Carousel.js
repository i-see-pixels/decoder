import React from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./styles.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 1, itemsToShow: 1 },
  { width: 1, itemsToShow: 1 },
  { width: 1200, itemsToShow: 4 },
];

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Mission/Vission</h1>
      <div className="App">
        <Carousel breakPoints={breakPoints}>
        <Item><img src="https://bit.ly/2KHkuic" /> </Item>  
        <Item><img src="https://bit.ly/2KHkuic" /> </Item>  
        <Item><img src="https://bit.ly/2KHkuic" /> </Item>  
        <Item><img src="https://bit.ly/2KHkuic" /> </Item>  
        <Item><img src="https://bit.ly/2KHkuic" /> </Item>  
        <Item><img src="https://bit.ly/2KHkuic" /> </Item>  
        </Carousel>
      </div>
    </>
  );
}

export default App;