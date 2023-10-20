import React from 'react'

const Footer = () => {
  return (
    <footer>
        <div style={{
            width: '100%',
            padding: 20,
            minHeight: "20vh",
            maxHeight: '30vh',
            marginTop: 50,
        }}>
            <p style={{
                fontSize: '30px',
                textAlign: 'center',
                padding: '20px',
            }} >
                Built Using Openai API and GPT-3.5-Turbo Model is used
            </p>
        </div>
    </footer>
  )
}

export default Footer
