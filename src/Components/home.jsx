import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ChatWindow from './ChatWindow';

import './Spinner.css';
import './home.css';

function Home() {
  const [files, setSelectedFile] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
 

  return (
    <>
      <ChatWindow />
    </>
  );
}

export default Home;