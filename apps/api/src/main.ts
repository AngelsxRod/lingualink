import "reflect-metadata";
import { createApp } from "./bootstrap";

async function bootstrap() {
  const { app, appConfig } = await createApp();
  await app.listen(appConfig.port);
  console.log(`Server running in port ${appConfig.port}`);
}

bootstrap();
