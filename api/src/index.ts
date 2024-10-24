import { server } from './server';
import { PORT } from './config/envs';
import 'reflect-metadata';
import { AppDataSource } from './config/typeorm';

AppDataSource.initialize().then((res) => {
  console.log('Connection to the database was successfully');
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

// server.listen(PORT, () =>{
//  console.log(`Server listening on PORT ${PORT}`);
// })
