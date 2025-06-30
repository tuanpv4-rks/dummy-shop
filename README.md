# DummyShop

A simple product browser application with a favorites feature, built with Angular.

## ✨ Features

-   **Authentication**: Secure login system (JWT-based).
-   **Product Catalog**: View a list of products.
-   **Favorites**: Add products to a personal favorites list and remove them.

## 🛠️ Tech Stack

-   **Angular**: A platform for building mobile and desktop web applications.
-   **NGXS**: A state management pattern and library for Angular.
-   **Angular Material**: A UI component library for Angular developers.
-   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

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

## credentials
- **Username**: `emilys`
- **Password**: `emilyspass`
## 🧪 Testing

This project uses Karma and Jasmine for unit testing.

To run the unit tests, execute the following command:

```bash
npm run test
```
## Most Complex parts
The most complex part of this application is the product state management, which is implemented using NGXS. This implementation can be found in `src/app/features/product/store/`.
This approach provides a centralized, predictable, and maintainable way to manage product-related data throughout the application.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.