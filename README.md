# Stock Watchlist

A simple Node.js + Express + MongoDB app where users can:
- Add a stock symbol (1–5 uppercase letters only)
- View their watchlist

## ✅ Requirements
- Node.js
- MongoDB Atlas URI stored in `.env`

## ⚙️ Install

```bash
npm install


▶️ Run
node server.js


Server will start on PORT specified in .env or default 3000.

Create a .env file:

MONGO_URI=your-atlas-url-here
PORT=3000

📌 API Endpoints->
➤ Add stock
pgsql
Copy code
POST /add
Content-Type: application/json

{
  "symbol": "TCS"
}
➤ View stock list
bash
Copy code
GET /list

✅ Security:

Helmet
XSS protection
Regex validation
Rate limiting