import '../CSS/Footer.css'
import Social from './Social'

function Footer() {
  return (

    <>
      <Social />
      <div className="footer">

        <div className="footer-divs">
          <h1>FIND US</h1>
          <p>121 Rock Sreet, 21</p>
          <p>Avenue, New York,</p>
          <p>NY 92103-9000</p>

        </div>

        <div className="footer-divs">
          <h1>HOURS</h1>
          <h3 >Monday-Saturday</h3>
          <p>9am - 7pm</p>
          <h3 >Sunday</h3>
          <p>10am - 6pm</p>

        </div>

        <div className="footer-divs">
          <h1 >CALL US</h1>
          <p>1 (234) 567-891 </p>
          <p>2 (345) 333-897</p>
        </div>

      </div>




    </>

  )
}

export default Footer