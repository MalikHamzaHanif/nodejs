const stripe = Stripe("pk_test_51RDdU9FPbC6ekm38tzXsf6XH5Xaxam6FuCxB7KbK8SOwvcr1k8dCYHusx3asvmgQuYy5xorLeGABtX7JdcQvG7Ys00DTXQU9If");
const purchase = [
    { id: 1, name: "xl-tshirt", price: 5000 }
    , { id: 12, name: "sm-tshirt", price: 3000 }
];
let totalAmount = 8000;
let shippingFee = 200;
let elements;

initialize();
async function initialize() {
    const response = await fetch("/api/v1/user/make-payment-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchase, totalAmount, shippingFee }),
    });
    const { clientSecret } = await response.json();

    const appearance = {
        theme: 'stripe',
    };
    elements = stripe.elements({ appearance, clientSecret });

    const paymentElementOptions = {
        layout: "accordion",
    };

    const paymentElement = elements.create("payment", paymentElementOptions);
    paymentElement.mount("#payment-element");
  
    
}

async function handleSubmit(e) {
    e.preventDefault();


    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "http://localhost:5000/complete.html",
        },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
        console.log(error.message);
    } else {
        console.log("An unexpected error occurred.");
    }

}
document.getElementsByTagName("form")[0].addEventListener("submit", handleSubmit)