document.addEventListener('DOMContentLoaded', function () {
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});

let counter1Queue = [];
let counter2Queue = [];
let counter3Queue = [];

// Add more arrays for additional counters if needed

// Update the waiting customer information
function updateWaitingCustomers(counterId) {
    let currentCustomerDiv = document.getElementById(`currentCustomer${counterId}`);
    let waitingCustomerDiv = document.getElementById(`waitingCustomer${counterId}`);
    let queue = getCounterQueue(counterId);

    // Display current customer
    if (queue.length > 0) {
        let currentCustomer = queue[0];
        currentCustomerDiv.innerHTML = `<p>Priority: ${currentCustomer.priority} <br> Name: ${currentCustomer.name}</p>`;
    } else {
        currentCustomerDiv.innerHTML = ''; // No current customer
    }

    // Display waiting customer
    if (queue.length > 1) {
        let waitingCustomer = queue[1];
        waitingCustomerDiv.innerHTML = `<p>Priority: ${waitingCustomer.priority} <br> Name: ${waitingCustomer.name}</p><br>`; // Add <br> for line break
    } else {
        waitingCustomerDiv.innerHTML = ''; // No waiting customer
    }

    // Check if the queue is updated and if it's a dequeue operation
    if (queue.length < 2 && waitingCustomerDiv.innerHTML !== '') {
        // This means a dequeue operation occurred, update the view accordingly
        handleQueueUpdate(counterId);
    }
}

// Call this function whenever the queue is updated
function handleQueueUpdate(counterId) {
    updateCustomerBoxes(counterId);
    updateWaitingCustomers(counterId);
}

function addToCounter(counterId) {
    // Get form input values
    let customerName = document.getElementById('name').value;
    let customerAge = parseInt(document.getElementById('age').value);
    let customerMessage = document.getElementById('message').value;

    // Check if the form is filled
    if (!isFormFilled(customerName, customerAge, customerMessage)) {
        Swal.fire({
            icon: 'warning',
            title: 'Fill the form first',
            text: 'Please enter valid customer information before proceeding to the counter.'
        });
        return;
    }

    // Age validation
    if (customerAge <= 0 || customerAge > 150) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid Age',
            text: 'Please enter a valid age between 1 and 150.'
        });
        return;
    }

    // Check if the counter is full
    if (getCounterQueue(counterId).length >= 5) {
        Swal.fire({
            icon: 'warning',
            title: 'Counter Full',
            text: 'This counter is already at maximum capacity.'
        });
        return;
    }

    // Check for duplicate names across all counters
    if (isNameDuplicate(customerName)) {
        Swal.fire({
            icon: 'warning',
            title: 'Duplicate Name',
            text: 'A customer with the same name already exists in the queue.'
        });
        return;
    }

    // Age-based validation for Senior Citizen
    let seniorCitizenRadio = document.getElementById('senior-citizen');
    if (customerAge < 60 && seniorCitizenRadio.checked) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid Selection',
            text: 'Senior Citizen option is only available for customers aged 60 and above.'
        });
        return;
    }

    // Get selected priority
    let priority = document.querySelector('input[name="priority"]:checked');

    if (!priority) {
        Swal.fire({
            icon: 'warning',
            title: 'Select Priority',
            text: 'Please select the priority for the customer.'
        });
        return;
    }

    // Create a new customer object
    let newCustomer = {
        priority: parseInt(priority.value),
        name: customerName,
        age: customerAge,
        message: customerMessage
    };

    // Insert the new customer into the queue
    let queue = getCounterQueue(counterId);
    queue.push(newCustomer);

    // Sort the queue in descending order based on priority
    queue.sort((a, b) => b.priority - a.priority);

    // Update the customer boxes and waiting customers
    handleQueueUpdate(counterId);

    // Reset the form
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('message').value = '';

    // Reset radio buttons
    document.querySelectorAll('input[name="priority"]').forEach(radio => {
        radio.checked = false;
    });
}

