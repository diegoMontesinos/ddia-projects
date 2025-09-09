# Chapter 1: Reliable, Scalable and Maintainable Applications

## Project definition

Write a notes API microservice (CRUD) in Node.js or Python.

Think and define which means for the project to be reliable (for example: the system should not lost the date if the process fails).

Try to write Escribe pruebas de resilience tests (kill the process, restart it, What happens? are the data preserved?).

## Details

- The API should be either in Node.js/Express or Python/FastAPI.
- Endpoints: `GET /notes`, `POST /notes`, `PUT /notes/:id`, `DELETE /notes/:id`.
- The data should be stored in a local JSON file.
- The service should be containerized in Docker.

## Metrics to measure

- Average latency y p95/p99 (`wrk` o `k6`).
- HTTP Errors (500, 400).
- What happens if kill the process while writing? (reliability).

## Deliverables

- API running locally in Docker.
- A definition of reliability, scalability of the service.
- A plan for test the reliability of the service.
- A plan for measure the metrics.
