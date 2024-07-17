import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";

export function Home() {
  const [getData, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products`);

      console.log("data fetched successfully >>", response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("error news data >>", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <Navbar/>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {getData.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}
