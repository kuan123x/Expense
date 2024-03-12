<template>
  <div class="fixed inset-0 flex justify-center items-center bg-yellow-100" style="background-image: url('https://t3.ftcdn.net/jpg/04/84/36/98/360_F_484369865_uGrJURH8FtldtXF9C9SfGqgx2xj0oWWA.jpg'); background-size: cover;">
    <div class="container mx-auto px-1 p-8 bg-white rounded-lg shadow-lg border border-black bg-blue">
      <h1 class="text-5xl text-center text-gray-800 mb-10">Expense Tracker</h1>
      <div class="flex">
        <div class="flex-1 mr-8 max-w-lg">
          <input type="text" v-model="newExpense.item" placeholder="Item" class="input-field">
          <select v-model="newExpense.category" class="input-field">
            <option value="" disabled selected>Expense Category</option>
            <option value="Food">Food</option>
            <option value="Clothes">Clothes</option>
            <option value="Transportation">Transportation</option>
            <option value="Gadget">Gadget</option>
          </select>
          <input type="text" v-model="amountInput" placeholder="Amount" class="input-field">
          <button @click="addOrUpdateExpense" class="btn-primary">
            {{ isEditing ? 'Save Changes' : 'Add' }}
          </button>
        </div>
        <div class="flex-1 relative"> 
          <div class="expenses-table-container border border-gray-300">
            <table class="w-full">
              <thead>
                <tr>
                  <th class="border border-gray-300 px-4 py-2">Item</th>
                  <th class="border border-gray-300 px-4 py-2">Category</th>
                  <th class="border border-gray-300 px-4 py-2">Amount</th>
                  <th class="border border-gray-300 px-4 py-2">Date & Time</th>
                  <th class="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(expense, index) in expenses" :key="index">
                  <td class="border border-gray-300 px-4 py-2">{{ expense.item }}</td>
                  <td class="border border-gray-300 px-4 py-2">{{ expense.category }}</td>
                  <td class="border border-gray-300 px-4 py-2">{{ expense.amount }}</td>
                  <td class="border border-gray-300 px-4 py-2">{{ expense.dateTime }}</td>
                  <td class="border border-gray-300 px-4 py-2 relative">
                    <button @click="editExpense(index)" class="btn-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                      </svg>
                    </button>
                    <button @click="confirmDelete(expense.id)" class="btn-danger absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="total-expenses border-t border-gray-300">Total Expenses: {{ totalExpenses }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
  font-size: 16px;
}


.input-field:focus {
  outline: none;
  border-color: #4caf50;
}

.btn-primary {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-primary:hover {
  background-color: #45a049;
}

.btn-secondary {
  background-color: #163f75;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.btn-secondary:hover {
  background-color: #005F6B;
}

.btn-danger {
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.btn-danger:hover {
  background-color: #d32f2f;
}

.expenses-table-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
}

.expenses-table-container table button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.expenses-table-container table button:first-child {
  left: 5px;
}

.expenses-table-container table button:last-child {
  right: 5px;
}

.total-expenses {
  position: sticky;
  bottom: 0;
  background-color: white;
  padding: 10px;
  text-align: right;
  font-size: 18px;
}
</style>



<script setup>
import { ref, computed } from 'vue';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import db from './firebase/config'; 

const expenses = ref([]);
const newExpense = ref({
    item: '',
    category: '',
    amount: 0,
});
const amountInput = ref('');
const editingIndex = ref(null);
const isEditing = ref(false); // Add isEditing variable

const fetchExpenses = async () => {
    const q = query(collection(db, 'expenses'), orderBy('dateTime', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        expenses.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
};

import { onMounted } from 'vue';
onMounted(fetchExpenses);

const addOrUpdateExpense = async () => {
    if (!newExpense.value.item || !newExpense.value.category || !amountInput.value) {
        alert('Please fill up all the fields.');
        return;
    }

    if (isNaN(parseFloat(amountInput.value))) {
        alert('Please enter a valid number for the amount.');
        return;
    }

    if (editingIndex.value === null) {
        await addExpense();
    } else {
        await updateExpense();
    }
};

const addExpense = async () => {
    const dateTime = new Date().toLocaleString();
    const expense = { ...newExpense.value, amount: parseFloat(amountInput.value), dateTime };

    try {
        const docRef = await addDoc(collection(db, 'expenses'), expense);
        console.log('Expense added with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding expense: ', error);
    }

    newExpense.value = {
        item: '',
        category: '',
        amount: 0,
    };
    amountInput.value = '';
};

const updateExpense = async () => {
    const expenseId = expenses.value[editingIndex.value].id;
    const expense = { ...newExpense.value, amount: parseFloat(amountInput.value) };

    try {
        await updateDoc(doc(db, 'expenses', expenseId), expense);
        console.log('Expense updated with ID: ', expenseId);
    } catch (error) {
        console.error('Error updating expense: ', error);
    }

    newExpense.value = {
        item: '',
        category: '',
        amount: 0,
    };
    amountInput.value = '';
    editingIndex.value = null;
    isEditing.value = false; // Reset isEditing after updating expense
};

const deleteExpense = async (id) => {
    try {
        await deleteDoc(doc(db, 'expenses', id));
        console.log('Expense deleted with ID: ', id);
    } catch (error) {
        console.error('Error deleting expense: ', error);
    }
};

const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
        deleteExpense(id);
    }
};

const editExpense = (index) => {
    const expense = expenses.value[index];
    newExpense.value = {
        item: expense.item,
        category: expense.category,
        amount: expense.amount,
    };
    amountInput.value = expense.amount;
    editingIndex.value = index;
    isEditing.value = true; // Set isEditing to true when editing an expense
};

const totalExpenses = computed(() => {
    return expenses.value.reduce((total, expense) => total + parseFloat(expense.amount), 0);
});
</script>
