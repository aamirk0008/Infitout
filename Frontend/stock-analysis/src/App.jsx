import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Chart2 from "./components/Chart2";
import Chart3 from "./components/Chart3";
import Chart4 from "./components/Chart4";

function App() {
  return (
   <>
    <div className="p-2">
      <div className="my-6">
        <h1 className="text-3xl font-bold text-center">
         Nifty-50 Stock Analysis using charts
        </h1>
      </div>
      <div className="w-full h-full flex flex-col shadow-2xl">
        <h2 className="text-xl pt-4 mx-2">Powered by <span className="font-bold italic text-red-600">Zerodha</span></h2>
        <div className="w-full h-full flex gap-4 py-4 flex-wrap items-center justify-center">
        <Home/>
        <Chart2/>
        <Chart3/>

        </div>
        {/* <Chart4/> */}
    </div>
    </div>
    </>
  );
}

export default App;
