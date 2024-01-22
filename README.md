# NextJS-JWT-Auth-Demo

## Deployment:
https://jwt-user-auth.vercel.app

## Overview
This repository contains a pilot project for a Next.js application demonstrating the use of JSON Web Tokens (JWT) for user authentication and classification. The goal is to showcase a secure, efficient, and user-friendly method for user classification based on quiz results, without the need to handle personally identifiable information (PII).

## Purpose
The purpose of this project is to explore an alternative approach to user authentication and classification, transitioning from a traditional Public Key Infrastructure (PKI) system to a more modern, scalable, and simpler solution using JWTs.

## Problem and Initial Solution
Initially, the project considered using a PKI system for secure user authentication. The idea was to issue SSL certificates to users based on their unique interactions, thereby providing a secure and unique identifier for each user. While PKI systems are robust and secure, they present several challenges:

- **Complexity:** Managing a PKI system and SSL certificates can be complex, requiring significant infrastructure and maintenance.
- **User Experience:** Requiring users to handle certificates introduces usability hurdles and potential confusion.
- **Scalability:** As the user base grows, the scalability of managing numerous certificates could become problematic.

## Proposed Solution: JWTs
To address these challenges, JSON Web Tokens (JWT) are proposed as a viable alternative. JWTs offer several advantages:

- **Simplicity:** Easier to implement and manage compared to SSL certificates.
- **User-Friendly:** No need for end-users to manage certificates, as tokens are easily stored and transmitted.
- **Scalability:** JWTs are stateless and lightweight, making them ideal for scalable applications.
- **Security:** While JWTs are not a replacement for SSL/TLS in terms of data encryption in transit, they provide a secure way to authenticate and transmit user classification data.

## Technologies Used
- **Next.js:** A React framework for building server-side rendered applications.
- **JWT:** For creating, signing, and verifying tokens that contain the user classifications.
- **Node.js:** The runtime environment for the backend server.
- **Chakra-UI:** For front end and user interactivity.

## How to Use

1. Clone the repository:

   ```bash
   git clone https://github.com/your-github/NextJS-JWT-Auth-Demo.git
    ```

2. Navigate to the project directory:

   ```bash
   cd jwt-user-auth
    ```

3. Install dependencies:

   ```bash
   npm install
    ```

4. Set up the environment variables:
Create a .env.local file in the root directory.
Add the following line (replace your_secret_key with your actual JWT secret key):

    ```bash
    JWT_SECRET_KEY=your_secret_key
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

This will start the server on http://localhost:3000

6. Open your web browser and navigate to http://localhost:3000 to view the application.

## Additional Notes
The JWT secret key should be kept private and not exposed in your codebase or version control.
For production, ensure to configure the JWT secret key securely in your production environment.

# Components Overview

## Issuer
The Issuer component is responsible for generating JWTs. Users can select a classification (e.g., Dog, Cat, Fish, Bird) from a dropdown menu, and a JWT is issued based on this selection. The token includes an expiration time, enhancing security by ensuring the token is only valid for a specific period. The Issuer component communicates with the backend API to create these tokens and stores them in the browser's localStorage for ease of access. Tokens can also be stored on a web app or database for ease of access, safe keeping and user authentication.

## Verifier
The Verifier component is designed to validate JWTs. It takes a JWT (usually from the browser's localStorage) and sends it to the backend API for verification. The API checks the token's validity, including whether it's expired or has been tampered with. The Verifier uses this response to inform the user of the token's status. This component is crucial for ensuring that the JWTs in circulation are valid and have not been compromised. Valid tokens have a class associated with them which can be decoded, read and used for additional logic such as redirecting users based on their class and more.

## BlackLister
The BlackLister component provides the functionality to blacklist tokens. When a token is blacklisted, it is added to a list of tokens that are no longer considered valid, regardless of their original expiration time. This feature is particularly useful for invalidating tokens that might have been issued erroneously or compromised in some way.

## API (/pages/api/jwt.ts)
The backend API, defined in /pages/api/jwt.ts, handles the creation, verification, and blacklisting of tokens. It uses the jsonwebtoken library to sign and verify JWTs. The API defines three main actions:

Issue ('issue' action): Creates a new JWT based on the provided classification and expiration time.
Verify ('verify' action): Checks if a given JWT is valid, not expired, displays its classification, and whether or not it is on the blacklist.
Blacklist ('blacklist' action): Adds a token to the blacklist, effectively invalidating it for future verification requests.
The API ensures that all interactions with JWTs are securely handled, leveraging environment variables for sensitive information like the JWT secret key.

