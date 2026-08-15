import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import type { Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      const message =
        typeof body === "string"
          ? body
          : (body as { message?: string | string[] }).message || exception.message;
      response.status(status).json({ message: Array.isArray(message) ? message[0] : message });
      return;
    }

    this.logger.error(exception instanceof Error ? exception.stack : exception);
    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: exception instanceof Error ? exception.message : "Error interno del servidor" });
  }
}
