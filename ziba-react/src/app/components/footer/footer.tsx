'use client'
import './footer.css'

export const Footer = () => {

    return (
        <section id='contactInfo'>
            <div className='contacto'>
                <div className='logo'>
                    <img src='imagenes/logoFooter.jpg' />
                </div>
                <div className='redes'>
                    <ul>
                        <li className='li-footer'>
                            <a href="https://www.facebook.com" target="_blank" className='links'>
                                <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/f4f3ed/facebook-new.png" alt="facebook-new"  />
                               
                            </a>
                            <p className='linkText'>Estética Zibá</p>
                        </li>
                        <li className='li-footer'>
                            <a href="https://www.instagram.com/" target="_blank" className='links'>
                                <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/f4f3ed/instagram-new--v1.png" alt="instagram-new--v1" />
                                
                            </a>
                            <p className='linkText'>zibá_estética</p>
                        </li>
                        <li className='li-footer' >
                            <a href="https://web.whatsapp.com/" target="_blank" className='links'>
                                <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/f4f3ed/whatsapp--v1.png" alt="whatsapp--v1" />
                                
                            </a>
                            <p className='linkText'>2284222503</p>
                        </li>
                        <li className='li-footer'>
                            <a href="https://maps.app.goo.gl/KCByA2hp8C2tAaZK9" target="_blank" className='links'>
                                <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/f4f3ed/marker.png" alt="marker" />
                               
                            </a>
                            <p className='linkText'>Gral. Paz 2811</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}