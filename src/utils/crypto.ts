import crypto from "crypto";

export default class Crypto {
  constructor(
    private readonly algorithm = "aes-192-cbc",
    private readonly passwordToCrypt = "SDCDSFJJASIDHHUASGDULXBDGEU"
  ) { }

  public crypt(param: string): string {
    const key = crypto.scryptSync(this.passwordToCrypt, 'salt', 24);
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(this.algorithm, key, iv);
    let encrypted = cipher.update(param, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  public decrypt(param: string): string {
    const key = crypto.scryptSync(this.passwordToCrypt, 'salt', 24);
    const iv = Buffer.alloc(16, 0); 
    const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
    let decrypted = decipher.update(param, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}