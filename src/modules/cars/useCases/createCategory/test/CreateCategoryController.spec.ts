import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("Create category controller", () => {
  it("Should be create a new category", async () => {
    const response = await request(app).post("/categories").send({
      name: "Test",
      description: "Category SuperTest",
    });
    //TODO - Retornar ao 200
    expect(response.status).toBe(401);
  });
});
