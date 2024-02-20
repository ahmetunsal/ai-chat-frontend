import React from 'react'
import '../../assets/css/chatpage.css'
import { Icon } from 'semantic-ui-react'

function ChatItem({ name, id }) {


    // if the name is too long, shorten it
    if (name && name.length > 20) {
        name = name.substring(0, 20) + '...'
    } else if (!name) {
        // TODO : get the name from the database
        let a = 'A friendly hello!'
        name = a.length > 25 ? a.substring(0, 25) + '...' : 'A friendly hello!'
    }

    return (
        <div className="chat-item">
            <div className="chat-info">
                {name}
            </div>
            <div className="chat-options">
                <Icon name='box' size='small' />
                <Icon name='trash' size='small' />
            </div>
        </div>
    )
}

export default ChatItem