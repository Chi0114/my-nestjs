import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CustomConfigService {
  private readonly algorithm = 'aes-256-ctr';
  private readonly secretKey = process.env.ENCRYPTION_SECRET;

  constructor() {
    if (!this.secretKey) {
      throw new InternalServerErrorException('ENCRYPTION_SECRET is not defined');
    }
  }

  decrypt(encrypted: { iv: string, content: string }): string {
    if (!encrypted.iv || !encrypted.content) {
      throw new InternalServerErrorException('Invalid encryption data');
    }

    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.secretKey),
      Buffer.from(encrypted.iv, 'hex')
    );

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encrypted.content, 'hex')),
      decipher.final(),
    ]);

    return decrypted.toString();
  }

  getDatabasePassword(): string {
    console.log("secretKey===============>>>>:" + this.secretKey);
    return this.decrypt({
      iv: process.env.DATABASE_PASSWORD_IV,
      content: process.env.DATABASE_PASSWORD_CONTENT,
    });
  }
}

