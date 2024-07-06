import React from 'react';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import './App.css';

import Index from './views/Index/Index';
import Governance from './views/Governance/Index';
import ContactUs from './views/ContactUs/Index';
import GenerationStats from './views/GenerationStats/Index';
import ManagePool from './views/ManagePool/Index';

function App() {
  return (  
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/manage-pool" element={<ManagePool />} />
          <Route path="/generation-stats" element={<GenerationStats />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
