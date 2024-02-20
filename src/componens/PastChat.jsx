import React, { useState } from 'react'
import '../assets/css/chatpage.css'
import { Icon } from 'semantic-ui-react'
import ChatItem from './cards/ChatItem'
import { Link } from 'react-router-dom'

function PastChat() {


    const [isProfileOpen, setIsProfileOpen] = useState(false);

    function openProfile() {
        let profile = document.getElementById('profile-settings')
        if (isProfileOpen) {
            profile.style.display = 'none'
            setIsProfileOpen(false)
            localStorage.setItem('isProfileOpen', false);
        } else {
            profile.style.display = 'flex'
            setIsProfileOpen(true)
            localStorage.setItem('isProfileOpen', true);
        }
    }

    function handleContextMenu(e) {
        e.preventDefault();
    }
    
    return (
        <div className='past-chat'>
            <button type='button' className='new-chat'>
                <div>
                    <Icon name='plus square' size='large' />
                    New Chat
                </div>
                <div className="text">
                    <Icon name='edit' size='small' />
                </div>
            </button>
            <hr />
            <div className="past-chat-up">
                <div className="chats">
                    <h3>
                        <Icon name='history' size='small' />
                        Past Chats
                    </h3>
                    {
                        // TODO : get the chats from the database
                        [1].map((item, index) => (
                            <ChatItem key={index} />
                        ))
                    }
                </div>
            </div>
            <div className="past-chat-down">
                <div className="try-premium">
                    <Link to='https://www.buymeacoffee.com/ahmetunsal' target='_blank' className='premium-btn'>
                        <div className="left">
                            <Icon name='coffee' size='small' />
                            Buy me a coffee
                        </div>
                        <Icon name='external' size='small' />
                    </Link>
                    <div onClick={openProfile} onContextMenu={handleContextMenu} id='profile' className="profile">
                        <div className="profile-info">
                            <img draggable={"false"} width={50} src="https://lh3.googleusercontent.com/a/ALm5wu2V0_fS6NxtGusJemoZ4E60FoAPZUMK4dFu1s59=s96-c" alt="" />
                            Ahmet Unsal
                        </div>
                        <Icon name='angle right' size='small' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PastChat