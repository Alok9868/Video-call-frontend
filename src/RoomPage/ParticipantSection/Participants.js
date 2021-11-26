import React from 'react'
import { connect } from 'react-redux'
import SingleParticipant from './SingleParticipant'
import { setActiveConversation } from '../../store/actions'
import { nanoid } from 'nanoid'
function Participants({ participants, socketId, setActiveConversationAction }) {
    return (
        <div className="participants_container">
            {
                participants.map((participant, index) => {
                    return (
                        <SingleParticipant
                            key={`${participant.identity}-${participant.socketId}${nanoid()}`}
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
        setActiveConversationAction: (activeConversation) => {

            dispatch(setActiveConversation(activeConversation))


        },
    }
}
export default connect(mapStoreStateToProps, mapActionsToProps)(Participants);
