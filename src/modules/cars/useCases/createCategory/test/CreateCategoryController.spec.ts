import request from "supertest";
import { app } from "@shared/infra/http/app";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO 
        users
        (id, name, password, email, admin, created_at, driver_license)
        values('${id}', 'admin', '${password}', 'admin@rentalx.com.br', true, 'now()', 'XXXXXXX')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category ", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category if name exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(400);
  });
});
