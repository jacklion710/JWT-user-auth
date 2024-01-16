# NextJS-JWT-Auth-Demo

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
*Instructions on cloning the repository, installing dependencies, and running the project.*
