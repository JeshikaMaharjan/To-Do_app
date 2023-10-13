import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}`);
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    // console.log(import.meta.env.VITE_API_URL);
  }, []);

  return <></>;
}

export default App;
