// import React, { useState } from "react";
// import styles from "./styles.module.css";
// import BackButton from "../../Assets/SVGs/Vector1.svg";
// import ProcessingPopup from "../ProcessingPopup";

// const PaymentScreen = () => {
//   const [email, setEmail] = useState("");
//   const [cardInfo, setCardInfo] = useState({
//     number: "",
//     expiry: "",
//     cvc: "",
//     name: "",
//   });
//   const [address, setAddress] = useState({ country: "", line1: "", city: "" });

//   const [emailError, setEmailError] = useState("");
//   const [cardNumberError, setCardNumberError] = useState("");
//   const [expiryError, setExpiryError] = useState("");
//   const [cvcError, setCvcError] = useState("");
//   const [nameError, setNameError] = useState("");

//   const updateCardInfo = (key, value) => {
//     setCardInfo({ ...cardInfo, [key]: value });
//   };

//   const updateAddress = (key, value) => {
//     setAddress({ ...address, [key]: value });
//   };

//   const [showPopup, setShowPopup] = useState(false);
//   const [isProcessingComplete, setIsProcessingComplete] = useState(false);
//   const [isProcessingFailed, setIsProcessingFailed] = useState(false);

//   const handleFailedTransaction = () => {
//     setIsProcessingFailed(true); // Set state to indicate failed transaction
//     setShowPopup(true); // Open the popup to show the failure
//   };

//   const completeProcessing = () => {
//     setTimeout(() => {
//       setIsProcessingComplete(true);
//     }, 1000);
//   };

//   const openPopup = () => {
//     setShowPopup(true);
//     // Simulate processing completion after a delay
//     setTimeout(() => {
//       setIsProcessingComplete(true);
//       setIsProcessingFailed(false);
//     }, 2000); // Delay of 2 seconds
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//     setIsProcessingComplete(false); // Reset processing state on close
//   };

//   const validateEmail = (email) => {
//     const re =
//       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
//     return re.test(String(email).toLowerCase());
//   };

//   const validateCardNumber = (number) => {
//     // Basic validation for demo purposes
//     return number.length === 16;
//   };

//   const validateExpiry = (expiry) => {
//     const re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
//     return re.test(String(expiry));
//   };

//   const validateCVC = (cvc) => {
//     return cvc.length === 3;
//   };

//   const validateName = (name) => {
//     return name.length > 1;
//   };

//   const handleCardNumberChange = (e) => {
//     const newNumber = e.target.value;
//     updateCardInfo("number", newNumber);
//     // Set error only if there is some input, otherwise clear error
//     setCardNumberError(
//       newNumber && !validateCardNumber(newNumber) ? "Invalid card number" : ""
//     );
//   };

//   const handleExpiryChange = (e) => {
//     const newExpiry = e.target.value;
//     updateCardInfo("expiry", newExpiry);
//     // Set error only if there is some input, otherwise clear error
//     setExpiryError(
//       newExpiry && !validateExpiry(newExpiry) ? "Invalid expiry date" : ""
//     );
//   };

//   const handleCvcChange = (e) => {
//     const newCvc = e.target.value;
//     updateCardInfo("cvc", newCvc);
//     // Set error only if there is some input, otherwise clear error
//     setCvcError(newCvc && !validateCVC(newCvc) ? "Invalid CVC" : "");
//   };

//   const handleNameChange = (e) => {
//     const newName = e.target.value;
//     updateCardInfo("name", newName);
//     // Set error only if there is some input, otherwise clear error
//     setNameError(
//       newName && !validateName(newName) ? "Name cannot be single lettered" : ""
//     );
//   };

//   const handleEmailChange = (e) => {
//     const newEmail = e.target.value;
//     setEmail(newEmail);
//     // Set error only if there is some input, otherwise clear error
//     setEmailError(
//       newEmail && !validateEmail(newEmail) ? "Invalid email address" : ""
//     );
//   };

