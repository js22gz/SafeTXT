SAFE.TXT

A secure HTML-based .txt-editor with encryption on all files. Everything happens locally in the browser - no server, no uncrypted data in the cloud.  
Encryption happens in the memory via Web Crypto API and files are autosaved on disk (local or cloud). Plain text never leaves the device. 


Functionality and Key Features:
Edge Encryption: Data is encrypted in the browser memory using AES-GCM 256 via the Web Crypto API.

Zero-Knowledge Architecture: The application is entirely client-side. The developer has no servers, no databases, and zero access to your encryption keys or content.

Collision Detection: FileSystemObserver-based sync prevents data loss during collaborative use by notifying users if a cloud file has been updated by another teacher.

Privacy by Design: No tracking, no cookies, and no telemetry.

🛠️ Technical Implementation

Architecture: Single-file HTML/JS SPA (Single Page Application).

Security: 
- PBKDF2 key derivation with 600,000 iterations (FIPS-140 compliant, 6x iteration increase for enhanced brute-force resistance)
- Per-file random salt for enhanced key isolation
- AES-GCM 256-bit encryption
- Minimum 12-character password requirement (NIST 2024 guidelines)
- 10 minute inactivity timeout (GDPR best practice)

PWA Ready: Full offline support via Service Workers; installable as a native app on Chrome OS, Windows, and macOS.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the terms of the **MIT license**. See [LICENSE](LICENSE) for details.

Created for secure, sovereign, and simple text.
