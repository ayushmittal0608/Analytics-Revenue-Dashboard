# Technical Assessment
A full-stack analytics dashboard built as part of the technical assessment. The application provides authenticated users with interactive revenue analytics, regional filtering, and additional business insights through a clean dashboard interface.

## Overview
The application consists of:

- A Next.js frontend for the dashboard and user interface
- A NestJS backend providing authenticated REST APIs
- A PostgreSQL database for persistent data storage
- JWT-based authentication for protected routes
- Interactive analytics using Recharts
- Region-based filtering across supported analytics
- Additional visualizations to provide business insights beyond the mandatory assessment requirement

The primary goal was to build a dashboard that is not only functional, but also provides useful insights that can help users understand revenue patterns and underlying business data.

## Key Features
### Authentication
- JWT-based authentication
- Protected backend routes using NestJS guards
- Authenticated dashboard access
- User information retrieved from the authenticated session

### Revenue Analytics
The dashboard provides multiple views for understanding revenue:
- Revenue over time
- Revenue by category
- Region-based revenue filtering
- Configurable revenue periods such as:
    - 3 months
    - 6 months
    - 1 year

### Additional Business Insights
In addition to the mandatory analytics requirement, the dashboard includes additional visualizations designed to make the data more useful for decision-making.

These include:
- Revenue trends over time
- Revenue distribution across categories
- Regional comparison through filtering
  
The intention is to allow users to move from a high-level revenue overview to more detailed analysis. However, I have not implemented too many KPIs, rather I just built two widgets, explaining most of the parameters, creating a balance of core business requirements reflection, ease of interactivity of dashboard with users and precision on the delivery.

## Tech Stack
### Frontend
- Next.js
- React.js
- Typescript
- Recharts
- TailwindCSS

### Backend
- Nest.js
- Typescript
- REST APIs
- JWT Authentication
- Drizzle ORM

### Database
- PostgreSQL

### Development Tools
- Node.js
- npm
- Git/github

## Application Architecture
The application follows a frontend-backend-database architecture:

<img width="1312" height="1199" alt="eb11e4a7-a452-4659-aadd-cd36fc6ac23d" src="https://github.com/user-attachments/assets/fb851e46-ba02-4bba-8eae-ef456bed1e26" />

This separation keeps presentation, business logic, and persistence concerns independent.

## Project Architecture
```
project_root/
|
├── frontend/
|     ├── app/
|     ├── components/
|     ├── lib/
|     ├── types/
├── backend/
|     ├── data/
|     ├── src/
|     |    ├── analytics/
|     |    ├── auth/
|     |    ├── common/
|     |    ├── db/
|     |    ├── users/
|     |    ├── app.module.ts
|     |    └── main.ts
|     ├── package-lock.json
|     └── package.json
└── readme.md
```

## Getting Started
### Prerequisites
Make sure the following are installed:
- Node.js
- npm
- PostgreSQL
- Git

Verify the installations:
```
node --version
npm --version
psql --version
```

#### Clone the repository
```
git clone https://github.com/ayushmittal0608/Analytics-Revenue-Dashboard
cd Analytics-Revenue-Dashboard
```

#### Backend setup
Navigate to the backend directory:
```
cd backend
```

Install dependencies:
```
npm install
```
Create the backend environment file:
.env
```
DATABASE_URL=<DATABASE_URL>
JWT_SECRET=<JWT_SECRET>
PORT=<PORT>
FRONTEND_URL=<FRONTEND_URL>
```
Start the backend:
```
npm start
```
The API will be available at: http://localhost:3001

#### Database Setup
Create a PostgreSQL database
```
CREATE DATABASE <database_name>;
```
Generate the table through schema using the following command:
```
npm run db:generate
```
In order to update pending changes in the table, run the following command:
```
npm run db:migrate
```
Push the table inside the postgreSQL database using the following command:
```
npm run db:push
```
Seed the data inside the table using the following command:
```
npm run db:seed
```
In order to view the tables and data, run the following command:
```
npm run db:studio
```

#### Frontend Setup
Open another terminal and navigate to the frontend:
```
cd frontend
```
Install dependencies:
```
npm install
```
Configure the API URL in the frontend environment file:
```
NEXT_PUBLIC_API_URL=<BACKEND_URL>
```
Start the development server:
```
npm run dev
```
The frontend will generally be available at: http://localhost:3000

### Authentication Flow
The application uses JWT-based authentication.

The general flow is:

<img width="1312" height="1199" alt="eca8b8f7-6930-470a-8820-6a4fc96989f1" src="https://github.com/user-attachments/assets/e59ae5bb-ce2b-40ad-860b-c63d3561d8e5" />

Protected endpoints use NestJS authentication guards to ensure that only authenticated users can access dashboard data.

# Analytics

## Revenue Over Time

The revenue trend visualization shows how revenue changes over a selected period.

Supported periods include:

* **3 months**
* **6 months**
* **1 year**

The chart helps identify:

* Revenue growth or decline
* Periodic fluctuations
* Changes in revenue over time

## Revenue by Category

The category visualization shows how revenue is distributed across different business categories.

This allows users to quickly identify:

* Major revenue-generating categories
* Relative contribution of each category
* Differences in revenue composition

## Regional Filtering

The dashboard supports filtering by region:

