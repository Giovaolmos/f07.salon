import { server } from "./server";

import "reflect-metadata";
import { AppDataSource } from "./config/typeorm";
import { PORT } from "./config/envs";

AppDataSource.initialize().then((res) => {
  console.log("Connection to the database was successfully");
  server.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server listening on http://192.168.1.37:${PORT}`);
  });
});
