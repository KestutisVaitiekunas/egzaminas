import './App.css';
import Header from './components/header'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import UserProfile from './pages/user_profile_page';

function App() {

  const [logged, setLogged] = useState(false);
  const [events, setEvents] = useState([]); // array of events


  useEffect(() => {
    const token = localStorage.getItem('Access_token') ?? "Bearer null"
    const validateToken = async () => {
        try {
            const response = await Axios.get('http://localhost:4000/api/auth/secure',{
                headers: {Authorization: token} 
            })
            console.log(response.data.data)
            if (response.data.data.user_id) {
            // if (response.data.data.user_id  !== params.id * 1) {
                setLogged(true)  
            } else {
                setLogged(false)
            }
        } catch (error) {
            console.log(error)
            setLogged(false)
        }
    }
    validateToken()
},[])

  useEffect(() => {
    try {
      const response = Axios.get('http://localhost:4000/api/events')
      console.log(response.data);
      // setEvents(response.data);
    } catch (error) {
      
    }
  },[])


  return (
    <div className="App">
      <div className="App-header">
        <Header loggedIn={logged}/>
        <div>
          {events && events.map(
            (event, index) => 
              <div>
                <p>{event.title}</p>
                <p>{event.description}</p>
                <img src={event.image} alt="event image" />
              </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
