import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function DonationPage() {
  const [donationAmount, setDonationAmount] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
        setDonationAmount(event.target.value);
  };

  const checkoutHandler = async (donationAmount) => {
    try {

      const { data: { key } } = await axios.get('https://donationapi-as45.onrender.com/api/getkey');
      const { data :{ order} } = await axios.post('https://donationapi-as45.onrender.com/api/checkout', {
        donationAmount
      });
    

      const options = {
        key:key,
        amount: order.donationAmount,
        currency: "INR",
        name: "Meal for every one",
        description: "Donation by RazorPay",
        image: "https://w7.pngwing.com/pngs/238/687/png-transparent-charitable-organization-donation-fundraising-foundation-computer-icons-giving-thumbnail.png",
        order_id: order.id,
        callback_url: "https://donationapi-as45.onrender.com/api/paymentverification",
        prefill: {
            name: "For Meal",
            email: "ForMeal@example.com",
            contact: "11111111"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121313"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open()
    razor.on('payment.success', (response) => {
      window.location.href = `https://donationapi-as45.onrender.com/api/paymentverification?razorpay_order_id=${response.razorpay_order_id}&razorpay_payment_id=${response.razorpay_payment_id}&razorpay_signature=${response.razorpay_signature}`;
    });

    
}

      
     catch (err) {
      if (err.response) {
       setError(err.response.data.message); 
      } else if (err.request) {
        setError('No response from the server');
      } else {
        setError('Request Error: ' + err.message);
      }
    }
  }




  return (
    <div className="donation-page">
      <header>
        <h1>Donate for Meals</h1>
      </header>
      <main>
        <section className="donation-section">
          <h2>Donate for Meals</h2>
          <p>Your generous donation will help provide meals to those in need.</p>
          <p>Please Fill Amount in This text Box for Donation</p>
          <input
            type='Number'
            value={donationAmount}
            onChange={handleInputChange}
          />
          <button onClick={() =>checkoutHandler(donationAmount)}>Donate Now</button>
        </section>
        <section className="meal-images">
          <h2>Meal Serving</h2>
          <div className="image-container">
            <img src="https://missionsbox.org/wp-content/uploads/2019/08/Why-Are-So-Many-People-Hungry.jpg" alt="Meal 1" />
            <img src="https://blog.compassion.com/wp-content/uploads/2019/07/Hunger-is-on-the-rise-feature.jpg" alt="Meal 2" />
            <img src="http://amma.org/sites/default/files/styles/group_main/public/slides/hunger-slide1.jpg?itok=peEfpz-A" alt="Meal 3" />
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Donation Page</p>
      </footer>
    </div>
  );
}

export default DonationPage;