```text
ALL
NORTH
SOUTH
EAST
WEST
```

Selecting a region updates the analytics to display the corresponding subset of data.

This makes the dashboard useful for comparing business performance across geographical regions.

# API Endpoints

The backend exposes REST APIs for authentication and analytics.

| Method | Endpoint                         | Description                 | Authentication |
| ------ | -------------------------------- | --------------------------- | -------------- |
| POST   | `/auth/login`                    | Authenticate user           | No             |
| GET    | `/analytics/revenue-over-time`   | Revenue trend data          | JWT            |
| GET    | `/analytics/revenue-by-category` | Revenue grouped by category | JWT            |

## Revenue Trend Parameters

Example:

```http
GET /analytics/revenue-over-time?period=3M&region=NORTH
```

### Supported Periods

```text
3M
6M
1Y
```

### Supported Regions

```text
ALL
NORTH
SOUTH
EAST
WEST
```

# Technical Decisions

## Why Next.js?

Next.js provides a structured React application architecture and makes it straightforward to build a scalable dashboard application.

TypeScript was used to improve type safety across components, API responses, and shared application types.

## Why NestJS?

NestJS provides a modular backend architecture with built-in support for:

* Controllers
* Services
* Dependency injection
* Guards
* Authentication
* Validation

This makes the backend easier to maintain as additional analytics and business functionality are introduced.

## Why PostgreSQL?

PostgreSQL is well suited for structured relational business data and analytical queries.

It also provides strong support for:

* Aggregations
* Filtering
* Indexing
* Relational queries
* Transactional consistency

## Why Recharts?

Recharts provides React-native chart components while allowing the visualizations to remain customizable and responsive.

# Security Considerations

The application follows several basic security practices:

* JWT authentication for protected APIs
* Secrets stored in environment variables
* Authentication checks are performed on protected backend routes
* Frontend does not directly access the database
* Backend acts as the boundary between the UI and database

# Error Handling

The application handles common API and frontend states including:

* Loading states
* API failures
* Authentication failures
* Invalid responses
* Empty datasets

The frontend displays appropriate UI feedback instead of exposing raw backend errors directly to users.

# Responsive Dashboard

The dashboard is designed to work across different screen sizes.

The layout separates:

* Header/navigation
* Filters
* Analytics cards/charts
* Supporting visualizations

Charts use responsive containers so that they adapt to the available screen width.

# Testing the Application

After starting both the frontend and backend:

1. Open the frontend URL.
2. Log in using the provided test credentials.
3. Navigate to the dashboard.
4. Select different revenue periods.
5. Change the region filter.
6. Verify that the charts update accordingly.
7. Test the dashboard with different combinations of period and region.

### Example

```text
Period: 6M
Region: NORTH
```

The dashboard should request the corresponding filtered data from the backend.

# Additional Insights

Beyond the core required visualization, I focused on making the dashboard useful for exploring the data rather than displaying a single metric.

The additional views allow a user to answer questions such as:

* How is revenue changing over time?
* Which categories contribute most to revenue?
* How does the selected region compare with the overall dataset?
* Does revenue composition change when the region is changed?

This approach keeps the dashboard focused on **actionable exploration of the underlying data**.

# Known Limitations

The current implementation is primarily focused on the requirements of the technical assessment.

Potential improvements include:

* More advanced filtering
* Date-range selection
* Exporting analytics to CSV/PDF
* More granular category analysis
* Pagination for large datasets
* Automated testing
* Production-grade logging and monitoring
* Role-based access control for multiple user types
* More advanced caching for frequently requested analytics

### Login Credentials
#### Admin
```
Email: admin@example.com
Password: admin123
```
#### Manager(North)
```
Email: north@example.com
Password: north123
```
#### Manager(South)
```
Email: south@example.com
Password: south123
```

# Future Improvements

If this application were developed further, I would consider adding:

## 1. Advanced Analytics

* Month-over-month growth
* Year-over-year growth
* Revenue contribution percentages
* Category trends over time

## 2. Better Data Exploration

* Custom date ranges
* Multi-region selection
* Category filters
* Search and sorting

## 3. Performance

* Database indexing based on query patterns
* API response caching
* Query optimization
* Server-side pagination where appropriate

## 4. Testing

* Unit tests for business logic
* API integration tests
* Frontend component tests
* End-to-end dashboard tests

## 5. Production Readiness

* Structured logging
* Monitoring
* CI/CD pipeline
* Environment-specific configuration
* Production database configuration

# Conclusion

This project demonstrates a full-stack approach to building an authenticated analytics dashboard using **Next.js, NestJS, TypeScript, PostgreSQL, and Recharts**.

The implementation focuses on:

* Clean separation between frontend and backend
* Secure authenticated APIs
* Reusable React components
* Type-safe development
* Interactive analytics
* Region-based filtering
* Extensibility for future business insights

The dashboard was designed not only to satisfy the required assessment functionality, but also to provide a foundation that could be extended into a larger analytics product.

# Author

**Ayush Mittal**

Software Engineer
B.Tech — Electronics & Computer Engineering

* **GitHub:** `https://github.com/ayushmittal0608`
* **LinkedIn:** `https://www.linkedin.com/in/ayush-mittal-1b2059228/`

```
Thanks for the opportunity. I appreciate your time and consideration. Wishing you all the best with your talent search.
```






