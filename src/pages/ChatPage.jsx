import React, { useEffect } from 'react'
import PastChat from '../componens/PastChat'
import Chat from '../componens/Chat'
import '../assets/css/chatpage.css'

function ChatPage() {

    const [isProfileOpen, setIsProfileOpen] = React.useState(false);

    useEffect(() => {
        const isProfileOpen = localStorage.getItem('isProfileOpen')
        if (isProfileOpen) {
            setIsProfileOpen(true)
        }
    }, []);

    // close the profile when clicked outside of the profile
    window.onclick = function (event) {
        let profile = document.getElementById('profile-settings')
        console.log(event.target.className)
        if (event.target.id !== "profile-settings" && event.target.className !== 'profile-info' && event.target.className !== 'profile-img') {
            profile.style.display = 'none'
            isProfileOpen && setIsProfileOpen(false)
            localStorage.setItem('isProfileOpen', false);
        }
    }

    return (
        <div className='chat-page'>
            <PastChat />
            <Chat />
        </div>
    )
}

export default ChatPage