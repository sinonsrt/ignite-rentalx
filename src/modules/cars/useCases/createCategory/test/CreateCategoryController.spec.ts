import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("Create category controller", () => {
  it("Should be create a new category", async () => {
    await request(app).get("/cars/available").expect(200);
  });
});
