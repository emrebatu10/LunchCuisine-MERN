
import { Table, Container } from 'react-bootstrap';
import { useContext } from 'react';
import { CartContext } from './CartContext';

function Orders() {
  const { orders } = useContext(CartContext); // Assuming orders are stored in CartContext

  return (
    <Container className="orders-container">
      <h3>My Orders</h3>
      {orders && orders.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.itemName}</td>
                <td>{order.quantity}</td>
                <td>{order.price}$</td>
                <td>{order.total}$</td>
                <td>
                  {order.address.street}, {order.address.city}, {order.address.zip}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>You have no orders yet.</p>
      )}
    </Container>
  );
}

export default Orders;
