import {React, useEffect } from 'react';
import styles from './styles.module.css';
import stockicon from '../../Assets/SVGs/stock-icon.svg';
import techicon from '../../Assets/SVGs/tech-icon.svg';
import bankicon from '../../Assets/SVGs/bank-icon.svg';
import History from '../../Assets/SVGs/History.svg';
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentChatHistory, updateCurrentTicker, updateCurrentConvoID } from "../../Slices/User/AuthSlice/authSlice";
import { useFetchChatHistoryMutation } from "../../Slices/StockSlice/stockApiSlice";
import { bankNames } from "../../constants";


const StockHistory = ({pyRunning}) => {

    const userState = useSelector((state) => state.auth);
    let chats = userState.conversations;
    chats = chats.slice().reverse();
    const dispatch = useDispatch();
    const [chatHistory] = useFetchChatHistoryMutation();

    const handleItemClick = async (conversationID, ticker) => {
        const history = await chatHistory({ conversation_id: conversationID});
        dispatch(updateCurrentChatHistory(history));
        dispatch(updateCurrentTicker(ticker));
        dispatch(updateCurrentConvoID(conversationID));
    };

    return (
        <div className={styles.shSearchContainer}>
            <div className={styles.sRecent}>
                <img src={History} alt="Recommended" className={styles.sRecentIcon} />
                <div className={styles.sRecentTitle}>Chat History</div>
            </div>

            {pyRunning!=true || chats.length === 0 ? (
                <div className={pyRunning !== true ? styles.errorText : styles.blankText}>
                {pyRunning !== true ? "Chats couldn't be loaded" : "No chats to show"}
                </div>
            ) : (
                
            <ul className={styles.shSearchResults}>
                {pyRunning==true && chats.map((conversation, index) => (
                    <li 
                    className={`${styles.shSearchItem} ${conversation.conversationID === userState.currentConvoID && userState.currentTicker!="" ? styles.highlight : ''}`}
                    key={index} 
                    onClick={() => handleItemClick(conversation.conversationID, conversation.ticker)}>
                        <span className={styles.listNumber}>{index + 1}</span>
                        <div className={styles.shItemInfo}>             
                        <div className={styles.shSymbol}>
                        {bankNames.find(bank => bank.tickerSymbol === conversation.ticker)?.securityName} &nbsp;({conversation.ticker})
                        </div>
                        </div>
                    </li>
                ))}
            </ul>
        )}
        </div>
    );
};

export default StockHistory;