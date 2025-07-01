# DummyShop

A simple product browser application with a favorites feature, built with Angular.

## ✨ Features

- **Authentication**: Secure login system (JWT-based).
- **Product Catalog**: View a list of products.
- **Favorites**: Add products to a personal favorites list and remove them.

## 🛠️ Tech Stack

- **Angular**: A platform for building mobile and desktop web applications.
- **NGXS**: A state management pattern and library for Angular.
- **Angular Material**: A UI component library for Angular developers.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and npm installed on your machine. This project is tested with Node 22.

### Installation & Running

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd dummy-shop
    ```
3.  Install the dependencies.
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm start
    ```
5.  Open your browser and navigate to `http://localhost:4200/`.

## Credentials

- **Username**: `emilys`
- **Password**: `emilyspass`

## 🧪 Testing

This project uses Karma and Jasmine for unit testing, and Cypress for end-to-end testing.

### Unit Tests

To run the unit tests, execute the following command:

```bash
npm run test
```

### End-to-End Tests

To run the end-to-end tests with Cypress, use the following command. This will open the Cypress Test Runner, where you can run the tests in a browser.

```bash
npm run e2e
```

## 🧩 Most Complex Parts

### 🗂️ State Management with NGXS

The most complex part of this demo is implementing **state management** using [NGXS](https://www.ngxs.io/). This is essential for managing and synchronizing application data across multiple components, specifically for:

- **Authentication** (`AuthState`)
- **Product Data** (`ProductState`)

Each state is responsible for its own set of actions, selectors, and side effects (such as API calls), ensuring the UI remains reactive and consistent.

### 🚩 Why Is It Complex?

Without a state management solution, handling shared data across components can become:

- **Messy and error-prone**: Data must be passed manually between components or stored in services, making it difficult to control updates and increasing the risk of bugs.
- **Unscalable**: As the app grows, maintaining a single source of truth or managing multiple copies of data in different components becomes challenging.
- **Critical for authentication and user-specific data**: Managing tokens, permissions, and user-specific product data (like favorites) requires clear, centralized logic to ensure stability and consistency.

### ✅ How We Resolved It

We use **NGXS** to address these challenges because:

- **Declarative and Predictable**  
   State is defined via classes (`@State()`), and updates are triggered via actions (`@Action()`), making data flows predictable and easy to test.

- **Cleaner Code & Separation of Concerns**  
   NGXS encourages keeping business logic out of components, resulting in more maintainable and modular code.

- **Plugin Support**  
   NGXS offers plugins like the **NGXS Storage Plugin** to persist state (e.g., saving tokens to `localStorage`), making it easy to maintain user sessions across reloads.
