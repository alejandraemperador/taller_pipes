import { ValidationPipe } from '@nestjs/common';

// Already configured. Apply this instance to the requested controller parameters.
export const requestValidationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
});
