const express = require('express');
const app = express();

app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log("Client request received");

    const price = req.body.price;
    const quantity = req.body.quantity;

    // Middleware computation
    const subtotal = price * quantity;

    // Pass data to server
    req.subtotal = subtotal;

    console.log("Subtotal calculated by middleware:", subtotal);

    next();
});

// Server-side computation
app.post('/bill', (req, res) => {

    const subtotal = req.subtotal;

    // Remaining computation happens on server
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    res.json({
        message: "Bill generated successfully",
        subtotal: subtotal,
        gst: gst,
        finalAmount: total
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});