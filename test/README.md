# API Testing with Postman

This section outlines the API testing performed using Postman to verify the backend functionality of the chat application. The tests covered key endpoints, focusing on authentication, user management, and message handling.

## Downloading and Setting up Postman

To begin testing the API, you need to download and install Postman from the official website:
https://www.postman.com/downloads/
Once installed, you can start creating collections and requests to test the API

**1. Setting up Postman:**

- **Create a New Collection:** In Postman, create a new collection (e.g., "Chat App API Tests").
- **Create Requests:** Add requests for each endpoint within your collection:

  - **`POST /api/auth/signup`:** Use a JSON body with `email`, `password`, and (if needed) `username`. Example:

    ```json
    {
      "email": "testuser@example.com",
      "password": "securePassword123",
      "username": "TestUser"
    }
    ```

  - **`POST /api/auth/login`:** Use a JSON body with `email` and `password`. Example:

    ```json
    {
      "email": "testuser@example.com",
      "password": "securePassword123"
    }
    ```

  - **`POST /api/auth/logout`:** Requires an `Authorization` header with a Bearer token:

    ```
    Authorization: Bearer YOUR_JWT_TOKEN
    ```

  - **`GET /api/auth/check`:** Requires an `Authorization` header with a Bearer token (same as logout):
    ```
    Authorization: Bearer YOUR_JWT_TOKEN
    ```

- **Add Tests:** For each request, add tests using Postman's scripting capabilities (JavaScript). Example tests:

  ```javascript
  pm.test("Status code is 200", () => {
    pm.response.to.have.status(200);
  });

  pm.test("Response body has a token", () => {
    let jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("token");
  });
  ```

  Adapt these tests to check for appropriate status codes and data in the response body for each endpoint.

**2. Running the Tests:**

- Save your requests and tests.
- Run each request individually or run the entire collection.

**3. Important Considerations:**

- Replace `YOUR_JWT_TOKEN` with the actual JWT token obtained after a successful login.
- Adjust tests based on your API's responses and error handling.
- The base URL (`http://localhost:5001`) should be updated if your API runs on a different address.

This guide provides a basic framework for testing. Thorough testing should include various scenarios, including edge cases and error conditions. A more comprehensive test suite might be included in a separate file or repository.

**Key Tests Performed:**

This section details the API testing performed using Postman to validate the backend functionality. Tests focused on authentication and user management using the following endpoints:

- **`http://localhost:5001/api/auth/signup` (POST):** This endpoint handles user registration. Postman tests verified successful signup with valid data, handling of missing required fields, and error responses for duplicate emails or invalid input . Assertions checked the HTTP status code (201 for success, 400 for bad requests) and the response body (JWT token presence upon success).

- **`http://localhost:5001/api/auth/login` (POST):** This endpoint manages user login. Postman tests validated successful login with correct credentials and appropriate error handling for incorrect credentials . Assertions checked the HTTP status code (200 for success, 401 for unauthorized) and JWT token presence in the successful response.

- **`http://localhost:5001/api/auth/logout` (POST):** This endpoint handles user logout. Tests verified successful logout and handled potential errors.

- **`http://localhost:5001/api/auth/check` (GET):** This endpoint likely checks authentication status. Tests verified that the endpoint returns appropriate responses (e.g., user data if authenticated, error otherwise) based on the presence or absence of a valid JWT token in the request headers.

**Postman Collection:**

A Postman collection containing all the API tests is available [link to Postman collection if applicable]. This collection can be directly imported into Postman for execution and modification.
