// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const balanceEl = document.getElementById('balance');
    const incomeEl = document.getElementById('income-total');
    const expenseEl = document.getElementById('expense-total');
    const transactionList = document.getElementById('transaction-list');
    const form = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const dateInput = document.getElementById('date');
    const expenseChart = document.getElementById('expense-chart');
    
    // Set default date to today
    const today = new Date();
    dateInput.value = today.toISOString().substr(0, 10);
    
    // Load transactions from localStorage
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    // Initialize chart
    let myChart;
    
    // Initialize app
    function init() {
        updateUI();
        updateChart();
    }
    
    // Add new transaction
    function addTransaction(e) {
        e.preventDefault();
        
        if(descriptionInput.value.trim() === '' || amountInput.value.trim() === '' || categoryInput.value.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        
        const transaction = {
            id: generateID(),
            description: descriptionInput.value,
            amount: +amountInput.value,
            category: categoryInput.value,
            date: dateInput.value
        };
        
        transactions.push(transaction);
        updateLocalStorage();
        updateUI();
        updateChart();
        
        // Reset form
        form.reset();
        // Set date to today again
        dateInput.value = today.toISOString().substr(0, 10);
    }
    
    // Generate random ID
    function generateID() {
        return Math.floor(Math.random() * 1000000000);
    }
    
    // Delete transaction
    function deleteTransaction(id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        updateLocalStorage();
        updateUI();
        updateChart();
    }
    
    // Update local storage
    function updateLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    
    // Update balance, income and expense
    function updateValues() {
        const amounts = transactions.map(transaction => transaction.amount);
        
        // Calculate balance
        const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
        
        // Calculate income
        const income = amounts
            .filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0)
            .toFixed(2);
            
        // Calculate expense
        const expense = (
            amounts
                .filter(item => item < 0)
                .reduce((acc, item) => (acc += item), 0) * -1
        ).toFixed(2);
        
        // Update DOM
        balanceEl.textContent = `₹${total}`;
        incomeEl.textContent = `+₹${income}`;
        expenseEl.textContent = `-₹${expense}`;
    }
    
    // Format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Update transaction list
    function updateTransactionList() {
        // Clear list
        transactionList.innerHTML = '';
        
        // Sort transactions by date (newest first)
        const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if(sortedTransactions.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'No transactions yet. Add a transaction to get started!';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.padding = '20px 0';
            emptyMessage.style.color = 'var(--gray)';
            transactionList.appendChild(emptyMessage);
            return;
        }
        
        // Add transactions to DOM
        sortedTransactions.forEach(transaction => {
            const item = document.createElement('li');
            item.classList.add('transaction-item');
            
            const sign = transaction.amount < 0 ? '-' : '+';
            const amountClass = transaction.amount < 0 ? 'expense-amount' : 'income-amount';
            
            item.innerHTML = `
                <div class="transaction-info">
                    <span class="transaction-description">${transaction.description}</span>
                    <span class="transaction-category">${transaction.category} | ${formatDate(transaction.date)}</span>
                </div>
                <div class="transaction-meta">
                    <span class="transaction-amount ${amountClass}">${sign}₹${Math.abs(transaction.amount).toFixed(2)}</span>
                    <button class="delete-btn" onclick="deleteTransactionById(${transaction.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            transactionList.appendChild(item);
        });
    }
    
    // Update chart
    function updateChart() {
        // Get expense data by category
        const expenseData = {};
        transactions.forEach(transaction => {
            if(transaction.amount < 0) {
                if(expenseData[transaction.category]) {
                    expenseData[transaction.category] += Math.abs(transaction.amount);
                } else {
                    expenseData[transaction.category] = Math.abs(transaction.amount);
                }
            }
        });
        
        const categories = Object.keys(expenseData);
        const amounts = Object.values(expenseData);
        
        // Color palette
        const colors = [
            '#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#073b4c',
            '#ff7c43', '#ffa600', '#003f5c', '#7a5195', '#2f4b7c'
        ];
        
        // Destroy previous chart if it exists
        if(myChart) {
            myChart.destroy();
        }
        
        // Create new chart
        if(categories.length > 0) {
            myChart = new Chart(expenseChart, {
                type: 'doughnut',
                data: {
                    labels: categories,
                    datasets: [{
                        label: 'Expense by Category',
                        data: amounts,
                        backgroundColor: colors.slice(0, categories.length),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((context.raw / total) * 100).toFixed(1);
                                    return `₹${context.raw.toFixed(2)} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        } else {
            // Create a placeholder chart
            const ctx = expenseChart.getContext('2d');
            ctx.clearRect(0, 0, expenseChart.width, expenseChart.height);
            ctx.font = '16px Arial';
            ctx.fillStyle = 'var(--gray)';
            ctx.textAlign = 'center';
            ctx.fillText('No expense data available', expenseChart.width / 2, expenseChart.height / 2);
        }
    }
    
    // Update UI
    function updateUI() {
        updateValues();
        updateTransactionList();
    }
    
    // Event listeners
    form.addEventListener('submit', addTransaction);
    
    // Global function to delete transaction from HTML
    window.deleteTransactionById = function(id) {
        deleteTransaction(id);
    };
    
    // Initialize app
    init();
});