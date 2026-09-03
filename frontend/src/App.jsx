import { useState, useEffect } from "react";
import api from "./services/api";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/")
    .then((res) => setMessage(res.data.project))
    .catch(console.error);
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  )
}

export default App;