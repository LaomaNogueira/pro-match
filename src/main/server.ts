import 'reflect-metadata';
import { app } from './config/app';

const port = process.env.NODE_PORT || 3000;

app.listen(port, async () => {
  console.log(`🚀 Pro-Match Service is running on port ${port}`);
});
