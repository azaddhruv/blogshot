import React from 'react'

const Footer = () => {
  return (
    <footer className='footer bg-dark'>
      <div className='footer-links container'>
        <div className='footer-item'>
          <a href='https://www.linkedin.com/in/dhruv-kumar-azad-01198821a/'>
            Linkdin
          </a>
          <i className='fab fa-linkedin-in'></i>
        </div>

        <div className='footer-item'>
          <a href='https://github.com/azaddhruv'>GitHub</a>
          <i className='fab fa-github'></i>
        </div>

        <div className='footer-item'>
          <a href='https://twitter.com/DhruvKumarAzad4'>Twitter</a>
          <i className='fab fa-twitter'></i>
        </div>

        <div className='footer-item'>
          <a href='https://www.instagram.com/dhruv_kumar_azad?r=nametag'>
            Instagram
          </a>
          <i className='fab fa-instagram'></i>
        </div>
      </div>
    </footer>
  )
}

export default Footer
