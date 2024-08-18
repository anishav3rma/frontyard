// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }

// export default App

// src/App.tsx
// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PostList from './PostList';
import PostForm from './PostForm';

const App: React.FC = () => {
  useEffect(() => {
    const schoolName = localStorage.getItem('selectedSchool');
    if (schoolName) {
      document.getElementById('school-name')!.innerText = schoolName;
    }
  }, []);

  const handlePostCreated = () => {
    console.log('Post created successfully.');
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>School Discussion Board</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/new-post" element={<PostForm onPostCreated={handlePostCreated} />} />
          </Routes>
        </main>
        <footer>
          <p>© 2024 School Discussion Board</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;







