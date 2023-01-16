/* This example uses the crypto library's getRandomValues function to generate a random initialization vector (IV) for the encryption. The IV is a random value that is used in conjunction with the encryption key to ensure that identical plaintext input will produce different ciphertext output.

It also uses the crypto - js library's PBKDF2 function to convert the password to a key for encryption and decryption. PBKDF2 applies a pseudorandom function, such as a cryptographic hash, to the input password along with a salt value, in order to produce a derived key, which is then used as the encryption key.

It also uses the uuid library to generate a random salt */

import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
// import { getRandomValues } from 'crypto';

function SecureEncryptionExample() {
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

    const handleEncryption = () => {
        // Generate a random initialization vector (IV)
        const iv = new Uint8Array(16);
        this.crypto.getRandomValues(iv);

        // Convert the password to a key for encryption
        const key = CryptoJS.PBKDF2(password, uuidv4(), { keySize: 256 / 32 });

        // Encrypt the text
        const ciphertext = CryptoJS.AES.encrypt(text, key, { iv });

        // Combine the IV and ciphertext and convert to a string
        const encrypted = `${iv.toString()}:${ciphertext.toString()}`;
        setEncryptedText(encrypted);
    };

    const handleDecryption = () => {
        // Split the IV and ciphertext
        const [iv, ciphertext] = encryptedText.split(':');

        // Convert the password to a key for decryption
        const key = CryptoJS.PBKDF2(password, uuidv4(), { keySize: 256 / 32 });

        // Decrypt the text
        const bytes = CryptoJS.AES.decrypt(ciphertext, key, { iv });
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        setDecryptedText(originalText);
    };

    return (
        <div>
            <input type="text" onChange={e => setText(e.target.value)} />
            <input type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleEncryption}>Encrypt</button>
            <textarea value={encryptedText} onChange={e => setEncryptedText(e.target.value)} />
            <button onClick={handleDecryption}>Decrypt</button>
            <p>Decrypted Text: {decryptedText}</p>
        </div>
    );
}

export default SecureEncryptionExample;