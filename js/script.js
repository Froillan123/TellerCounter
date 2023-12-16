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

// Function to add customer to a specific counter
function addToCounter(counterId) {
    // Get form input values
    let customerName = document.getElementById('name').value;
    let customerAge = document.getElementById('age').value;
    let customerMessage = document.getElementById('message').value;

    // Check if the form is filled
    if (!isFormFilled(customerName, customerAge, customerMessage)) {
        Swal.fire({
            icon: 'warning',
            title: 'Fill the form first',
            text: 'Please enter customer information before proceeding to the counter.'
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

    // Get selected citizen types
    let citizenTypes = [];
    document.querySelectorAll('.citizen-checkbox:checked').forEach(checkbox => {
        citizenTypes.push(checkbox.value);
    });

    // Create a new box for the customer
    let newBox = document.createElement('div');
    newBox.className = 'box';
    newBox.innerHTML = `<p style="font-size: 1.5rem; font-weight: bold;">Name: ${customerName},<br> Age: ${customerAge},<br> Message: ${customerMessage}, Citizens: ${citizenTypes.join(', ')}</p>`;

    // Append the new box to the corresponding counter
    document.getElementById(`counter${counterId}Boxes`).appendChild(newBox);

    // Reset the form
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('message').value = '';
    document.querySelectorAll('.citizen-checkbox:checked').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Add the customer to the queue
    getCounterQueue(counterId).push({
        name: customerName,
        age: customerAge,
        message: customerMessage,
        citizenTypes: citizenTypes
    });
}

// Function to check if the form is filled
function isFormFilled(name, age, message) {
    return name.trim() !== '' && age.trim() !== '' && message.trim() !== '';
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


// Function to get the queue for a specific counter
document.getElementById('toCounter1').addEventListener('click', function () {
    addToCounter(1);
});

document.getElementById('toCounter2').addEventListener('click', function () {
    addToCounter(2);
});

document.getElementById('toCounter3').addEventListener('click', function () {
    addToCounter(3);
});