---
paths:
  - "**/*.dart"
  - "pubspec.yaml"
---
# Flutter rules
- Keep state simple (setState or one small provider). No heavy architecture for a hackathon.
- Run `flutter analyze` before each commit and fix errors, not only warnings that block the build.
- Test on the real device or emulator the user has. Say clearly when something needs a physical device.
- Prefer ready packages from pub.dev only when they save more than 30 minutes.
