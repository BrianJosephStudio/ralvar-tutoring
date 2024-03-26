
# RALVAR.COM

## Overview

This project comprises an application designed to facilitate English lesson bookings for a client's students. The application encompasses both front-end and back-end components to provide a seamless booking experience.

## Technologies Used

### Front-end

- **Vue.js:** The front-end is developed using Vue.js, a progressive JavaScript framework for building user interfaces.
- **Sass:** Sass is utilized for styling the application, providing enhanced features and organization over traditional CSS.
- **Vuex:** Vuex is employed for state management within the Vue.js application, enabling centralized state management and communication between components.
- **Vue Persist:** Vue Persist is utilized for local storage within the Vue.js application, enabling data persistence across sessions.

### Back-end

- **Node.js:** The back-end of the application is written in JavaScript using Node.js, a runtime environment for executing JavaScript code outside of a web browser.
- **Express.js:** Express.js is used as the web application framework for Node.js, simplifying the process of building robust web applications and APIs.
- **Nginx:** Nginx serves as a reverse proxy to handle requests and improve performance. It efficiently forwards client requests to the appropriate backend servers.
- **Google Calendar API:** The application integrates with the Google Calendar API to search for availability and create reservations on the client's Google Calendar.
- **Stripe API:** Payments are handled through the Stripe API, a popular platform for processing online payments securely.
- **Nodemailer:** Nodemailer is utilized to send email confirmations for successful bookings, enhancing communication with users.

## Deployment

The Single Page Application (SPA) is served from a backend hosted on a Virtual Private Server (VPS) provided by Hostinger.com. Nginx is configured to handle incoming requests and proxy them to the appropriate backend services.