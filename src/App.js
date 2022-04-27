import React from "react";
import data from "./alldata.json";
import Viewport from "./Viewport";

function App() {
  const [state, setState] = React.useState(data);

  function initLoad(datum) {
    if(Array.isArray(datum)) {
      return 1 + Math.max(...datum.map(initLoad));
    } //redundant for now
    if(datum.deep_childrens && datum.deep_childrens.length) {
      return 1 + Math.max(...datum.deep_childrens.map(initLoad));
    }
    return 0
  }

  //let sum =0
  function letThisWork(datum) {
    function initLoadSum(datum) {
      sum += datum.pools.reduce((prevValue, currValue) => {
        return Number(currValue.staked_amount) + prevValue
      }, 0);
      if(datum.deep_childrens && datum.deep_childrens.length) {
        return datum.deep_childrens.map(initLoadSum).at(-1);
      }
      return sum;
    }
    let sum=0; //these 3 lines r imp to initialize everytime with 0 sum
    initLoadSum(datum);
    return sum;
  }

  function dataClean() {
    setState(prevState => {
      return prevState.map(item => {
        return {
          ...item,
          level: initLoad(item)+1,
          total_staked: letThisWork(item)
        }
      })
    })
  }

  React.useEffect(()=> {
    dataClean()
  },[])

  return (
    <div className="App">
      <h1>Level Selector</h1>
      <Viewport mainData={state} />
    </div>
  );
}

export default App;
