import { useParams } from "react-router-dom"

const EventDetails = () => {
    const eventId = useParams().eventId
    console.log(eventId)
    return (
        <>
            <p>Event Details</p>
        </>
    )
}

export default EventDetails