import './App.css'
import React from "react";

const App = () => {
  const incQty = () => {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value = value * 5;
    document.getElementById('number').value = value;
  };

  const decQty = () => {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    if(value === 1){
      value = 1;
    }else{
      value = value / 5;
    }
    document.getElementById('number').value = value;
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <form className='space'>
          <input type='text' id='number' value='1' />
        </form>

        <div className='buttonss'>
          <button className='btn1'
            onClick={() => {
              incQty();
            }}
          >
            +
          </button>

          <button className='btn2'
            onClick={() => {
              decQty();
            }}
          >
            -
          </button>
        </div>

        <button className='buyBTN'>
            BUY NOW
        </button>

      </header>
    </div>
  );
};

export default App;
