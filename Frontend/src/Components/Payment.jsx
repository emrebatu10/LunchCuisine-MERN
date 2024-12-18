import '../CSS/Payment.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { CartContext } from './CartContext';

function Payment() {
  

  const { totalPrice } = useContext(CartContext); // get the totalPrice value from the context

  const [address, setAddress] = useState({
    street: '',
    city: '',
    zip: ''
  });



  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  return (
    <Container className="payment-container">
      <Row>
        <Col md={8} className="payment-details">
          <h3>Online Payment</h3>
          <h5>New Card Payment</h5>

          <Form>
            <Form.Group controlId="nameOnCard">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" required />
            </Form.Group>

            <Form.Group controlId="cardNumber" className="mt-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" placeholder="XXXX XXXX XXXX XXXX" required />
            </Form.Group>

            <Row className="mt-3">
              <Col xs={6} md={3}>
                <Form.Group controlId="expiryMonth">
                  <Form.Label>Month</Form.Label>
                  <Form.Control as="select" required>
                    <option>MM</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i}>{String(i + 1).padStart(2, '0')}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="expiryYear">
                  <Form.Label>Year</Form.Label>
                  <Form.Control as="select" required>
                    <option>YY</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i}>{new Date().getFullYear() + i}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col xs={6}>
                <Form.Group controlId="cvc">
                  <Form.Label>CVC</Form.Label>
                  <Form.Control type="text" placeholder="CVC" required />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="cardNickname">
                  <Form.Label>Card Nickname</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" className="mt-3" block="true">
              Save Card to MasterPass
            </Button>


          </Form>
        </Col>

        <Col md={4} className="order-summary">
          <h5>Order Summary</h5>
          <div className="order-total">
            <p>Order Total</p>
            <span>{totalPrice}$</span>
          </div>

          <Form.Group controlId="termsCheckbox" className="mb-3 mt-3">
            <Form.Check
              type="checkbox"
              label="I have read and accept the Terms of Sale."
              required
            />
            <p className="error-text">You must accept the Terms of Sale.</p>
          </Form.Group>

          <Form.Group controlId="addNote">
            <Form.Label>Add Note</Form.Label>
            <Form.Control as="textarea" rows={2} placeholder="You can write your note here." />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Street Address"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={6}>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                />
              </Col>
              <Col xs={6}>
                <Form.Control
                  type="text"
                  placeholder="Zip Code"
                  name="zip"
                  value={address.zip}
                  onChange={handleAddressChange}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="saveNote" className="mt-3">
            <Form.Check type="checkbox" label="Save Note" />
            <Form.Check type="checkbox" label="Do Not Ring the Bell" />
          </Form.Group>

          <Button variant="success" className="complete-order-btn" block>
            Complete Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
