import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";

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
      <Navbar />
      <div className="home-container">
      {loading ? (
          <div className="loading-container">
            <div className="loading"></div>
          </div>
        ) : (
          <div className="card-container">
            {getData.map((item) => (
              <Card key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
