# NNG Homework Project

## Project Description
This project is a simple Node.js backend and frontend application designed for homework purposes. It demonstrates a service dispatcher pattern, where API calls are routed to different services via a central dispatcher. The backend provides mathematical operations and image search functionality, while the frontend offers a basic user interface.

## Usage Instructions

### Prerequisites
- Node.js (v14 or newer recommended)

### Quick Setup
1. Navigate to the project directory, then run:
   ```powershell
   npm install
   ```
   This will automatically install all the necessary packages.

### Running the Backend
1. Navigate to the project directory:
   ```powershell
   cd ./NNG_Homework
   ```
2. Start the backend server:
   ```powershell
   node server.js
   ```

### Opening the project
1. Open your browser and type the following in the search bar:
   ```powershell
   http://localhost:3000
   ```

### Running Tests
1. Navigate to the backend test directory:
   ```powershell
   cd NNG_Homework/backend/test
   ```
2. Run the test script:
   ```powershell
   node test_dispatcher.js
   ```

## Sample JSON Inputs Used for Testing

### 1. Fibonacci Test
```json
[{ "service": "mathService", "method": "getFibonacci", "params": { "n": 7 } }]
```

### 2. Matrix Multiplication Test
```json
[{ "service": "mathService", "method": "multiplyMatrices", "params": { "a": [[1,2],[3,4]], "b": [[5,6],[7,8]] } }]
```

### 3. Image Search Test
```json
[{ "service": "imageService", "method": "getImageByName", "params": { "name": "cat" } }]
```

### 4. Invalid Service/Method Test
```json
[{ "service": "", "method": "", "params": {} }]
```

### 5. Invalid Input (Not Array)
```json
"not an array"
```

## Project Structure
- `backend/` - Backend logic, dispatcher, services, and tests
- `frontend/` - Frontend static files (HTML, JS, CSS)
- `server.js` - Main server entry point

## Possible Improvements

Some ideas for further development:

- Form validation and user-friendly error messages for invalid input
- Support for additional math or image services
- History of previous API calls and results
- User authentication and authorization
- Internationalization (multi-language support)
- Better error handling and feedback for backend errors
- Unit and integration tests for frontend logic
