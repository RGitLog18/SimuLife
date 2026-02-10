import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginReg from './Components/loginreg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      {/* <Navigation />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer /> */}
      <LoginReg />
    </div>
  );
}
export default App  