function updateCustomerBoxes(counterId) {
    let queue = getCounterQueue(counterId);
    let counterBoxes = document.getElementById(`counter${counterId}Boxes`);

    // Clear existing boxes
    counterBoxes.innerHTML = '';

    // Create new boxes for each customer
    queue.forEach(customer => {
        let newBox = document.createElement('div');
        newBox.className = 'box';
        newBox.innerHTML = `<p style="font-size: 1.5rem; font-weight: bold;" >Priority: ${customer.priority},<br> Name: ${customer.name}<br></p>`;
        counterBoxes.appendChild(newBox);
    });
}

function isFormFilled(name, age, message) {
    return name.trim() !== '' && age > 0 && message.trim() !== '';
}

function isNameDuplicate(name) {
    for (let counterId = 1; counterId <= 3; counterId++) {
        let queue = getCounterQueue(counterId);
        for (let customer of queue) {
            if (customer.name === name) {
                return true;
            }
        }
    }
    return false;
}

function getCounterQueue(counterId) {
    switch (counterId) {
        case 1:
            return counter1Queue;
        case 2:
            return counter2Queue;
        case 3:
            return counter3Queue;
        // Add more cases for additional counters if needed
        default:
            return [];
    }
}

function dequeueCustomer(queue, counterId) {
    if (queue.length > 0) {
        let servedCustomer = queue.shift();
        Swal.fire({
            icon: 'info',
            title: 'Customer Served',
            html: `<p style="font-size: 1.5rem;">Priority: ${servedCustomer.priority},<br> Name: ${servedCustomer.name},<br> Age: ${servedCustomer.age},<br> Message: ${servedCustomer.message}</p>`
        });
        handleQueueUpdate(counterId);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'No Customers',
            text: 'There are no customers in the queue.'
        });
    }
}

document.getElementById('toCounter1').addEventListener('click', function () {
    addToCounter(1);
});

document.getElementById('toCounter2').addEventListener('click', function () {
    addToCounter(2);
});

document.getElementById('toCounter3').addEventListener('click', function () {
    addToCounter(3);
});

document.getElementById('queueSection1').addEventListener('click', function () {
    dequeueCustomer(counter1Queue, 1);
});

document.getElementById('queueSection2').addEventListener('click', function () {
    dequeueCustomer(counter2Queue, 2);
});

document.getElementById('queueSection3').addEventListener('click', function () {
    dequeueCustomer(counter3Queue, 3);
});



document.getElementById('viewcustomer-link').addEventListener('click', function () {
    var viewcustomerSection = document.getElementById('viewcustomer');
    viewcustomerSection.classList.toggle('active');
});

// Close menu when close button is clicked
document.getElementById('close-menu').addEventListener('click', function () {
    var viewcustomerSection = document.getElementById('viewcustomer');
    viewcustomerSection.classList.remove('active');
});





function updateCustomerTable() {
    let tableBody = document.getElementById('customers-table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    // Iterate over all customers in all counters and add rows to the table
    for (let counterId = 1; counterId <= 3; counterId++) {
        let queue = getCounterQueue(counterId);

        // Sort the queue in descending order based on priority
        queue.sort((a, b) => b.priority - a.priority);

        queue.forEach((customer, index) => {
            let priorityText = getPriorityText(customer.priority); // Get the priority text

            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.name}</td>
                <td>${customer.priority}</td>
                <td>${customer.age}</td>
                <td>${priorityText}</td>
                <td>${counterId}</td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Helper function to get priority text based on priority value
function getPriorityText(priority) {
    switch (priority) {
        case 1:
            return 'Normal Citizen';
        case 2:
            return 'Senior Citizen';
        case 3:
            return 'Women With Child';
        case 4:
            return 'PWD';
        default:
            return 'Unknown Priority';
    }
}

// Call updateCustomerTable whenever the customer queue is updated
function handleQueueUpdate(counterId) {
    updateCustomerBoxes(counterId);
    updateWaitingCustomers(counterId);
    updateCustomerTable(); // Add this line to update the customer table
}
