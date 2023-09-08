import { Salt } from "./salt";

export interface EncryptedFile {
  salt: Salt;
  content: string;
  keyName: string;
}