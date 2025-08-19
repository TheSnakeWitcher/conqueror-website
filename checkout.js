let quantity = 1;
let paymentType = 'test';

const prices = { test: 0, onetime: 600, subscription: 500 };
const paymentsType = { subscription: "subscription", onetime: "onetime", test: "test" }
const paymentsMethods = { mercadoPago: "mercadopago", card: "card", paypal: "paypal" }
const payments = {
    [paymentsType.test]: {
        [paymentsMethods.mercadoPago]: [
            "https://www.mercadopago.com.uy/subscriptions/checkout?preapproval_plan_id=2c93808496d9dcdf0196f261f1bc0ae3",
            "https://www.mercadopago.com.uy/subscriptions/checkout?preapproval_plan_id=3372cc1112674583b813000fc5243f45",
            "https://www.mercadopago.com.uy/subscriptions/checkout?preapproval_plan_id=ff2c572ee5c34b6cae837552c46a7366",
        ],
        [paymentsMethods.card]: [
            "",
            "",
            "",
        ],
    },
    [paymentsType.subscription]: {
        [paymentsMethods.mercadoPago]: [
            "https://www.mercadopago.com.uy/subscriptions/checkout?preapproval_plan_id=e9404b71a47a49558d9963864a20b5fb",
            "https://www.mercadopago.com.uy/subscriptions/checkout?preapproval_plan_id=0e85871490874160bc1da6afce5f5d04",
            "https://www.mercadopago.com.uy/subscriptions/checkout?preapproval_plan_id=4b80971be9b842f4a6f96ced59f11815",
        ],
        [paymentsMethods.card]: [
            "",
            "",
            "",
        ],
    },
    [paymentsType.onetime]: {
        [paymentsMethods.mercadoPago]: [
            "https://mpago.la/2HqHMWU",
            "https://mpago.la/1ipj5pf",
            "https://mpago.la/2f3UPoE",
        ],
        [paymentsMethods.card]: [
            "",
            "",
            "",
        ],
    }
}

function updateDisplay() {
    const basePrice = prices[paymentType];
    console.log(basePrice)
    const subtotal = basePrice * quantity;
    // const discount = paymentType === 'subscription' && quantity > 1 ? subtotal * 0.1 : 0;
    // const discount = paymentType === 'subscription' && quantity > 1 ? (quantity-1)*100 : 0;
    const discount = paymentType === 'subscription' ? 15 : 0;
    // const total = subtotal - discount;
    const total = subtotal ;
    console.log(quantity)

    document.getElementById('quantity').textContent = quantity;
    document.getElementById('summaryQty').textContent = quantity;
    document.getElementById('subtotal').textContent = `$${subtotal}`;
    document.getElementById('total').textContent = `$${total}`;
    document.getElementById('discount').textContent = `-${discount}%`;

    // const discountRow = document.getElementById('discountRow');
    // if (paymentType === 'subscription') {
    //     document.getElementById('discount').textContent = `-$${discount.toFixed(2)}`;
    //     discountRow.classList.remove('hidden');
    // } else {
    //     discountRow.classList.add('hidden');
    // }

    // Update button states
    document.getElementById('decreaseQty').disabled = quantity <= 1;
    document.getElementById('increaseQty').disabled = quantity >= 3;
}

document.addEventListener('DOMContentLoaded', function() {

    // Quantity controls
    document.getElementById('decreaseQty').addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            updateDisplay();
        }
    });

    document.getElementById('increaseQty').addEventListener('click', () => {
        if (quantity < 3) {
            quantity++;
            updateDisplay();
        }
    });

    // Payment type selection
    document.querySelectorAll('input[name="paymentType"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            paymentType = e.target.value;
            updateDisplay();
            
            // Show/hide subscription benefits
            // const benefitsDiv = document.getElementById('subscriptionBenefits');
            // if (paymentType === 'subscription') {
            //     benefitsDiv.classList.remove('hidden');
            // } else {
            //     benefitsDiv.classList.add('hidden');
            // }

            // Update payment option styling
            document.querySelectorAll('.payment-option').forEach(option => {
                option.classList.remove('border-primary', 'bg-green-50');
                option.classList.add('border-gray-200');
            });
            
            const selectedOption = document.querySelector(`[data-type="${paymentType}"]`);
            selectedOption.classList.remove('border-gray-200');
            selectedOption.classList.add('border-primary', 'bg-green-50');
        });
    });

    // Form submission
    document.getElementById('checkoutForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            paymentType: document.querySelector('input[name="paymentType"]:checked').value,
            quantity: quantity,
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
            total: document.getElementById('total').textContent
        };

        // Simulate processing
        // const button = document.querySelector('button[type="submit"]');
        // const originalText = button.innerHTML;
        // button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Procesando...';
        // button.disabled = true;

        let url ;
        switch (formData.paymentMethod) {
            case paymentsMethods.card:
                console.log('credit card selected');
                url = payments[formData.paymentType][paymentsMethods.card][formData.quantity - 1]
                break;
            case paymentsMethods.mercadoPago:
                console.log('mercadopago selected');
                url = payments[formData.paymentType][paymentsMethods.mercadoPago][formData.quantity - 1]
                break;
            case paymentsMethods.paypal:
                console.log('paypal selected');
                url = payments[formData.paymentType][paymentsMethods.paypal][formData.quantity - 1]
                break;
            default:
                console.log('Unknown payment method selected');
        }
        console.log(url)
        window.open(url,'payment',`popup=yes,width=${window.screen.width/2},height=${window.screen.height/2}`)

        // setTimeout(() => {
        //     alert(`¡Gracias por tu compra!\n\nResumen:\n- Tipo: ${formData.paymentType === 'subscription' ? 'Suscripción' : 'Compra única'}\n- Cantidad: ${formData.quantity} caja(s)\n- Total: ${formData.total}\n- Método: ${formData.paymentMethod === 'card' ? 'Tarjeta' : 'MercadoPago'}\n\nRecibirás un email de confirmación pronto.`);
        //     button.innerHTML = originalText;
        //     button.disabled = false;
        // }, 2000);
    });
})

updateDisplay();
