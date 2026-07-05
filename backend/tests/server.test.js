const request = require("supertest");
const app = require("../server");

describe("College Bus Tracker Backend API", () => {
  test("GET / should return backend running message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("College Bus Tracker Backend Running");
  });

  test("GET /api/env-check should return environment status", async () => {
    const response = await request(app).get("/api/env-check");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("supabaseUrlExists");
    expect(response.body).toHaveProperty("supabaseKeyExists");
  });
});