## Auction Platform - README

Welcome to the Auction Platform, a scalable and microservices-based solution for managing online auctions. This project is built to handle auction creation, bidding, search functionalities, user notifications, and more. It leverages modern development practices, such as event-driven communication via RabbitMQ and gRPC for inter-service communication, and is fully containerized for easy deployment. The platform has been deployed to the web using **DigitalOcean** and **Kubernetes** for seamless scalability and management.

### Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Services](#services)
- [Client Application](#client-application)
- [Deployment](#deployment)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

### Features

- **Auction Management**: Create, update, and delete auctions.
- **Bidding System**: Place and track bids in real-time.
- **Search Functionality**: Search for auction items based on various criteria.
- **Notification System**: Real-time notifications for auction events (e.g., bids, auction updates).
- **User Management**: Secure login, registration, and authentication system using Identity Service.
- **Event-Driven Architecture**: Services communicate asynchronously using RabbitMQ.
- **gRPC Communication**: Synchronous communication between microservices where needed.
- **Gateway Service**: Acts as a single entry point for all client requests and routes them to the appropriate backend services.
- **Highly Scalable and Containerized**: Dockerized services for seamless deployment and scaling.
- **Cloud Deployment**: Deployed using **DigitalOcean** with **Kubernetes** for high availability and scalability.

### Architecture

The Auction Platform follows a **microservices architecture**, where each service is responsible for a specific functionality. These services are independently deployable and communicate via event bus, event-driven messaging (RabbitMQ), or gRPC.

- **RabbitMQ**: Manages asynchronous messaging for events like auction creation, updates, and bid placements.
- **gRPC**: Synchronous communication between services for real-time responses.
- **API Gateway**: The **Gateway Service** consolidates requests from the client, providing a single entry point for all backend services, handling routing, load balancing, and security.
- **Databases**:
  - **PostgreSQL**: Relational database for structured data, such as user information and auction details.
  - **MongoDB**: NoSQL database for fast and scalable storage of unstructured auction-related data (e.g., items for search).

---

### Technologies

- **ASP.NET Core** for the microservices.
- **RabbitMQ** for message-based communication.
- **gRPC** for high-performance, synchronous inter-service calls.
- **Docker** for containerizing the services.
- **Kubernetes** for managing deployment and scaling in DigitalOcean.
- **PostgreSQL** as the primary relational database.
- **MongoDB** as the NoSQL database for search-related data.
- **IdentityServer** for authentication and authorization.
- **SignalR** for real-time notifications.

---

### Services

1. **Auction Service**: Manages auctions including creation, updates, and deletion (CRUD operations).
2. **Bidding Service**: Handles all bidding-related operations.
3. **Search Service**: Allows users to search for auctions based on various criteria.
4. **Notification Service**: Sends real-time notifications to users for auction events.
5. **Identity Service**: Responsible for user authentication and authorization, ensuring secure access to the platform.
6. **Gateway Service**: Acts as a reverse proxy, routing incoming HTTP/gRPC requests to the appropriate backend service.
7. **RabbitMQ**: Handles event-based communication between services.
8. **PostgreSQL**: Stores structured data like user accounts and auction details.
9. **MongoDB**: Stores and retrieves unstructured auction item data, optimized for search.

---

### Client Application

The platform includes a **Next.js** client-side application that interacts with the backend microservices via the **Gateway Service**. The Next.js app provides users with:

- Browsing and searching auction listings.
- Placing bids in real-time.
- Managing user accounts, registration, and login.
- Receiving real-time notifications on bid updates, auction status changes, etc.

The Next.js client communicates with the backend using **REST APIs** exposed by the Gateway Service, ensuring an optimized and scalable frontend experience.

---

### Deployment

This project is deployed using **DigitalOcean** and orchestrated with **Kubernetes**. Each service is containerized using **Docker**, ensuring that the platform can scale efficiently and handle high levels of traffic.

Key deployment highlights:

- **DigitalOcean Kubernetes** manages the containers and ensures high availability.
- **Load Balancer** efficiently distributes incoming traffic across multiple backend services, ensuring optimal performance and preventing overloading of any single service.
- **RabbitMQ** and **gRPC** handle messaging and inter-service communication.
- **Gateway Service** acts as an entry point for routing client requests to the appropriate backend services.
- **Identity Server** secures the platform with robust authentication and authorization protocols.

You can access the deployed application at: **[app.carsbid.store](https://app.carsbid.store)**.
