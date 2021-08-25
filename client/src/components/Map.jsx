import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room } from '@material-ui/icons'
import './map.css'
import StarIcon from '@material-ui/icons/Star';
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from 'timeago.js'
import { Button } from '@material-ui/core';

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const Map = ({currentUser}) => {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlaceId, setnewPlaceId] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(1);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 19.2094,
    longitude: 73.0939,
    zoom: 4
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id)
    setViewport({ ...viewport, latitude: lat, longitude: long });
  }

  const handleAddclick = (e) => {
    const [long, lat] = e.lngLat;
    setnewPlaceId({
      lat, long
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating: star,
      lat: newPlaceId.lat,
      long: newPlaceId.long,
    };

    try {
      const res = await axios.post("pins/", newPin);
      setPins([...pins, res.data]);
      setnewPlaceId(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="outer-map">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        onDblClick={handleAddclick}
        transitionDuration="200"
        onViewportChange={nextViewport => setViewport(nextViewport)}>
        

        {pins.map(p => (

          <>
            <Marker latitude={p.lat} longitude={p.long} offsetLeft={-viewport.zoom * 3.5} offsetTop={-viewport.zoom * 7}>
              <Room style={{
                fontSize: viewport.zoom * 7,
                color: p.username === currentUser ? "tomato" : "slateblue", cursor: "pointer"
              }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}

              />
            </Marker>

            {p._id === currentPlaceId &&
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => { setCurrentPlaceId(null) }} >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place" style= {{margin  : 0}} >{p.title}</h4>
                  <label>Review</label>
                  <p style= {{margin  : 0}} > {p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<StarIcon className="star" />)}

                  </div>
                  <label>Information</label>
                  <span className="username">created by <b>{p.username}</b></span>
                  <span className="date">{format(p.createdAt)} </span>
                </div>
              </Popup>
            }
          </>
        ))}
        {newPlaceId &&
          <Popup
            latitude={newPlaceId.lat}
            longitude={newPlaceId.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => { setnewPlaceId(null) }} >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} />
                <label>Review</label>
                <textarea placeholder="Say something about this place" onChange={(e) => setDesc(e.target.value)} />
                <label>Rating</label>
                <select onChange={(e) => setStar(e.target.value)}>
                  <option value="1" >1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="4">5</option>

                </select>
                <button type="submit" className="submitButton" >
                  Add Pin
                </button>

              </form>
            </div>
          </Popup>
          
        }
        

        
      
      </ReactMapGL>

    </div>
  );
}

export default Map;
