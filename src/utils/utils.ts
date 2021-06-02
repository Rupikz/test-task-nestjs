import * as bcrypt from 'bcryptjs';

export class UtilsService {
  /**
   * generate hash from password or string
   * @param {string} password
   * @returns {string}
   */
  static generateHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * validate text with hash
   * @param {string} password
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  static validateHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash || '');
  }

  /**
   * Parse authorization token
   * @param {hdrValue} authorizationHeader
   * @returns {RegExpMatchArray}
   */
  static parseAuthHeader(hdrValue: string): string {
    if (typeof hdrValue !== 'string') {
      return null;
    }
    const matches = hdrValue.split(' ')[1];
    return matches;
  }
}
