
# Lunch Cuisine MERN Project

This is the Lunch Cuisine MERN stack application, which includes both the backend (Node.js, Express) and frontend (React) to manage an online lunch order system.

## Project Structure

- `Frontend/` - Contains the React.js frontend application.
- `Backend/` - Contains the Node.js/Express backend API and database configurations.

## Prerequisites

Before you start, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (Node package manager)
- [MongoDB](https://www.mongodb.com/try/download/community) (for the backend)
  
Ensure MongoDB is up and running if you're using a local database, or configure a cloud database like MongoDB Atlas.

## Backend Setup

### Step 1: Navigate to the Backend Directory

```bash
cd Backend
```

### Step 2: Install Dependencies

Install all the required dependencies for the backend:

```bash
npm install
```

### Step 3: Configure Environment Variables

In the `Backend` directory, create a `.env` file based on `.env.example` (you can copy `.env.example` to `.env`), and configure the necessary environment variables such as the database URI, JWT secret, etc.

### Step 4: Start the Backend Server

After setting up the `.env` file, you can start the backend server:

```bash
npm run start
```

This will start the Express server, usually accessible at `http://localhost:5000`.

## Frontend Setup

### Step 1: Navigate to the Frontend Directory

```bash
cd Frontend
```

### Step 2: Install Dependencies

Install the required dependencies for the frontend:

```bash
npm install
```

### Step 3: Start the Frontend Server

After installing the dependencies, start the frontend development server:

```bash
npm run dev
```

This will start the React development server, usually accessible at `http://localhost:3000`.

### Step 4: Environment Variables (Optional)

If your frontend application requires any environment variables, create a `.env` file in the `Frontend` directory and define them. For example, you might need to set the API URL:

```
VITE_API_URL = http://localhost:5000
```

## Running Both Servers Simultaneously

To run both the backend and frontend servers simultaneously in development, you can either:

- Open two terminal windows and run the backend server in one and the frontend server in the other, or
- Use a tool like [Concurrently](https://www.npmjs.com/package/concurrently) to run both servers from one terminal:

1. Install `concurrently`:

    ```bash
    npm install concurrently --save-dev
    ```

2. Modify the `package.json` in the `Frontend` directory to add a start script for both servers:

    ```json
    "scripts": {
      "start": "concurrently "npm run server" "npm run client"",
      "server": "cd ../Backend && npm start",
      "client": "react-scripts start"
    }
    ```

3. Run both servers:

    ```bash
    npm start
    ```

## Additional Notes

- Make sure to set up the MongoDB connection for the backend.
- Customize the API URL in the frontend code to match the backend's URL if not running on the same machine.
- For production, use services like **Heroku**, **Netlify**, or **Vercel** for deployment.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
