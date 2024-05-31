import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import Elevy from "../../Assets/SVGs/Elevy.svg";
import ElevyGPT from "../../Assets/SVGs/ElevyGPT.svg";
import Send from "../../Assets/SVGs/send.svg";
import user from "../../Assets/SVGs/User.svg";
import Disclaimer from "../../Assets/SVGs/Info.svg";
import GraphPanel from "../GraphPanel";
import { useElevychatMutation } from "../../Slices/StockSlice/stockApiSlice";
import { useSaveConversationMutation, useCheckPythonQuery } from "../../Slices/User/UserSlice/userApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { updateConversations, updateCurrentChatHistory, updateCurrentTicker, updateCurrentConvoID } from "../../Slices/User/AuthSlice/authSlice";
import { bankNames } from "../../constants";
import ErrorIcon from '@mui/icons-material/Error';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ArrowForward } from "@mui/icons-material";
import { styled } from '@mui/system';

const SkeletonLoader = () => (
  <div className={styles.skeletonContainer}>
    <div className={styles.skeletonIcon}></div>
    <div className={styles.skeletonText}></div>
  </div>
);

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 1)',
  width: '100%',
  borderRadius: '6px',
  fontFamily: '"Outfit", sans-serif',
  fontWeight: 400,
  lineHeight: 'normal',
  paddingRight: '0',
  height: '55px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const SendMessageButton = styled(ArrowForward)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '0px 18px',
  color: 'white',
  cursor: 'pointer',
  right: '0',
  height: '55px',
  fontSize: '25px',
  borderTopRightRadius: '6px',
  borderBottomRightRadius: '6px'
}));

const ElevyChat = ({pyRunning}) => {
  const userState = useSelector(state => state.auth);
  const userChatHistory = useSelector(state => state.auth.currentChatHistory);
  
  const [chat] = useElevychatMutation();
  const [saveConvoID] = useSaveConversationMutation();
  const [message, setMessage] = useState("");
  const [userInputs, setUserInputs] = useState([]);
  const [responses, setResponses] = useState([]);
  const psrSummaryContainerRef = useRef(null);
  const dispatch = useDispatch();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    }
    setUserInputs([...userInputs, message]);
    setMessage("");
    try {
      const response = await chat({ user_input: message, conversation_id: userState.currentConvoID, ticker: userState.currentTicker });
 
      const conversationID = response.data.conversation_id;
      const ticker = userState.currentTicker;
      dispatch(updateCurrentConvoID(conversationID));
      const saveResponse = await saveConvoID({conversationID, ticker}); 
      
      const newConversation = {
        conversationID: saveResponse.data.conversationID,
        ticker: saveResponse.data.ticker,
        lastModified: saveResponse.data.lastModified
      };
    
      dispatch(updateConversations(newConversation));
        
      console.log(response);
      setResponses([...responses, response.data.conversation_history[response.data.conversation_history.length - 1].content]);
      
    } catch (error) {
      console.error("Error occurred while fetching chat response:", error);
    }
  };
  
  const handleMessageChange = (e) => {
   setMessage(e.target.value);
  };

  useEffect(() => {
    dispatch(updateCurrentTicker(""));
  }, []);

  useEffect(() => {
    psrSummaryContainerRef.current.scrollTop = psrSummaryContainerRef.current.scrollHeight;
  }, [responses, userInputs]);

  useEffect(() => {
    psrSummaryContainerRef.current.scrollTop = 0;
}, [userState.currentTicker]);


  useEffect(() => {

    if (pyRunning===1 && userState.currentTicker!= "")
    {
    // existing chat
      if (userState.currentChatHistory.length !== 0) 
      {
      
        let chatHistory = userChatHistory.data;
        let userInputsFromHistory = chatHistory.filter(entry => entry.role === 'user').map(entry => entry.content);
        let responsesFromHistory = chatHistory.filter(entry => entry.role === 'assistant').map(entry => entry.content);
        setUserInputs(userInputsFromHistory);
        setResponses(responsesFromHistory);
      }
      // new chat
      else
      {
        setUserInputs([]);
        setResponses([]);
      }
    }
  }, [userState.currentChatHistory]);

  return (
    <div className={styles.psrOverallContainer}>
      <div className={`${styles.psrContainer} ${userState.currentTicker === "" ? styles.overlay : ''}`}>
        <div className={styles.psrHeader}>
          <img src={ElevyGPT} alt="Reports" className={styles.psrIcon} />
          <div className={styles.psrTitleContainer}>
            <div className={styles.psrMainTitle}>Elevy -</div>
            <div className={styles.psrCompanyTitle}>
            {userState.currentTicker && bankNames.find(bank => bank.tickerSymbol === userState.currentTicker)?.securityName}
            </div>
          </div>
        </div>

        
        <div ref={psrSummaryContainerRef} className={styles.psrSummaryContainer}>

        {pyRunning===0 && <div>
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                </div>}
          
        {pyRunning===1 && userState.currentTicker!="" && (<GraphPanel /> )}

        {pyRunning===-1 && (
        <div className={styles.errorText}><ReportProblemIcon className={styles.warningIcon}/>
        &nbsp;&nbsp;Elevy can't be initialized
        </div>
        )}

        {pyRunning===1 && userState.currentTicker == "" && (
        <div className={styles.blankText}>
        Select a recommended stock or load a previous chat <br/>to initiate a conversation with Elevy
        </div>
        )}


  {pyRunning===1 && userState.currentConvoID == "" && userState.currentTicker!="" && (
  <p className={styles.newChat}>New Elevy chat, Welcome!</p> 
  )}
  
  
  {pyRunning===1 && userState.currentTicker!="" && userInputs.map((input, index) => (
    <React.Fragment key={index}>
      
       <hr className={styles.psrSummaryDivider} />
      <div className={styles.psrSummaryItem}>
        <img src={user} alt="User" className={styles.psrSummaryIcon} />
        <p className={styles.psrSummaryParagraph}>{input}</p>
      </div>
      {responses[index] && (
        <div className={styles.psrSummaryItem}>
          <img src={Elevy} alt="Assistant" className={styles.psrSummaryIcon} />
          <p className={styles.psrSummaryParagraph}>{responses[index]}</p>
        </div>
      )}
     
    </React.Fragment>
  ))}
</div>
      </div>

        
      {pyRunning===1 && userState.currentTicker!="" && (
      <div className={styles.psrInputContainer}>
        <form onSubmit={handleSubmit}>
        <StyledOutlinedInput
            placeholder="Message Elevy"
            value={message}
            onChange={handleMessageChange}
            endAdornment={
              <InputAdornment position="end">
                <SendMessageButton onClick={handleSubmit}/>
              </InputAdornment>
            }
            
          />
          </form>
      </div> )}
        

      {pyRunning===1 && userState.currentTicker!="" && (
      <div className={styles.DisclaimerContainer}>
        <p className={styles.psrDisclaimerParagraph}>
          Elevy can make mistakes. Always verify important information.
        </p>
      </div> )}
      
    </div>
  );
};

export default ElevyChat;
