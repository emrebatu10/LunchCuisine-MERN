import '../CSS/Payment.css';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { CartContext } from './CartContext';

function Payment() {
  const { totalPrice } = useContext(CartContext); // get the totalPrice value from the context

  const [address, setAddress] = useState({
    street: '',
    city: '',
    zip: ''
  });

  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Add space after every 4 digits
    setCardNumber(value.trim());
  };

  const validateForm = () => {
    const errors = {};

    // Validate address fields
    if (!address.street) errors.street = 'Street Address is required.';
    if (!address.city) errors.city = 'City is required.';
    if (!address.zip) errors.zip = 'Zip Code is required.';

    // Validate card fields
    if (!nameOnCard) errors.nameOnCard = 'Full Name is required.';
    if (!cardNumber) errors.cardNumber = 'Card Number is required.';
    if (cardNumber.length < 19) errors.cardNumber = 'Card Number must be complete.';
    if (!expiryMonth) errors.expiryMonth = 'Expiry Month is required.';
    if (!expiryYear) errors.expiryYear = 'Expiry Year is required.';
    if (!cvc) errors.cvc = 'CVC is required.';

    // Validate Terms of Sale
    if (!termsAccepted) errors.termsAccepted = 'You must accept the Terms of Sale.';

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    alert('Order completed successfully!');
  };

  return (
    <Container className="payment-container">
      <Row>
        <Col md={8} className="payment-details">
          <h3>Online Payment</h3>
          <h5>New Card Payment</h5>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nameOnCard">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
              />
              {formErrors.nameOnCard && <div className="error-text">{formErrors.nameOnCard}</div>}
            </Form.Group>

            <Form.Group controlId="cardNumber" className="mt-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength="19"
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
              {formErrors.cardNumber && <div className="error-text">{formErrors.cardNumber}</div>}
            </Form.Group>

            <Row className="mt-3">
              <Col xs={6} md={3}>
                <Form.Group controlId="expiryMonth">
                  <Form.Label>Month</Form.Label>
                  <Form.Control
                    as="select"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                  >
                    <option value="">MM</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </Form.Control>
                  {formErrors.expiryMonth && <div className="error-text">{formErrors.expiryMonth}</div>}
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="expiryYear">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    as="select"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                  >
                    <option value="">YY</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={new Date().getFullYear() + i}>
                        {new Date().getFullYear() + i}
                      </option>
                    ))}
                  </Form.Control>
                  {formErrors.expiryYear && <div className="error-text">{formErrors.expiryYear}</div>}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col xs={6}>
                <Form.Group controlId="cvc">
                  <Form.Label>CVC</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="CVC"
                    maxLength="4"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                  />
                  {formErrors.cvc && <div className="error-text">{formErrors.cvc}</div>}
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
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            {formErrors.termsAccepted && <div className="error-text">{formErrors.termsAccepted}</div>}
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
                {formErrors.street && <div className="error-text">{formErrors.street}</div>}
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
                {formErrors.city && <div className="error-text">{formErrors.city}</div>}
              </Col>
              <Col xs={6}>
                <Form.Control
                  type="text"
                  placeholder="Zip Code"
                  name="zip"
                  value={address.zip}
                  onChange={handleAddressChange}
                />
                {formErrors.zip && <div className="error-text">{formErrors.zip}</div>}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="saveNote" className="mt-3">
            <Form.Check type="checkbox" label="Save Note" />
            <Form.Check type="checkbox" label="Do Not Ring the Bell" />
          </Form.Group>

          <Button variant="success" type="submit" className="complete-order-btn" block>
            Complete Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
