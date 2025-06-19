const { BAD_REQUEST } = require("../error/error");
const asyncWrapper = require("../middleware/asyncWrapper");
const stripe=require("stripe")(process.env.SECRET_KEY)
const makePayment=asyncWrapper(async (req,res) => {
   const {purchase,totalAmount,shippingFee}=req.body
    const calculateOrderAmount=()=>{
        return totalAmount+shippingFee;
    }
    console.log(req.body);
    
    const paymentIntent=await stripe.paymentIntents.create(
        {
            amount:calculateOrderAmount(),
            currency:"usd"
        }
    )
    console.log(paymentIntent);
    
    res.status(200).json({clientSecret:paymentIntent.client_secret})
    
    
})

module.exports={makePayment}