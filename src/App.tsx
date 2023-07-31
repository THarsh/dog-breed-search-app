import React from "react";
import "./App.scss";
import Header from "./components/Header";
import Home from "./pages/Home";

export type dogsData = {
  name: string;
  breed_group: string;
  height: {
    metric: string;
  };
  life_span: string;
  reference_image_id: string;
};

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}

export default App;
