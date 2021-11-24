import React from 'react'
import store from '../../store/store'
import setActiveConversation from '../../store/actions'
function SingleParticipant(props) {
    const {
        identity,
        lastItem,
        participant,
        setActiveConversationAction,
        socketId
    } = props;
    const handleOpenActiveChatBox = () => {
        if (participant.socketId !== socketId) {
            // setActiveConversationAction(participant);
            // store.dispatch(setActiveConversation(participant));
            try {
                // console.log(typeof(setActiveConversationAction));
                // setActiveConversationAction(identity);++-+-
                console.log('====================================');
                console.log(participant);
                console.log('====================================');
                // store.dispatch(setActiveConversation(identity));
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    return <>
        <p
            className="participants_paragraph"
            onClick={handleOpenActiveChatBox}

        >
        {identity}

        </p>
        {
            !lastItem && <span className="participants_seperator_line"></span>
        }
    </>
}
export default SingleParticipant;
