document.addEventListener('DOMContentLoaded', function () {
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    let loginForm = document.querySelector('.superMenu');

    // Queues for each counter
    let queue1 = [];
    let queue2 = [];
    let queue3 = [];

    // Current customer being served by each counter
    let serving1 = null;
    let serving2 = null;
    let serving3 = null;

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // Event listener for form submission to add a customer
    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();
        validateAndAddCustomer();
    });

    // Event listener for clicking the "Add Customer" button outside the form
    document.getElementById('addCustomerBtn').onclick = () => {
        validateAndAddCustomer();
    };

    // Event listener for proceeding to the counter
    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();
        let selectedCounter = document.getElementById('location').value;
        proceedToCounter(selectedCounter);
    });

    // Function to validate form inputs and add a customer to the queue
    function validateAndAddCustomer() {
        // Get form input values
        var name = document.getElementById('name').value;
        var age = document.getElementById('age').value;
        var priority = document.getElementById('priority-citizen').value;
        var message = document.getElementById('message').value;

        // Validate form inputs
        if (name.trim() === '' || age.trim() === '' || priority.trim() === '' || message.trim() === '') {
            alert('Please fill in all the fields before adding a customer.');
            return; // Stop execution if any field is empty
        }

        // Create a customer object
        var customer = {
            name: name,
            age: age,
            priority: priority,
            message: message
        };

        // Choose the appropriate queue based on the selected counter
        let selectedCounter = document.getElementById('location').value;
        let currentQueue = getQueueForCounter(selectedCounter);

        // Add the customer to the queue
        currentQueue.push(customer);

        // Additional code for updating the UI (e.g., showing the customer in a waiting list)
        // ...

        // Close the menu or perform other actions as needed
        if (loginForm) {
            loginForm.classList.add('active');
        }
    }

    // Function to proceed to the selected counter
    function proceedToCounter(selectedCounter) {
        let currentQueue = getQueueForCounter(selectedCounter);
        let currentServing = getServingForCounter(selectedCounter);

        if (currentQueue.length > 0) {
            // Serve the next customer in the queue
            let nextCustomer = currentQueue.shift();
            currentServing = nextCustomer;

            // Additional code for updating the UI (e.g., moving the customer to the counter)
            // ...

            // Continue serving the customer (e.g., show details on the counter)
            // ...

            // Update the state of the serving customer
            setServingForCounter(selectedCounter, currentServing);
        } else {
            alert('No customers in the queue for Counter ' + selectedCounter);
        }
    }

    // Helper function to get the queue for a specific counter
    function getQueueForCounter(counter) {
        if (counter === 'Counter 1') {
            return queue1;
        } else if (counter === 'Counter 2') {
            return queue2;
        } else if (counter === 'Counter 3') {
            return queue3;
        } else {
            console.error('Invalid counter: ' + counter);
            return [];
        }
    }

    // Helper function to get the serving customer for a specific counter
    function getServingForCounter(counter) {
        if (counter === 'Counter 1') {
            return serving1;
        } else if (counter === 'Counter 2') {
            return serving2;
        } else if (counter === 'Counter 3') {
            return serving3;
        } else {
            console.error('Invalid counter: ' + counter);
            return null;
        }
    }

    // Helper function to set the serving customer for a specific counter
    function setServingForCounter(counter, customer) {
        if (counter === 'Counter 1') {
            serving1 = customer;
        } else if (counter === 'Counter 2') {
            serving2 = customer;
        } else if (counter === 'Counter 3') {
            serving3 = customer;
        } else {
            console.error('Invalid counter: ' + counter);
        }
    }
});
