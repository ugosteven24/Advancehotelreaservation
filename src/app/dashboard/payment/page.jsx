"use client";

import { useState } from "react";
import "./payment.css";

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Visa",
      number: "•••• •••• •••• 4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      number: "•••• •••• •••• 8810",
      expiry: "08/26",
      isDefault: false,
    },
  ]);

  const [transactions] = useState([
    {
      id: 1,
      date: "Oct 24, 2023",
      property: "The Grand Horizon Suite",
      amount: "$1,250.00",
      status: "Completed",
    },
    {
      id: 2,
      date: "Sep 12, 2023",
      property: "Alpine Retreat Cabin",
      amount: "$850.00",
      status: "Completed",
    },
    {
      id: 3,
      date: "Jul 05, 2023",
      property: "Oceanview Villa",
      amount: "$3,400.00",
      status: "Completed",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleAddPayment = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleDownload = (transaction) => {
    alert(`Downloading receipt for ${transaction.property}`);
  };

  return (
    <main className={`payment-page ${darkMode ? "dark-mode" : ""}`}>
      {/* Top Header */}
      <header className="payment-header">
        <h2>Payment Methods &amp; Billing</h2>

        <div className="header-actions">
          <button
            className="icon-button"
            title="Language"
            onClick={() => alert("Language settings")}
          >
            <span className="material-symbols-outlined">
              language
            </span>
          </button>

          <button
            className="icon-button"
            title="Dark mode"
            onClick={() => setDarkMode(!darkMode)}
          >
            <span className="material-symbols-outlined">
              dark_mode
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="payment-content">

        {/* Saved Payment Methods */}
        <section className="payment-section">

          <div className="section-header">
            <h3>Saved Payment Methods</h3>

            <button
              className="add-payment-button"
              onClick={handleAddPayment}
            >
              <span className="material-symbols-outlined">
                add
              </span>

              Add New
            </button>
          </div>

          <div className="payment-cards">

            {paymentMethods.map((payment) => (
              <div
                className="payment-card"
                key={payment.id}
              >
                {/* Background Icon */}
                <div className="card-background-icon">
                  <span className="material-symbols-outlined">
                    credit_card
                  </span>
                </div>

                {/* Card Header */}
                <div className="payment-card-header">

                  <span className="card-type">
                    {payment.type}
                  </span>

                  {payment.isDefault && (
                    <span className="default-badge">
                      Default
                    </span>
                  )}

                </div>

                {/* Card Details */}
                <div className="payment-card-details">

                  <p className="card-number">
                    {payment.number}
                  </p>

                  <p className="card-expiry">
                    Expires {payment.expiry}
                  </p>

                </div>
              </div>
            ))}

          </div>
        </section>


        {/* Recent Transactions */}
        <section className="payment-section">

          <div className="section-header">
            <h3>Recent Transactions</h3>

            <button
              className="view-all-button"
              onClick={() => alert("Showing all transactions")}
            >
              View All

              <span className="material-symbols-outlined">
                chevron_right
              </span>
            </button>
          </div>


          {/* Desktop / Tablet Table */}
          <div className="transactions-container">

            <table className="transactions-table">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Property</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th className="receipt-column">
                    Receipt
                  </th>
                </tr>
              </thead>

              <tbody>

                {transactions.map((transaction) => (
                  <tr key={transaction.id}>

                    <td className="transaction-date">
                      {transaction.date}
                    </td>

                    <td className="transaction-property">
                      {transaction.property}
                    </td>

                    <td className="transaction-amount">
                      {transaction.amount}
                    </td>

                    <td>
                      <span className="status-badge">
                        {transaction.status}
                      </span>
                    </td>

                    <td className="receipt-column">

                      <button
                        className="download-button"
                        onClick={() =>
                          handleDownload(transaction)
                        }
                        title="Download receipt"
                      >
                        <span className="material-symbols-outlined">
                          download
                        </span>
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {/* Mobile Transactions */}
          <div className="mobile-transactions">

            {transactions.map((transaction) => (
              <div
                className="mobile-transaction-card"
                key={transaction.id}
              >

                <div className="mobile-transaction-top">

                  <div>
                    <span className="mobile-label">
                      Date
                    </span>

                    <p className="mobile-date">
                      {transaction.date}
                    </p>
                  </div>

                  <span className="status-badge">
                    {transaction.status}
                  </span>

                </div>

                <div className="mobile-property">

                  <span className="mobile-label">
                    Property
                  </span>

                  <p>
                    {transaction.property}
                  </p>

                </div>

                <div className="mobile-transaction-bottom">

                  <div>
                    <span className="mobile-label">
                      Amount
                    </span>

                    <p className="mobile-amount">
                      {transaction.amount}
                    </p>
                  </div>

                  <button
                    className="download-button"
                    onClick={() =>
                      handleDownload(transaction)
                    }
                  >
                    <span className="material-symbols-outlined">
                      download
                    </span>
                  </button>

                </div>

              </div>
            ))}

          </div>

        </section>

      </div>


      {/* Add Payment Modal */}
      {showAddModal && (
        <div
          className="modal-overlay"
          onClick={handleCloseModal}
        >

          <div
            className="payment-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <h3>
                Add Payment Method
              </h3>

              <button
                className="modal-close"
                onClick={handleCloseModal}
              >
                <span className="material-symbols-outlined">
                  close
                </span>
              </button>

            </div>

            <div className="modal-body">

              <div className="form-group">

                <label>
                  Card Type
                </label>

                <select>
                  <option>Visa</option>
                  <option>Mastercard</option>
                  <option>American Express</option>
                </select>

              </div>

              <div className="form-group">

                <label>
                  Card Number
                </label>

                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                />

              </div>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Expiry Date
                  </label>

                  <input
                    type="text"
                    placeholder="MM/YY"
                  />

                </div>

                <div className="form-group">

                  <label>
                    CVV
                  </label>

                  <input
                    type="text"
                    placeholder="123"
                  />

                </div>

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="cancel-button"
                onClick={handleCloseModal}
              >
                Cancel
              </button>

              <button
                className="save-button"
                onClick={() => {
                  alert("Payment method added");
                  handleCloseModal();
                }}
              >
                Save Card
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}