import { useEffect, useState} from "react"
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const Admin = (props) => {
    const navigate = useNavigate()
    const params = useParams();

    const [user, setUser] = useState({})
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('Access_token') ?? "Bearer null"
        const validateToken = async () => {
            try {
                const response = await Axios.get('http://localhost:4000/api/auth/secure',{
                    headers: {Authorization: token} 
                })
                console.log(response.data.data)
                if (response.data.data.user_id  !== params.id * 1) {
                    console.log("wrong user");  
                } else {
                    setAuthorized(true)
                    setUser(response.data.data)
                }
            } catch (error) {
                // console.log(error)
                setAuthorized(false)
                setUser({})
                // navigate('/login')
            }
        }
        validateToken()
    },[])

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('Access_token')
            const response = await Axios.post('http://localhost:4000/api/auth/logout', {token});
            console.log(response.data)
            localStorage.removeItem('Access_token')
            setAuthorized(false)
            setUser({})
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1>User profile page</h1>
            {authorized && <p>User: {user.user_id}</p>}
            {authorized && <button onClick={handleLogout}>Logout</button>}
            {!authorized && <button onClick={() => navigate('/login')}>Login</button>}
        </div>
    )
}

export default Admin