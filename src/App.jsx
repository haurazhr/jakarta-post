// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Haura Zahra</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "https://jakpost.vercel.app/api/category/indonesia/jakarta"
//       );

//       if (!response.ok) {
//         throw new Error("Gagal mengambil data");
//       }

//       const result = await response.json();
//       setData(result);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);


//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Politics</h1>

//       {/* Featured Post */}
//       <h2>Featured Post</h2>
//       <img
//         src={data.featured_post.image}
//         alt={data.featured_post.title}
//         width="500"
//       />
//       <h3>{data.featured_post.title}</h3>
//       <p>{data.featured_post.headline}</p>

//       <hr />

//       {/* List Posts */}
//       <h2>Other Posts</h2>
//       {data.posts.map((post, index) => (
//         <div key={index} style={{ marginBottom: "30px" }}>
//           <img src={post.image} alt={post.title} width="200" />
//           <h4>{post.title}</h4>
//           <p>{post.headline}</p>
//           <small>
//             {post.pusblised_at} | {post.premium_badge}
//           </small>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;