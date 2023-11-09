import React from 'react'
import playStore from '../../../assets/logo/playstore.png'
import appStore from '../../../assets/logo/Appstore.png'
import "./Footer.css"
function Footer() {
  return (
  <footer id = "footer">
 <div className='leftFooter'>
    <h4> DOWNLOAD OUR APP</h4>
    <p> Download App for Android and IOS mobile Phone</p>
<img src={playStore} alt='playstore' />
<img src={appStore} alt='Appstore'/>
 </div>
 <div className='midFooter'>
    <h1>ECOMMMERCE</h1>
    <p>High Quality is our first pripority</p>
    <p>Copyrights 2023 &copy;</p>
 </div>
 <div className='rightFooter'>
    <h4>Follow Us</h4>
    <a href='https://www.instagram.com/'>Instagram</a>
    <a href='https://www.youtube.com/'>Youtube</a>
    <a href='https://www.facebook.com/'>FaceBook</a>
 </div>
  </footer>
  )
}

export default Footer