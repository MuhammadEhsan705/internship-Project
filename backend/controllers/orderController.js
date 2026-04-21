import Order from "../models/orderModel.js"
import Cart from "../models/cartModel.js"
import Stripe from "stripe"

export const placeOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { address, paymentMethod } = req.body;

    if (!address) {
      return res.status(400).json({
        message: "Delivery address is required",
        success: false,
      });
    }

    const cart = await Cart.findOne({ user: id }).populate("items.menuItem");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty",
        success: false,
      });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0
    );

    const newOrder = await Order.create({
      user: id,
      items: cart.items.map((i) => ({
        menuItem: i.menuItem._id,
        quantity: i.quantity,
      })),
      totalAmount,
      address,
      paymentMethod,
      isPaid: false,
    });

    // clear cart (only for normal order)
    cart.items = [];
    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

  // stripe payment

  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const StripePayment = async (req, res) => {
  try {
    const { id } = req.user;
    const { address } = req.body;
    const { origin } = req.headers;

    if (!address) {
      return res.status(400).json({
        message: "Delivery address is required",
        success: false,
      });
    }

    const cart = await Cart.findOne({ user: id }).populate("items.menuItem");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty",
        success: false,
      });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0
    );

    const newOrder = await Order.create({
      user: id,
      items: cart.items.map((item) => ({
        menuItem: item.menuItem._id,
        quantity: item.quantity,
      })),
      totalAmount,
      address,
      paymentMethod: "Stripe",
      isPaid: false,
    });

    const line_items = cart.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.menuItem.name,
        },
        unit_amount: item.menuItem.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/payment-success/${newOrder._id}`,
      cancel_url: `${origin}/cart`,
    });

    return res.status(200).json({
      success: true,
      url: session.url,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



  export const getUserOrders=async(req,res)=>{
    try {
      const {id}=req.user;
      const orders=await Order.find({user:id}).sort({createdAt:-1})
      res.status(200).json({orders,success:true});
    } catch (error) {
      console.log(error)
        return res.json({message:"Internal server error",success:false})
    }
  }


  // Admin see result

  export const getAllOrders= async(req,res)=>{
    try {
      const orders=await Order.find().populate("user").populate("items.menuItem").sort({createdAt:-1});
      res.status(200).json({orders, success:true});
    } catch (error) {
      console.log(error)
      return res.json({message:"Internal server error",success:false})
    }
  }

  export const updateOrderStatus=async(req,res)=>{
    try {
      const{orderId}=req.params;
      const {status}=req.body;
      const order=await Order.findById(orderId);
      if(!order) return res.status(404).json({message:"Order not found"});

      order.status=status;
      await order.save();
       return res.json({message:"order status updated",success:true})
      
    } catch (error) {
      console.log(error)
        return res.json({message:"Internal server error",success:false})
      
    }
  }