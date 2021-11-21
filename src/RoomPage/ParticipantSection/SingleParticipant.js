import React from 'react'
import store from '../../store/store'
import setActiveConversation from '../../store/actions'
function SingleParticipant(props) {
    const { identity, lastItem, participant, setActiveConversationAction, socketId } = props;
    const handleOpenActiveChatBox = () => {
        if (participant.socketId !== socketId) {
            // setActiveConversationAction(participant);
            // store.dispatch(setActiveConversation(participant));
            try { store.dispatch(setActiveConversation(participant))}
            catch (e) {
                console.log('====================================');
                console.log(e);
                console.log('====================================');
            }
        }
    }
    return <>
        <p
            className="participants_paragraph"
            onClick={handleOpenActiveChatBox}

        >{identity}
        </p>
        {
            !lastItem && <span className="participants_seperator_line"></span>
        }
    </>
}
export default SingleParticipant;
