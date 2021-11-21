import React from 'react'
import { connect } from 'react-redux'
import SingleParticipant from './SingleParticipant'
import { nanoid } from 'nanoid'
import setActiveConversation from '../../store/actions'
// function SingleParticipant(props) {
//     const { identity, lastItem, participant, setActiveConversationAction, socketId } = props;
//     const handleOpenActiveChatBox = () => {
//         console.log('====================================');
//         console.log('surpoise');
//         console.log('====================================');
//         if (participant.socketId !== socketId) {

//             console.log('====================================');
//             console.log(setActiveConversationAction);
//             console.log('====================================');
//             try { setActiveConversationAction(participant) }
//             catch (e) {
//                 console.log('====================================');
//                 console.log(e);
//                 console.log('====================================');
//             }
//         }
//     }
//     return <>
//         <p className="participants_paragraph" onClick={handleOpenActiveChatBox}>
//         {identity}
//         </p>
//         {
//             !lastItem && <span className="participants_seperator_line"></span>
//         }
//     </>
// }

function Participants({ participants, socketId, setActiveConversationAction }) {
    return (
        <div className="participants_container">
            {
                participants.map((participant, index) => {
                    return (
                        <SingleParticipant
                            key={`${participant.identity}${participant.socketId}`}
                            lastItem={participants.length === index + 1}
                            participant={participant}
                            identity={participant.identity}
                            setActiveConversationAction={setActiveConversationAction}
                            socketId={socketId}
                        />

                    )

                })
            }

        </div>
    )
}
const mapStoreStateToProps = (state) => {
    return {
        ...state,
    }
}
const mapActionsToProps = (dispatch) => {
    return {
        setActiveConversationAction: (activeConversation) => {dispatch(setActiveConversation(activeConversation))},
    }
}
export default connect(mapStoreStateToProps, mapActionsToProps)(Participants);
