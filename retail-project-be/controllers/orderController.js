const Order = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createOrder = async (req, res) => {
  try {
    const { products, customerEmail } = req.body;

    // Calculate total amount from products
    let totalAmount = 0;
    for (let product of products) {
      const dbProduct = await Product.findById(product.productId);
      totalAmount += dbProduct.price * product.quantity;
    }

    // Create new order
    const newOrder = new Order({
      products,
      totalAmount,
      customerEmail,
      status: 'pending',
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

exports.processPayment = async (req, res) => {
  try {
    const { orderId, paymentMethodId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.totalAmount * 100, // Convert to smallest currency unit (cents)
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Update order payment status
    order.paymentStatus = 'completed';
    order.status = 'paid';
    await order.save();

    res.status(200).json({ message: 'Payment successful', paymentIntent });
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error });
  }
};
