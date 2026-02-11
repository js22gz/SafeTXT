# SAFE.TXT

A secure HTML-based .txt-editor with encryption on all files. Everything happens locally in the browser - no server, no uncrypted data in the cloud.  
Encryption happens in the memory via Web Crypto API and files are autosaved on disk (local or cloud). Plain text never leaves the device. 

## Functionality and Key Features:
- Offline-capable PWA with service worker cache hardening
- Client-side AES-GCM encryption with PBKDF2 (600k iterations) and per-file salts
- Password policy (12+ chars) and inactivity lock after 10 minutes
- File-system handle caching with conflict detection and backups

Edge Encryption: Data is encrypted in the browser memory using AES-GCM 256 via the Web Crypto API.

Zero-Knowledge Architecture: The application is entirely client-side. The developer has no servers, no databases, and zero access to your encryption keys or content.

Privacy by Design: No tracking, no cookies, and no telemetry.

## License

This project is licensed under the terms of the **MIT License**. See [LICENSE](LICENSE) for details.
Created for secure, sovereign, and simple text.
