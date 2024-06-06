import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // console.log(process.env.REACT_APP_APPWRITE_URL);  // For if i create application create-react-app
  console.log(import.meta.env.VITE_APPWRITE_URL);
  return (
    <>
      <h1>Blogging app</h1>
    </>
  )
}

export default App
