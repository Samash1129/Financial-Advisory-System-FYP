from openai import OpenAI
import json

client = OpenAI(
    api_key="LL-uPxu7hdEQZ1K1xW2DM5oowyk1UPSHLXItdPDo21I0XbGZAxTLHLmCwFItZrtNnHz",
    base_url="https://api.llama-api.com"
)

# Load existing conversation history from a JSON file
history_file_path = "conversation_history.json"
try:
    with open(history_file_path, "r") as history_file:
        conversation_history = json.load(history_file)
except FileNotFoundError:
    conversation_history = []

def openai_chat(prompt):
    # Define the model name and create a conversation object
    model_name = "llama-7b-chat"
    conversation = [
        {"role": "system", "content": "You are an assistant for elev8.ai that helps naive investors in investing in the Pakistan Stock Exchange, your job is to refine and simplify the data provided to you and discuss only the facts given with the user."},
        {"role": "user", "content": prompt}
    ]

    # Add conversation history to the current conversation
    conversation.extend(conversation_history)

    # Make the API call
    response = client.chat.completions.create(
        model=model_name,
        messages=conversation
    )

    # Extract and return the assistant's reply
    reply = response.choices[0].message.content
    return reply

# Main loop for user interaction
print("Chat with the elev8's assistant. Type 'exit' to end the conversation.")

while True:
    user_input = input("You : ")
    
    if user_input.lower() == 'exit':
        break
    
    # Add user's message to the conversation
    conversation_history.append({"role": "user", "content": user_input})
    
    # Get the assistant's reply
    assistant_reply = openai_chat(user_input)
    
    # Print the assistant's reply
    print("elev8.ai :", assistant_reply)

# Save the updated conversation history to the JSON file
with open(history_file_path, "w") as history_file:
    json.dump(conversation_history, history_file, indent=2)
