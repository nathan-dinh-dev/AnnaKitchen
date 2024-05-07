import express from "express";
import nodemailer from "nodemailer";
import "dotenv/config";

const orderConfirmedRouter = express.Router();

orderConfirmedRouter.post("/order-confirmed", (req, res) => {
  let data = req.body.order;

  if (data.customer.length === 0 || data.items.length === 0) {
    return res.status(400).json({ msg: "Missing Data" });
  }

  let smtpTransporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    // secure: true,
    auth: {
      user: "nathanxdinhx97@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
  });

  let mailOptions = {
    from: "nathanxdinhx97@gmail.com",
    to: data.customer.email,
    subject: `Anna's Kitchen - Order Confirmed #${data.transaction}`,
    html: `
            <h3>Receipt</h3>
            <ul>
              ${data.items.map(
                (item) =>
                  `<li>${item.name} $${item.price} | qty: ${item.quantity}</li>`
              )}
              <br>
              <p><b>Total:</b> $${data.total.toFixed(2)}</p>
            </ul>
            <h3>Message</h3>
            <p>Thank You! See You Again!</p>`,
  };

  smtpTransporter.sendMail(mailOptions, (error) => {
    try {
      if (error) return res.status(400).json({ msg: "Missing Data" });
      res.status(200).json({ msg: "Order Success!" });
    } catch (error) {
      if (error) return res.status(500).json({ msg: "There is server error" });
    }
  });
});

export default orderConfirmedRouter;
