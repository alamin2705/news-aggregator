# News Aggregator

This project is a News Aggregator web application, bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It uses Docker to streamline the development and deployment process.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. Clone the repository to your local machine:
    ```bash
    git clone <repository-url>
    cd news-aggregator
    ```

2. (Optional) Create and configure a `.env` file in the root directory of the project if environment variables are needed.

## Running the Project using Docker

To run the project in a Docker container:

1. Build the Docker image:
    ```bash
    docker build -t news-aggregator .
    ```

2. Run the Docker container:
    ```bash
    docker run -p 3000:3000 news-aggregator
    ```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Running the Project using Docker Compose

To run the project using Docker Compose, which may be useful if you have multiple services:

1. Ensure the `docker-compose.yml` file is correctly configured.
2. Start the application with Docker Compose:
    ```bash
    docker-compose up
    ```

This command will build and start the services defined in the `docker-compose.yml` file.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes, and you may see lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include the hashes.

### `npm run eject`

**Note: this is a one-way operation. Once you eject, you can't go back!**  
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Learn More

To learn more about Create React App, see the [official documentation](https://facebook.github.io/create-react-app/docs/getting-started).
