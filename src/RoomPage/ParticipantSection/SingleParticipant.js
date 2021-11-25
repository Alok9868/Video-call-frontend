import React from 'react'
import store from '../../store/store'
import setActiveConversation from '../../store/actions'
function SingleParticipant(props) {
    const {
        lastItem,
        participant,
        identity,
        setActiveConversationAction,
        socketId
    } = props;
    const handleOpenActiveChatBox = () => {


        console.log('====================================');
        console.log('executed',participant.socketId);
        console.log('====================================');
        if (participant.socketId !== socketId) {
            // setActiveConversationAction(participant);
            // store.dispatch(setActiveConversation(participant));
            try {
                console.log('====================================');
                store.dispatch(setActiveConversation(identity));
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    return <>
        <button
            className="participants_paragraph"
            onClick={handleOpenActiveChatBox}
        >
        {identity}
        </button>
        {
            !lastItem && <span className="participants_seperator_line"></span>
        }
    </>
}
export default SingleParticipant;
