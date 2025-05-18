import { Link } from "react-router";
import useFetch from "../useFetch";
import { useState } from "react";

const Meetings = () => {
  const { data, loading, error } = useFetch("https://meetup-app-backend-red.vercel.app/events");
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("")

  const filteredList = data?.filter((meeting) => {
    const haveSelectedEvents = selectedValue === "" ? true : meeting.eventType === selectedValue
    const haveSearchedEvents = searchValue === "" ? true : meeting.title.toLowerCase() === searchValue.toLowerCase() || meeting.tags.includes(searchValue.toLowerCase())
    return haveSelectedEvents && haveSearchedEvents
  })

  

  return (
    <div className="container pt-4 mb-5">
      <div className="row g-2">
        <h1 className="col-md-10">Meetup Events</h1>
        <div className="col">
          <select
            name="eventType"
            className="form-select"
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="">Search Event Type</option>
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
        </div>
      </div>

      <div className="my-3">
        <input
          class="form-control"
          type="search"
          placeholder="Search by title and tag"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {data?.error && <p>{data.error}</p>}
      {data && data.length !== 0 && (
        <>
          <div className="container py-3">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5">
              {filteredList.length === 0 ? (
                <p>No Data Found</p>
              ) : (
                filteredList.map((meeting) => (
                  <div className="col" key={meeting._id}>
                    <div className="card">
                      <div className="position-relative">
                        <img
                          src={meeting.coverImage}
                          className="card-img-top"
                          alt={`${meeting.title} Cover`}
                        />
                        <div className="card-img-overlay">
                          <span className="bg-light text-dark p-1 rounded-2">
                            {meeting.eventType} Event
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{meeting.title}</h5>
                        <Link
                          to={`/${meeting._id}`}
                          className="btn btn-primary"
                        >
                          Event Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Meetings;
