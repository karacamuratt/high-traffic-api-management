# High Traffic API Management with Node.js, Nginx & PgBouncer

This project demonstrates how to design, build, and test a **high-traffic, horizontally scalable backend system** using modern backend engineering practices.

It focuses on:

- Load balancing
- Connection pooling
- Caching
- Performance testing
- Bottleneck analysis
- Real-world production simulation

The goal is to understand how Node.js systems behave under heavy load in a controlled local environment.

---

## Why This Project?

Modern backend systems must handle:

- Thousands of concurrent users
- Limited database connections
- High request throughput
- Failures under pressure
- Performance degradation

This project was created to:

- Learn horizontal scaling  
- Understand database connection limits  
- Practice load testing  
- Analyze performance bottlenecks  
- Build production-like architecture  

---

## System Architecture

k6 Load Testing
↓
Nginx Load Balancer
↓
3x Node.js API Instances
↓
PgBouncer Pool
↓
PostgreSQL Database
↓
Redis Cache

Each layer solves a specific scalability problem.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Backend | Node.js, NestJS |
| Database | PostgreSQL |
| ORM | Prisma |
| Cache | Redis |
| Load Balancer | Nginx |
| DB Pooling | PgBouncer |
| Load Testing | k6 |
| Container | Docker & Docker Compose |
| Logging | Pino |
| Monitoring | Prometheus + Grafana (Optional) |

---

## Project Structure

high-traffic-api-management/
│
├── backend/ # NestJS API
├── nginx/ # Nginx configs
├── pgbouncer/ # PgBouncer configs
├── k6/ # Load test scripts
├── monitoring/ # Monitoring stack
└── docker-compose.yml

---

## Infrastructure Setup (Docker)

Start infrastructure services:

- docker-compose up -d


Services started:

- PostgreSQL
- PgBouncer
- Redis
- Nginx
- Monitoring stack (optional)

## PGBouncer Ini Config

[databases]
htl = host=postgres port=5432 dbname=htl user=postgres password=postgres

[pgbouncer]
listen_addr = 0.0.0.0
listen_port = 6432

auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt

pool_mode = transaction
max_client_conn = 3000
default_pool_size = 100
min_pool_size = 20
reserve_pool_size = 50


Purpose:

- PgBouncer prevents database overload by:
- Reusing connections
- Limiting concurrent DB clients
- Preventing connection exhaustion


## .env file

DATABASE_URL="postgresql://postgres:postgres@localhost:6432/htl?pgbouncer=true&connection_limit=10"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/htl"
REDIS_URL="redis://localhost:6379"
AUTO_MIGRATE=false

### Running Multiple API Instances

- PORT=3001 npm run start:api1
- PORT=3002 npm run start:api2
- PORT=3003 npm run start:api3

## Test Configuration 

- Virtual Users: 300
- Duration: 2 minutes
- API Instances: 3
- PgBouncer: Enabled
- Redis Cache: Enabled

# How to run k6 test

- after k6 is installed on your locale, go to command line and run "k6 run k6/products-tests.js"


# Performance Test Results of k6

HTTP
http_req_duration: avg=571ms
p90=1.16s
p95=1.38s

http_req_failed: 0.31%

http_reqs: ~192 req/sec


## Key Learnings

- Nginx distributes traffic efficiently
- PgBouncer protects PostgreSQL
- Redis reduces database load
- Prisma connection limits are critical
- Rate limiters impact performance
- Load testing reveals bottlenecks