//   return (
//     <div className={styles.paymentScreen}>
//       <div className={styles.leftPanel}>
//         <div
//           className={styles.backButton3Container}
//           onClick={() => window.history.back()}
//         >
//           <img src={BackButton} alt="Back" className={styles.backArrow3} />
//           <span className={styles.backTitle3}>BACK</span>
//         </div>
//         <h1>Subscribe to Elev8 Premium</h1>
//         <div className={styles.priceInfo}>
//           <span className={styles.price}>Rs.2000</span>
//           <span className={styles.perMonth}>Per Month</span>
//         </div>
//         <div className={styles.breakdown}>
//           <div className={styles.breakdownRow}>
//             <span>Elev8 Premium Subscription</span>
//             <span>Rs.2000</span>
//           </div>
//           <div className={styles.breakdownRow}>
//             <span>Billed monthly</span>
//             <span></span>
//           </div>
//           <hr className={styles.divider} />
//           <div className={`${styles.breakdownRow} ${styles.total}`}>
//             <strong>Total Amount</strong>
//             <strong>Rs.2000</strong>
//           </div>
//         </div>
//       </div>
//       <div className={styles.rightPanel}>
//         <div className={styles.inputGroup}>
//           <label>Contact Information</label>
//           <input
//             type="email"
//             value={email}
//             onChange={handleEmailChange}
//             placeholder="Enter your Email Address"
//           />
//           {emailError && (
//             <span className={styles.errorMessage1}>{emailError}</span>
//           )}
//         </div>
//         <div className={styles.inputGroup}>
//           <label>Payment Method</label>
//           <div className={styles.verticalLine1}></div>
//           <label>Card Info</label>
//           <input
//             type="text"
//             value={cardInfo.name}
//             onChange={handleNameChange}
//             placeholder="Enter your Card Holder Name"
//           />
//           {nameError && (
//             <span className={styles.errorMessage1}>{nameError}</span>
//           )}
//           <input
//             type="text"
//             value={cardInfo.number}
//             onChange={handleCardNumberChange}
//             placeholder="Enter your Card Number"
//           />
//           {cardNumberError && (
//             <span className={styles.errorMessage1}>{cardNumberError}</span>
//           )}
//           <div className={styles.cardDetailsRow}>
//             {" "}
//             {/* This is the new container for MM/YY and CVC */}
//             <input
//               type="text"
//               value={cardInfo.expiry}
//               onChange={handleExpiryChange}
//               placeholder="MM/YY"
//               className={styles.expiryInput} // Class to style MM/YY input
//             />
//             {expiryError && (
//               <span className={styles.errorMessage1}>{expiryError}</span>
//             )}
//             <input
//               type="text"
//               value={cardInfo.cvc}
//               onChange={handleCvcChange}
//               placeholder="CVC"
//               className={styles.cvcInput} // Class to style CVC input
//             />
//             {cvcError && (
//               <span className={styles.errorMessage1}>{cvcError}</span>
//             )}
//           </div>
//         </div>
//         <div className={styles.verticalLine1}></div>
//         <div className={styles.inputGroup}>
//           <label>Billing Address</label>
//           <input
//             type="text"
//             value={address.line1}
//             onChange={(e) => updateAddress("line1", e.target.value)}
//             placeholder="Enter your Address Line"
//           />
//           <div className={styles.addressRow}>
//             <input
//               type="text"
//               value={address.city}
//               onChange={(e) => updateAddress("city", e.target.value)}
//               placeholder="Enter your City"
//             />
//             <input
//               type="text"
//               value={address.country}
//               onChange={(e) => updateAddress("country", e.target.value)}
//               placeholder="Enter your Country"
//             />
//           </div>
//           <button className={styles.subscribeButton} onClick={openPopup}>
//             Subscribe
//           </button>
//         </div>
//       </div>
//       {showPopup && (
//         <ProcessingPopup
//           onClose={closePopup}
//           isProcessingComplete={isProcessingComplete}
//           isProcessingFailed={isProcessingFailed}
//         />
//       )}
//     </div>
//   );
// };

// export default PaymentScreen;
