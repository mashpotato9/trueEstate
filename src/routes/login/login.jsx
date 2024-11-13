import "./login.scss";
import apiRequest from "../../lib/apiRequest.js";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext.jsx";

function Login() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const {updateUser} = useContext(authContext)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const forData = new FormData(e.target)

    const username = forData.get("username")
    const password = forData.get("password")

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      })
      updateUser(res.data)
      navigate("/")

    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input name="password" required type="password" placeholder="Password" />
          <button disabled={loading}>Login</button>
          {error && <span className="error">{error}</span>}
          <Link to="/register">Don't have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;