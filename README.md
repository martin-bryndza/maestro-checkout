# Maestro Booking Demo

A Flutter demo app for a booking/checkout flow (tickets → date/time → questions → payment → success).

## Prerequisites

- [Flutter SDK](https://docs.flutter.dev/get-started/install) (channel: stable). Verify with:
  ```
  flutter doctor
  ```

### Android (emulator or physical device) — required for Maestro tests

Maestro drives the app through its native Android/iOS accessibility tree, so an
Android emulator or physical device is the supported way to run this project.

Needs the Android SDK installed (via whichever IDE/tooling you prefer — Android Studio, VS Code with the Flutter extension, or the command-line tools), plus either a running emulator (`flutter emulators --launch <id>`) or a physical device connected with USB debugging enabled.

```bash
flutter pub get
flutter devices        # confirm your emulator/device shows up
flutter run             # picks the first available device
```

`flutter doctor` will tell you exactly what's missing — follow its instructions if something is red/yellow.

### Web / Chrome — quick manual preview only

```bash
flutter pub get
flutter run -d chrome
```

Useful for eyeballing the UI quickly, but **not** a target for the Maestro
flow — Maestro cannot drive a web build, only a native Android/iOS one.

## Project structure

```
lib/
  main.dart              # app entry point, theming
  models/                # app/booking state
  screens/                # each step of the booking flow
  widgets/                # shared UI pieces
  utils/, ids/, l10n/     # helpers, id generation, strings
```

## Tests

### Flutter Unit / Widget Tests
```bash
flutter test
```

### Maestro End-to-End (E2E) Tests

Maestro flows are located in `test/maestro/`.

To run the happy path smoke test (minimal path with promo code):
```bash
maestro test test/maestro/purchase_flow.yaml
```

To run the validation rules & selection resets test:
```bash
maestro test test/maestro/validations_and_resets_flow.yaml
```

To run the card payment declined flow:
```bash
maestro test test/maestro/card_payment_declined_flow.yaml
```

For a detailed breakdown of test scenarios, validation rules, and architecture, see [test/maestro/README.md](test/maestro/README.md).


