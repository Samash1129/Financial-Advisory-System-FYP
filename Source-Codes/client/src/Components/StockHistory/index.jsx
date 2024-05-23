import { React, useState, useEffect } from 'react';
import styles from './styles.module.css';
import stockicon from '../../Assets/SVGs/stock-icon.svg';
import techicon from '../../Assets/SVGs/tech-icon.svg';
import bankicon from '../../Assets/SVGs/bank-icon.svg';
import History from '../../Assets/SVGs/History.svg';
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentChatHistory, updateCurrentTicker, updateCurrentConvoID } from "../../Slices/User/AuthSlice/authSlice";
import { useFetchChatHistoryMutation } from "../../Slices/StockSlice/stockApiSlice";
import { bankNames } from "../../constants";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';


const StockHistory = ({ pyRunning }) => {

    const userState = useSelector((state) => state.auth);
    const [sortedChats, setSortedChats] = useState([]);
    const dispatch = useDispatch();
    const [chatHistory] = useFetchChatHistoryMutation();

    useEffect(() => {
        const chats = userState.conversations.slice().sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
        setSortedChats(chats);
    }, [userState.conversations]);

    const handleItemClick = async (conversationID, ticker) => {
        const history = await chatHistory({ conversation_id: conversationID });
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

            <ul className={styles.shSearchResults}>
                {pyRunning == true && sortedChats.map((conversation, index) => (
                    <li
                        className={`${styles.shSearchItem} ${conversation.conversationID === userState.currentConvoID && userState.currentTicker != "" ? styles.highlight : ''}`}
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

                {(pyRunning != true || sortedChats.length === 0) &&
                    <div className={pyRunning !== true ? styles.errorText : styles.blankText}>
                        {pyRunning !== true && <ReportProblemIcon className={styles.warningIcon} />}
                        {pyRunning !== true ? "  Chats can't be loaded" : "No chats to show"}
                    </div>}
            </ul>

        </div>
    );
};

export default StockHistory;