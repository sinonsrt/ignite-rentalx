import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import createConnection from "../index";

const create = async () => {
  const connection = await createConnection();

  const id = uuidv4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO 
      users
      (id, name, password, email, admin, created_at, driver_license)
      values('${id}', 'admin', '${password}', 'admin@rentalx.com.br', true, 'now()', 'XXXXXXX')
    `
  );

  await connection.close();
};

create().then(() =>
  console.log("Admin user has been successfully created! 👨‍💻")
);
