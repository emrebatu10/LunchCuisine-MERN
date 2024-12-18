import '../CSS/Hero.css'
import { useNavigate } from 'react-router-dom';



function Hero() {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>


      <main className="main-container">

        <div className="main-left">

          <div className="heading-container-first">WELCOME TO</div>
          <div className="heading-container-second">Lunch Cuisine Pizzeria</div>

          <div className="heading-container"> <img className='icon-1' src="https://res.cloudinary.com/ddkn14jmn/image/upload/v1734455436/gps-icon_ostku6.png" alt="" /> 254 W 27ST ST, NEW YORK, NY 10011</div>
          <div className="heading-container"> <img className='icon-1' src="https://res.cloudinary.com/ddkn14jmn/image/upload/v1734455436/gps-icon_ostku6.png" alt="" />(212) 123-4567</div>
          <div className="heading-container"> <img className='icon-1' src="https://res.cloudinary.com/ddkn14jmn/image/upload/v1734455438/telefon-icon_pkyjhm.png" alt="" />341 W 11ST ST, NEW YORK, NY 10022</div>
          <button type="button" className="btn" onClick={handleClick}>VIEW MENU</button>

        </div>


        <div className="main-right">

          
        </div>

        
       

      </main>


      <section className="icon-section">
        <div><img src="https://res.cloudinary.com/ddkn14jmn/image/upload/v1734455437/pizza-icon_soc1lc.png" alt="" /> <span>PİZZA</span> </div>
        <div><img src="https://res.cloudinary.com/ddkn14jmn/image/upload/v1734455438/yaprak-icon_usxqy7.png" alt="" /> <span>ORGANİC</span> </div>
        <div><img src="https://res.cloudinary.com/ddkn14jmn/image/upload/v1734455437/kesici-icon_jbkuiw.png" alt="" /> <span>BAKERY</span> </div>
        <div><img src="https://res.cloudinary.com/ddkn14jmn/image/upload/v1734455437/makarna-icon_tfda2j.png" alt="" /> <span>PASTA</span> </div>
      </section>



    </>
  )
}

export default Hero