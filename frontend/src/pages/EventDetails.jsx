import { useParams } from "react-router-dom"
import useFetch from "../useFetch"
import Header from "../components/Header";

const EventDetails = () => {
    const eventId = useParams().eventId
    const { data, loading, error } = useFetch(`http://localhost:3000/events/${eventId}`);
    console.log(data)

    return (
        <>
            <Header />
            {loading && <p className="text-center">Loading...</p>}
            { data && (
                <div className="container pt-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between">
                        <div className="col-md-6 mb-5">
                            <h1>{data.title}</h1>
                            <p>Hosted By:</p>
                            <p>{data.hostedBy}</p>
                            <img src={data.coverImage} alt={data.title} className="img-fluid mt-4 mb-3" />
                            <h4>Details:</h4>
                            <p className="pt-2">{data.description}</p>
                            <h4 className="mt-3">Additional Information:</h4>
                            <p><strong>Dress Code:</strong> {data.dressCode}</p>
                            <p><strong>Age Restrictions:</strong> {data.ageRestrictions}</p>
                            <h4 className="mt-3">Event Tags:</h4>
                            {data.tags.map(tag => (
                                <span className="btn btn-danger btn-sm me-4">{tag}</span>
                            ))}
                        </div>
                        <div className="col-md-4 mb-5">
                            <div  className="bg-light p-3">
                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                    <i class="fa-solid fa-clock"></i>
                                    <div className="flex-fill ms-2">
                                    <p>{new Date(data.sessionStartTime).toDateString()} at {new Date(data.sessionStartTime).toLocaleTimeString()} to</p>
                                    <p>{new Date(data.sessionEndTime).toDateString()} at {new Date(data.sessionEndTime).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                    <i class="fa-solid fa-location-dot"></i>
                                    <div className="flex-fill ms-2">
                                    <p>{data.address.venue}</p>
                                    <p>{data.address.street}, {data.address.city}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-start">
                                    {data.price && <i class="fa-solid fa-indian-rupee-sign"></i>}
                                    <p className="ms-2">{data.price}</p>
                                </div>
                            </div>
                            <div className="mt-5">
                                <h4>Speakers: ({data.EventSpeakers.length})</h4>
                                <div className="d-flex flex-row flex-md-column flex-lg-row justify-content-start">
                                {data.EventSpeakers.map((speaker) => (
                                    <div key={speaker._id} className="text-bg-success p-3 m-2 d-flex flex-column align-items-center rounded-2">
                                        <img src={speaker.profileUrl} alt={speaker.fullName} className="img-fluid rounded-circle"/>
                                        <p className="text-center"><strong>{speaker.fullName}</strong></p>
                                        <p className="text-center">{speaker.post}</p>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </>
    )
}

export default EventDetails