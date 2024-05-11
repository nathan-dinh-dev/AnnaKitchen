# Anna Kitchen: Online Ordering System

Welcome to Anna Kitchen's online ordering system! This project aims to provide a convenient and user-friendly platform for customers to order food from Anna Kitchen's menu with just a few clicks.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js
- **Database**: MySQL
- **Payment Processing**: Stripe
- **Email Confirmation**: Nodemailer
- **API Routing**: Express

## Overview

Anna Kitchen's online ordering system is built using modern web technologies to ensure a seamless experience for both customers and restaurant staff. The frontend, powered by React, offers an intuitive interface for browsing the menu and placing orders. On the backend, Node.js handles order processing and communication with the database, which is managed using MySQL. Payments are securely processed through Stripe, and customers receive email confirmations using Nodemailer. Express handles API routing to ensure efficient communication between the frontend and backend.

[Watch the Video Demo](https://www.youtube.com/watch?v=bFU27RgiVy8&t=182s)

Feel free to explore the code and contribute to making Anna Kitchen's online ordering system even better!

## Getting Started

To run the project locally:

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Unzip `annakitchen_database` stored in `database-queries` and import it into your MySQL database. Here's how you can do it:
   - Open MySQL Workbench or any MySQL client you prefer.
   - Create a new database name `prj` (if you haven't already) where you want to import the data.
   - Select the newly created database.
   - Choose the unzipped SQL file (`prj_customer.sql`, `prj_menu.sql`, `prj_receipt.sql`, and `prj_transaction.sql`) to  import the database schema and data.


5. Create your own `.env` file with your secret keys from `Stripe`, `Firebase`, and `MySQL` to make connection between them.
6. Start the development server using `npm run start`.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests if you have any suggestions for improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
