# Chapter 1: Reliable, Scalable and Maintainable Applications

## Project definition

Write a notes API microservice (CRUD) in Node.js saving them in a JSON file, and put it under stress scenarios.

### Reliability

Think and define which means for the project to be reliable, for example:

- The system should not lost the data if the process fails.
- The system register or delete notes correctly.

Try to write resilience tests, for example, by killing the process, and restart it. Describe what happens, or if the data are preserved.

### Scalability

Monitor the health of the API by checking the **p50** and **p90** percentiles using Prometheus and Grafana.

## Details

- The API should in Node.js/Express.
- Endpoints: `GET /notes`, `GET /notes/:id`, `POST /notes`, `PUT /notes/:id`, `DELETE /notes/:id`.
- The data should be stored in a local JSON file.
- The service should be containerized in Docker.

## Metrics to measure

- Average latency y p95/p99. Use `k6` to stress the API.
- HTTP Errors (500, 400).
- What happens if kill the process while writing? (reliability).

## Deliverables

- API running locally in Docker.
- A definition of reliability, scalability of the service.
- A plan for test the reliability of the service.
- A plan for measure the metrics.
