// App.js
import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* other routes */}
         <Route path="*" element={<Navigate to="/" replace />} />
         
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;