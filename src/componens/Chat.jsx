import React, { useEffect, useState } from 'react'
import { GridColumn, Icon, Popup } from 'semantic-ui-react'
import '../assets/css/chatpage.css'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

function Chat() {

    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState('');
    //const [messages, setMessages] = useState([]);
    // get chatId from the params
    const user = localStorage.getItem('user');
    let chatId = useParams().id;
    

    
    const messages = [
        {
            id: 1,
            from: 'Ahmet Unsal',
            message: 'Hello',
            time: '12:00',
            imgURL: "https://lh3.googleusercontent.com/a/ALm5wu2V0_fS6NxtGusJemoZ4E60FoAPZUMK4dFu1s59=s96-c"
        },
        {
            id: 2,
            from: "Uretken AI",
            message: 'Hello, how can I help you today?',
            time: '12:00',
            imgURL: "https://pbs.twimg.com/profile_images/1623688354129666053/PPIPwUGJ_400x400.jpg",
            repliedMessageId: 1
        },
        {
            id: 3,
            from: 'Ahmet Unsal',
            message: 'How are you?',
            imgURL: "https://lh3.googleusercontent.com/a/ALm5wu2V0_fS6NxtGusJemoZ4E60FoAPZUMK4dFu1s59=s96-c",
            time: '12:00'
        },
        {
            id: 4,
            from: "Uretken AI",
            message: 'As an AI, I don\'t have feelings or emotions, but I\'m here and ready to assist you with any questions or tasks you have! How can I help you today?',
            time: '12:00',
            imgURL: "https://pbs.twimg.com/profile_images/1623688354129666053/PPIPwUGJ_400x400.jpg",
            repliedMessageId: 3
        }
    ];

    function handleInputChange(e) {
        const { value } = e.target
        setMessage(value)
    }


    function handleSubmit(e) {
        e.preventDefault();
        const msgInput = document.getElementById('prompt-input');
        if (message === '') return;
        setMessages([...messages, {
            id: uuid(),
            from: user.username || 'me',
            message: message,
            time: Date.now(),
            imgURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fdefault-user&psig=AOvVaw2AOrLSlSEnUxsB5Uf2nNS5&ust=1708434834682000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJCcn_e9t4QDFQAAAAAdAAAAABAD"
        }])
        !chatId ? chatId = uuid() : chatId = chatId;

        fetch('http://localhost:3000/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: message, user, chatId })
        })
            .then(res => res.json())
            .then(async data => {
                if (data.error) {
                    return alert(data.error);
                }
                await setMessages([...messages, {
                    id: data.id,
                    from: 'AhU',
                    message: data.repText,
                    time: Date.now(),
                    imgURL: "https://pbs.twimg.com/profile_images/1623688354129666053/PPIPwUGJ_400x400.jpg"
                }])
            })
            .catch(err => console.log(err));

        msgInput.value = ''
    }

    return (
        <div className='chat-section'>
            <div className="chat-messages">
                <div className="chat-header">
                    <div className="chat-info">
                        <h2>ÜretkenG
                            <Popup
                                trigger={<Icon name='info circle' color='white' size='tiny' />}
                                content={`This is a chatbot that is powered by Google\'s GEMINI. <b>N0t 4 r3al per5oN!??<b>`}
                                position='bottom center'
                            />
                        </h2>

                    </div>
                </div>
                <div className="messages">
                    {
                        messages.map((item, index) => {
                            return (
                                <div className="message">
                                    <div className="message-img">
                                        <img src={item.imgURL} alt="" />
                                    </div>
                                    <div className="message-content">
                                        <p>{item.from}</p>
                                        <p>{item.message} </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="chat-input">
                    <form onSubmit={handleSubmit} className="chat-bg">
                        <input id='prompt-input' onChange={handleInputChange} type="text" placeholder='Type a message' />
                        <button type='submit' className='btn'>
                            <Icon name='share' size='large' />
                        </button>
                    </form>
                    <p>This AI is powered by <a target='_blank' href="https://deepmind.google/technologies/gemini/#introduction">GEMINI</a></p>
                </div>
            </div>
            <div id='profile-settings' className="profile-dropdown">
                <Link className="profile-item">
                    <Icon name='user' size='small' />
                    Profile
                </Link>
                <Link className="profile-item">
                    <Icon name='setting' size='small' />
                    Settings
                </Link>
                <Link className="profile-item">
                    <Icon name='power off' size='small' />
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default Chat