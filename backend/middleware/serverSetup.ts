import { Express } from 'express';

export class ServerHandler {
  private app: Express;
  private port: number;

  constructor(app: Express, port: number) {
    this.app = app;
    this.port = port;
  }
  startServer(): void {
    const server = this.app.listen(this.port, () => {
      console.log(`Server started on ${this.port}`);
    });
    process.on('uncaughtException', (err: Error) => {
      this.handleUncaughtException(err);
    });

    process.on('unhandledRejection', (reason: any) => {
      this.handleUnhandledRejection(reason, server);
    });
  }

  private handleUncaughtException(err: Error): void {
    console.log('uncaught Exeption:', err.stack, err.message);
    process.exit(1);
  }

  private handleUnhandledRejection(reason: any, server: any): void {
    console.log('unhandled rejection:', reason.stack, reason.message);
    server.close(() => {
      process.exit(1);
    });
  }
}
