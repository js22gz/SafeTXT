SAFE.TXT

[![Hits](https://hits.sh/github.com/js22gz/SafeTXT.svg?style=flat&label=repo-visits&color=1a73e8)](https://hits.sh/github.com/js22gz/SafeTXT/)

The Product: 
SAFE.TXT is a "Zero-Knowledge" Progressive Web App (PWA) designed for GDPR-compliant note-taking in educational environments. It enables teachers to record sensitive student observations with high-grade local encryption before the data ever touches the cloud.

The Mission:
Educational professionals often handle sensitive data that requires higher protection than standard cloud documents offer. SAFE.TXT bridges the gap between digital convenience and strict data sovereignty by ensuring that plaintext data never leaves the teacher's device.

Functionality and Key Features

Edge Encryption: Data is encrypted in the browser memory using AES-GCM 256 via the Web Crypto API.

Zero-Knowledge Architecture: The application is entirely client-side. The developer has no servers, no databases, and zero access to your encryption keys or content.

Storage Sovereignty: Encrypted files are stored directly in your municipality-managed Google Drive, leveraging existing Data Processing Agreements (DPA).

Collision Detection: Session-aware polling prevents data loss during collaborative use by notifying users if a cloud file has been updated by another teacher.

Privacy by Design: No tracking, no cookies, and no telemetry.

🛠️ Technical Implementation

Architecture: Single-file HTML/JS SPA (Single Page Application).

Security: 
- PBKDF2 key derivation with 600,000 iterations (FIPS-140 compliant, 6x iteration increase for enhanced brute-force resistance)
- Per-device random salt for each encrypted file
- AES-GCM 256-bit encryption
- Minimum 10-character password requirement (NIST 2024 guidelines)
- 10-minute inactivity timeout (GDPR best practice)
- File format versioning for future-proof encryption updates
- Session key clearing on lock (JavaScript garbage collection dependent)

PWA Ready: Full offline support via Service Workers; installable as a native app on Chrome OS, Windows, and macOS.

⚖️ License & Attribution

This work is licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) License.

You are free to:

Share — copy and redistribute the material in any medium or format.

Adapt — remix, transform, and build upon the material for any purpose, even commercially.

Under the following terms:

Attribution — You must give appropriate credit to the original creator, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/.

Created for secure, sovereign, and simple educational documentation.

📊 Privacy-Respecting Usage Awareness

SafeTXT is committed to "no tracking, no cookies, and no telemetry" for its users. At the same time, it is useful for the developer to know whether the app is being used at all.

To balance these goals, SafeTXT uses a simple anonymous page load counter (via hits.sh) that:

- Increments a single number each time the page is loaded
- Collects zero personal data (no IP logging, no fingerprinting, no user identification)
- Uses no cookies or local storage for tracking
- Is fully visible and transparent to users on the unlock screen
- Is open source (https://github.com/silkky/hits)

This counter does not conflict with the "no tracking" promise because it tracks no individuals and collects no personal information. It simply answers one question: "Is anyone loading this page?"

Additionally, repository owners can use GitHub's built-in Traffic Insights (Settings → Insights → Traffic) to see visitor counts and referral sources for the repository itself, with no code changes required.
