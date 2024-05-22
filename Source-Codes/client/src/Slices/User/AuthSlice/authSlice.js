import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: false,
    name: '',
    email: '',
    preferences: {
        investmentGoals: '',
        riskTolerance: '',
        amountToInvest: 0,
        preferredIndustries: [],
        stockType: '',
    },
    conversations: [],
    currentChatHistory: [],
    currentTicker: '',
    currentConvoID: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            const { token, name, email, preferences, conversations, currentChatHistory, currentTicker, currentConvoID } = action.payload
            state.token = token;
            state.name = name;
            state.email = email;
            state.preferences = preferences || initialState.preferences;
            state.conversations = conversations || initialState.conversations;
            state.currentChatHistory = currentChatHistory || initialState.currentChatHistory;
            state.currentTicker = currentTicker || initialState.currentTicker;
            state.currentConvoID = currentConvoID || initialState.currentConvoID;
            
            console.log("*** Redux Store ***")
            console.log("Token:", state.token);
            console.log("Name:", state.name);
            console.log("Email:", state.email);
            console.groupCollapsed("Preferences:");
            console.log("> investmentGoals:", state.preferences.investmentGoals);
            console.log("> riskTolerance:", state.preferences.riskTolerance);
            console.log("> amountToInvest:", state.preferences.amountToInvest);
            console.log("> preferredIndustries:", state.preferences.preferredIndustries);
            console.log("> stockType:", state.preferences.stockType);
            console.groupEnd();
            console.log("Conversations:", state.conversations);
            console.log("Current Chat History:", state.currentChatHistory);
            console.log("Current Ticker:", state.currentTicker);
            console.log("Current ConvoID:", state.currentConvoID);

        },
        
        updateConversations: (state, action) => {
            const newConvo = action.payload;
            const existingIndex = state.conversations.findIndex(convo => convo.conversationID === newConvo.conversationID);
            
            if (existingIndex !== -1) {
                state.conversations[existingIndex] = {
                    ...state.conversations[existingIndex],
                    lastModified: newConvo.lastModified
                };
            } else {
                state.conversations.push(newConvo);
            }
        
            //console.log("Conversations:", state.conversations);
        },
        
        updateCurrentChatHistory: (state, action) => {
            const currentChatHistory = action.payload;
            state.currentChatHistory = currentChatHistory;
            console.log("Current Chat History:", state.currentChatHistory);
        },
        updateCurrentTicker: (state, action) => {
            const currentTicker = action.payload;
            state.currentTicker = currentTicker;
            console.log("Current Ticker:", state.currentTicker);
        },
        updateCurrentConvoID: (state, action) => {
            const convoID = action.payload;
            state.currentConvoID = convoID;
            console.log("Current Convo ID:", state.currentConvoID);
        },
        removeUserData: (state) => {
            state.token = false;
            state.name = '';
            state.email = '';
            state.preferences = initialState.preferences;
            state.conversations = initialState.conversations;
            state.currentChatHistory = initialState.currentChatHistory;
            state.currentTicker = initialState.currentTicker;
            state.currentConvoID = initialState.currentConvoID;
        }
    }
})

export const { setUserData, removeUserData, updateConversations, updateCurrentChatHistory, updateCurrentTicker, updateCurrentConvoID } = authSlice.actions;
export default authSlice.reducer;