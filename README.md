LocalNote Secure 🔐

LocalNote Secure is a "Zero-Knowledge" Progressive Web App (PWA) designed for GDPR-compliant note-taking in educational environments. It enables teachers to record sensitive student observations with high-grade local encryption before the data ever touches the cloud.

🛡️ The Mission

Educational professionals often handle sensitive data that requires higher protection than standard cloud documents offer. LocalNote bridges the gap between digital convenience and strict data sovereignty.

🚀 Key Features

Edge Encryption: Data is encrypted in the browser memory using AES-GCM 256 via the Web Crypto API.

Zero-Knowledge Architecture: The developer has no servers and zero access to your keys or content.

Storage Sovereignty: Files are stored directly in your municipality-managed Google Drive, leveraging existing Data Processing Agreements (DPA).

Collision Detection: Session-aware polling prevents data loss during collaborative use.

Privacy by Design: No tracking, no cookies, and no telemetry.

🛠️ Technical Implementation

Architecture: Single-file HTML/JS SPA (Single Page Application).

Security: PBKDF2 key derivation with 100,000 iterations and a fixed municipal salt.

PWA Ready: Offline support via Service Workers and installable on Chrome OS, Windows, and macOS.

⚖️ License & Attribution

This work is licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) License.

You are free to:

Share — copy and redistribute the material in any medium or format.

Adapt — remix, transform, and build upon the material for any purpose, even commercially.

Under the following terms:

Attribution — You must give appropriate credit to the original creator, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/.

Created for secure, sovereign, and simple educational documentation.