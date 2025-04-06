# 💸 Intelligent Expense Tracker with Data Visualization

Welcome to the **Intelligent Expense Tracker** — a modern and lightweight web application built to help users track their financial transactions efficiently. With a clean interface and powerful data visualization, managing your income and expenses becomes a breeze!

## 📌 Table of Contents

- [✨ Features](#-features)
- [📸 Screenshots](#-screenshots)
- [📂 Folder Structure](#-folder-structure)
- [🧑‍💻 Tech Stack Used](#-tech-stack-used)
- [⚛️ Getting Started](#-getting-started)
- [💡 Usage Guide](#-usage-guide)
- [📦 Exporting Data](#-exporting-data)
- [🛠 Future Enhancements](#-future-enhancements)
- [🤝 Contributing](#-contributing)
- [👨‍💻 Author](#-author)
- [📄 License](#-license)

---

## ✨ Features

- 🔐 **Add Expense/Income** – Input date, category, amount, and description.
- 📊 **Pie & Bar Charts** – Visual representation of expense categories and summaries.
- 📁 **Data Export** – Export data to CSV or Excel formats.
- 🔄 **Real-Time Calculation** – Automatically updates totals as you add/delete transactions.
- 💡 **Responsive Design** – Works well on desktops, tablets, and phones.
- 💾 **LocalStorage (Optional)** – Store data locally in the browser.
- 🖌️ **Clean UI** – Designed with simplicity and usability in mind.

---


## 📂 Folder Structure

```
project/
|
├── index.html          # Main HTML structure
├── style.css           # CSS for styling and layout
├── script.js           # Main JS logic for interactivity and charts
├── data/               # Folder for CSV/Excel exports (Node.js server)
├── server.js           # Express.js backend for export features
└── README.md           # This file
```

---

## 🧑‍💻 Tech Stack Used

**Frontend:**

- HTML5
- CSS3
- JavaScript (Vanilla)
- Chart.js (for visual charts)

---

## ⚛️ Getting Started

### 📁 Option 1: Frontend Only

1. Clone the repository:
   ```bash
   git clone https://github.com/AryanSrivastava007/expense-tracker.git
   cd expense-tracker
   ```

2. Open `index.html` in your browser:
   ```bash
   open index.html
   ```

### ⚙️ Option 2: With Export Functionality (Node.js Backend)

1. Navigate to the project root and install dependencies:
   ```bash
   npm install express cors exceljs json2csv body-parser
   ```

2. Start the server:
   ```bash
   node server.js
   ```

3. Visit:
   ```
   http://localhost:3000
   ```

---

## 💡 Usage Guide

1. Open the app in your browser.
2. Fill in the form with date, category, description, and amount.
3. Click **"Add Expense"** to insert the transaction.
4. View updated totals and visual charts.
5. Use **"Download CSV"** or **"Download Excel"** to export your data.

---

## 📦 Exporting Data

Your data can be exported using the backend API provided in `server.js`.

- POST request to `/api/export/csv`
- POST request to `/api/export/excel`

These endpoints generate downloadable CSV or Excel files with your transaction history.

---

## 🛠 Future Enhancements

- ✅ User Authentication (Login/Register)
- ✅ Monthly Expense Limits & Alerts
- ✅ Dark Mode Toggle
- ✅ Cloud Sync with Firebase or MongoDB
- ✅ Customizable Categories
- ✅ Persistent Data Storage using LocalStorage or a Database

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a pull request

---

## 👨‍💻 Author

**Aryan Srivastava**


