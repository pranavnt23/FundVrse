import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests
import './Auction.css'; // Import the CSS file

const Auction = () => {
  const nextAuctionDate = new Date();
  nextAuctionDate.setHours(nextAuctionDate.getHours() + 24); // Example auction in 24 hours

  const [biddingAmount, setBiddingAmount] = useState('');
  const [round, setRound] = useState(1);
  const [lowestBid, setLowestBid] = useState(null);
  const [isWinner, setIsWinner] = useState(null);
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);
  const [biddedAmounts, setBiddedAmounts] = useState([]); // Array to store the bid amounts

  // User ID and Scheme ID (you'll need to replace these with actual values)
  const userId = 'user_id_here'; // Replace with actual user ID from your auth context or props
  const schemeId = 'scheme_id_here'; // Replace with actual scheme ID

  const getDayName = (date) => {
    const options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  // Function to handle bidding
  const handleBidding = async () => {
    const bid = parseInt(biddingAmount, 10);

    if (!isNaN(bid)) {
      // Update the lowest bid if necessary
      if (lowestBid === null || bid < lowestBid) {
        setLowestBid(bid);
      }

      // Move to the next round or determine if the user won
      if (round < 3) {
        setRound(round + 1);
      } else {
        const won = Math.random() < 0.5; // Simulate a win with a 50% chance
        setIsWinner(won);
        setMonthlyInstallment(won ? Math.round(bid / 12) : 0); // Monthly installment calculation

        // Prepare the data to send to the server
        const data = {
          userId,
          schemeId,
          bidAmount: bid,
          hasWon: won
        };

        // Send bid information to the server
        try {
          const response = await axios.post('/bid', data);
          setBiddedAmounts(response.data.bidded_amount); // Update bidded amounts from the response
          console.log(response.data); // Log the response from the server
        } catch (error) {
          console.error('Error placing bid:', error); // Handle any errors
        }
      }

      setBiddingAmount(''); // Clear the input field after bidding
    }
  };

  // Fetch bidded amounts on component mount
  useEffect(() => {
    const fetchBiddedAmounts = async () => {
      try {
        const response = await axios.get(`/bids/${userId}/${schemeId}`);
        setBiddedAmounts(response.data.bidded_amount || []); // Set bidded amounts from the response
        console.log(response.data.bidded_amount); // Log bidded amounts
      } catch (error) {
        console.error('Error fetching bids:', error); // Handle fetch error
      }
    };

    fetchBiddedAmounts();
  }, [userId, schemeId]);

  return (
    <div className="auction-container">
      <h2>NEXT AUCTION</h2>
      <div className="auction-details">
        <p className="auction-item">Date: {nextAuctionDate.toLocaleDateString()}</p>
        <p className="auction-item">Day: {getDayName(nextAuctionDate)}</p>
        <p className="auction-item">Time: {nextAuctionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>

      <div className="bidding-status">
        <h3>AUCTION STATUS: Live</h3>
        <br />
        <p>Lowest Amount: ₹{lowestBid !== null ? lowestBid : 'N/A'}</p>
        <p>Bidding Round: {round}</p>
      </div>

      <input
        type="number"
        value={biddingAmount}
        onChange={(e) => setBiddingAmount(e.target.value)}
        placeholder="Enter your bidding amount"
        className="bidding-input"
      />
      <button onClick={handleBidding} className="bidding-button">BID</button>

      <div className="bidded-amounts">
        <h3>Your Previous Bids</h3>
        <ul>
          {biddedAmounts.map((amount, index) => (
            <li key={index}>Bid {index + 1}: ₹{amount}</li>
          ))}
        </ul>
      </div>

      {round === 3 && isWinner !== null && (
        <div className="result">
          <h3>RESULT</h3>
          {isWinner ? (
            <>
              <p>Congratulations! You won!</p>
              <p>Winning amount: ₹{lowestBid} will be deposited in your account within 24 hours.</p>
              <p>Your Monthly Installment: ₹{monthlyInstallment}</p>
              <button className="pay-button">Pay Now</button>
            </>
          ) : (
            <>
              <p>Better luck next time!</p>
              <p>Your Monthly Installment: ₹{monthlyInstallment}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Auction;
