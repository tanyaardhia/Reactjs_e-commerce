import { useState } from "react";

export function Home() {
  const [getData, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataNews = async() => {
    try {
        
    } catch (error) {
        console.error("error news data >>", error);
      setLoading(false);
    }
  }
  return (
    <>
      <div>hello home</div>
    </>
  );
}
