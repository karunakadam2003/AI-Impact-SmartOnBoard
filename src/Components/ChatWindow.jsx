import React, { useState, useEffect } from 'react';
import './ChatWindow.css';
import axios from 'axios';
import './Spinner.css';
import { FileUploader } from 'react-drag-drop-files';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [customerData, setCustomerData] = useState({
    name: '',
    company: '',
    documentType: '',
  });

  const toggleMinimize = () => setIsMinimized(!isMinimized);
  const toggleChatVisibility = () => setIsChatVisible(!isChatVisible);

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    try {
      const url = `${apiUrl}/files`;
      const response = await axios.get(url, {}, {
        headers: {
          Accept: 'application/json',
        },
      });
     
      
      setFiles(['All Documents', ...response.data.files]);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileSelect = async (selectedFile, input) => {
    try {
      const endpoint = selectedFile === 'All Documents' ? '/answer_question' : `/chat/${encodeURIComponent(selectedFile)}`;
      const url = `${apiUrl}${endpoint}`;

      let response;
      if (selectedFile === 'All Documents') {
        response = await axios.post(
          `${url}?question=${encodeURIComponent(input)}`,
          {},
          {
            headers: {
              Accept: 'application/json',
            },
          }
        );
      } else {
        response = await axios.post(
          `${url}?message=${encodeURIComponent(input)}`,
          {},
          {
            headers: {
              Accept: 'application/json',
            },
          }
        );
      }

      console.log('Response data:', response.data); // Log full response data
      const messageText = selectedFile === 'All Documents' ? response.data.answer : response.data.reply || response.data.response || response.data.message;

      setMessages((prevMessages) => [...prevMessages, { text: `Bot: ${messageText || 'No response available'}`, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching chat response:', error);
    }
  };

  const handleFileUpload = async (files) => {
    console.log("Files received:", files);
    
    setUploadedFiles([...uploadedFiles, ...files]);
    setMessages(prev => [...prev, 
      { text: `Bot: Thank you! I've received ${files.length} document(s). I'll analyze them now.`, sender: 'bot' }
    ]);
    
    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        console.log("Appending file:", file.name);
        formData.append('documents', file);
      });

      console.log("Sending request to:", `${apiUrl}/process-documents`);
      const response = await axios.post(`${apiUrl}/process-documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Response received:", response.data);
      
      // Start the onboarding form filling process with extracted data
      if (response.data.extracted_fields && response.data.extracted_fields.length > 0) {
        const extractedData = response.data.extracted_fields[0]; // Using first document's data
        
        try {
          const onboardingResponse = await axios.post(`${apiUrl}/fill-onboarding-form`, extractedData);
          setMessages(prev => [...prev,
            { 
              text: `Bot: I've analyzed your documents and started the automatic form filling process. ${response.data.summary}`, 
              sender: 'bot' 
            },
            {
              text: 'Bot: The onboarding form is being filled automatically with the extracted information.',
              sender: 'bot'
            }
          ]);
        } catch (error) {
          console.error('Error starting onboarding process:', error);
          setMessages(prev => [...prev,
            {
              text: 'Bot: There was an error starting the automatic form filling process. Please try again.',
              sender: 'bot'
            }
          ]);
        }
      }
    } catch (error) {
      console.error('Error details:', error.response || error);
      setMessages(prev => [...prev, 
        { text: `Bot: Sorry, there was an error processing your documents. Please try again.`, sender: 'bot' }
      ]);
    }
  };

  const sendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: `User: ${input}`, sender: 'user' }]);
      setLoading(true);
      
      if (onboardingStep < onboardingSteps.length) {
        const currentStep = onboardingSteps[onboardingStep];
        setCustomerData(prev => ({
          ...prev,
          [currentStep.field]: input
        }));
        
        setOnboardingStep(prev => prev + 1);
        
        if (onboardingStep + 1 < onboardingSteps.length) {
          setMessages(prev => [...prev, 
            { text: `Bot: ${onboardingSteps[onboardingStep + 1].message}`, sender: 'bot' }
          ]);
        }
      } else {
        await handleFileSelect(selectedOption, input);
      }
      
      setInput('');
      setLoading(false);
    }
  };

  const handleChange = (e) => setSelectedOption(e.target.value);

  const onboardingSteps = [
    {
      message: "Welcome! I'm here to help you with the onboarding process. What's your name?",
      field: 'name',
    },
    {
      message: "Great! Which company are you representing?",
      field: 'company',
    },
    {
      message: "Please select the type of document you'll be uploading:",
      field: 'documentType',
      options: ['Invoice', 'Purchase Order', 'Shipping Document', 'Other'],
    },
    {
      message: "Please upload your documents. You can drag and drop them here or click to browse.",
      field: 'documents',
    },
  ];

  useEffect(() => {
    if (isChatVisible && messages.length === 0) {
      setMessages([
        { text: `Bot: ${onboardingSteps[0].message}`, sender: 'bot' }
      ]);
    }
  }, [isChatVisible]);

  const handleOptionSelect = (option) => {
    setMessages(prev => [...prev, 
      { text: `User: I'd like to ${option.toLowerCase()}`, sender: 'user' }
    ]);
    // Handle the selected option accordingly
    switch(option) {
      case 'Ask questions about the documents':
        setMessages(prev => [...prev, 
          { text: 'Bot: Sure! Please ask your question about the documents.', sender: 'bot' }
        ]);
        break;
      case 'Upload additional documents':
        setOnboardingStep(3); // Reset to upload step
        setMessages(prev => [...prev, 
          { text: 'Bot: You can upload more documents using the upload area below.', sender: 'bot' }
        ]);
        break;
      case 'Request specific information':
        setMessages(prev => [...prev, 
          { text: 'Bot: What specific information would you like to know about the documents?', sender: 'bot' }
        ]);
        break;
    }
  };

  return (
    <div>
      <button className="toggle-chat-button" onClick={toggleChatVisibility}>
        {isChatVisible ? '❌' : '📧'}
      </button>
      {isChatVisible && (
        <div className={`chat-container ${isMinimized ? 'minimized' : ''}`}>
          <div className="chat-header" onClick={toggleMinimize}>
            <span>{isMinimized ? 'Open Chat' : 'Chat'}</span>
            <button className="minimize-button">
              {isMinimized ? '▲' : '▼'}
            </button>
          </div>
          {!isMinimized && (
            <div className="chat-window">
              <div className="messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender} ${msg.type || ''}`}>
                    {msg.type === 'options' ? (
                      <div className="options-container">
                        {msg.options.map((option, i) => (
                          <div key={i} className="option-box" onClick={() => handleOptionSelect(option)}>
                            <span className="checkbox">✓</span>
                            {option}
                          </div>
                        ))}
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                ))}
              </div>
              
              {onboardingStep === 3 && (
                <div className="file-upload-container">
                  <FileUploader
                    multiple={true}
                    handleChange={handleFileUpload}
                    name="file"
                    types={["PDF", "DOCX", "PNG", "JPG"]}
                  />
                </div>
              )}

              {onboardingSteps[onboardingStep]?.options && (
                <div className="input-container">
                  <select 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                  >
                    <option value="" disabled>Select an option</option>
                    {onboardingSteps[onboardingStep].options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="input-container">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your response..."
                />
                {loading ? (
                  <div className="overlay">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  <button onClick={sendMessage}>Send</button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
