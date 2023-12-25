const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  processText(text, key, encrypt) {
    if (!text || !key) {
      throw new Error("Both text and key are required parameters.");
    }

    text = text.toUpperCase();
    key = key.toUpperCase();

    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const currentChar = text[i];

      if (this.alphabet.indexOf(currentChar) === -1) {
        result += currentChar;
        continue;
      }

      const keyChar = key[keyIndex % key.length];
      const keyShift = this.alphabet.indexOf(keyChar);
      const textShift = this.alphabet.indexOf(currentChar);

      let shiftedIndex;
      if (encrypt) {
        shiftedIndex = (textShift + keyShift) % this.alphabet.length;
      } else {
        shiftedIndex =
          (textShift - keyShift + this.alphabet.length) % this.alphabet.length;
      }

      result += this.alphabet[shiftedIndex];
      keyIndex++;
    }

    return this.isDirect ? result : result.split("").reverse().join("");
  }

  encrypt(text, key) {
    if (!text || !key) {
      throw new Error("Both text and key are required parameters.");
    }
    return this.processText(text, key, true);
  }

  decrypt(text, key) {
    if (!text || !key) {
      throw new Error("Both text and key are required parameters.");
    }
    return this.processText(text, key, false);
  }
}

module.exports = {
  VigenereCipheringMachine,
};
