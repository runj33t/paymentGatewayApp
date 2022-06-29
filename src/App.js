import './App.css'
import axios from 'axios';
import React, { useState } from "react";

const App = () => {

  const [book, setBook] = useState({
    name: 'The fault in our stars',
    author: 'John Green',
    img: 'https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg',
    price: 250,
  })

  let [qty, setQty] = useState(0);

  let incQty = () => {
    if (qty < 10) {
      setQty(Number(qty) + 1);
    }
  };

  let decQty = () => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };

  //payment methods:

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_d6inGlb6eukqoH",
      amount: data.amount,
      currency: data.currency,
      name: "Ureem Fashion and Technology",
      description: "Test Transaction",
      image: "http://localhost:8080/logo.png",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:8080/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:8080/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: book.price * qty });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='App'>
      <header className='App-header'>
        <div className="App">
          <div className="book_container">
            <img src={book.img} alt="book_img" className="book_img" />
            <p className="book_name">{book.name}</p>
            <p className="book_author">By {book.author}</p>
            <p className="book_price">
              Price : <span>&#x20B9; {book.price}</span>
            </p>

            <button className='qty' type='button' onClick={decQty}> - </button>
            <p className='book_price'>QTY : {qty}</p>
            <button className='qty' type='button' onClick={incQty}> + </button>

            <p className='book_price'>Total Price : {book.price * qty} </p>

            <button onClick={handlePayment} className="buy_btn">
              buy now
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
