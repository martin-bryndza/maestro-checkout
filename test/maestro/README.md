# Maestro End-to-End Automation Tests

This directory contains Maestro end-to-end (E2E) test flows for the ticket booking demo application (`com.ventrata.maestro_booking_demo`).

---

## 🚀 Quick Start & How to Run

### Prerequisites
1. **Flutter SDK** installed and initialized.
2. **Android Emulator** or physical Android device connected with USB debugging enabled.
3. **Maestro CLI** installed ([Install Instructions](https://maestro.mobile.dev/getting-started/installing-maestro)):
   ```bash
   curl -FsSL "https://get.maestro.mobile.dev" | bash
   ```

### 1. Build and Run the App on Device
Ensure your emulator or device is running:
```bash
flutter run
```

### 2. Execute the Maestro E2E Tests

Run the minimal happy path smoke test with promo code:
```bash
maestro test test/maestro/purchase_flow.yaml
```

Run the validation rules & resets assertion test:
```bash
maestro test test/maestro/validations_and_resets_flow.yaml
```

Run the card payment declined flow:
```bash
maestro test test/maestro/card_payment_declined_flow.yaml
```

Run all flows in sequence:
```bash
maestro test test/maestro/
```

---

## 📋 Test Flows Overview

### 1. Happy Path Smoke Test (`purchase_flow.yaml`)
A single, fast end-to-end smoke test driving the minimal user path from product selection to a confirmed 0.00 EUR order:
1. **Package Selection**: Selects **NYC Icons Express** package on Home screen.
2. **Ticket Selection**: Selects 1 Adult ticket.
3. **Date & Time Selection**: Sets force open debug mode (`Debug_SetForceOpenButton`), selects dates/times for required products (Empire State Building, Madame Tussauds, Statue of Liberty Ferry).
4. **Questions Form**: Fills required questions (textarea, referral dropdown, per-ticket checkbox).
5. **Checkout & Promo Application**: Fills contact details, taps `Checkout_EnterPromoButton` to unlock promo hint, returns (`back`) to Questions screen, applies `MAESTROFREE`, and continues back to Checkout.
6. **Order Confirmation & Success Page**: Confirms order (0.00 EUR total) and asserts completion on `Success_Page` (`Success_TicketCard`, `Success_FreeBadge`, `Success_FinalTotal`, `Success_PrimaryActionButton`).

---

### 2. Validations & Resets Test (`validations_and_resets_flow.yaml`)
A focused test asserting negative validation rules, error states, and state reset behavior across the application:
1. **Ticket Rules Validation**:
   - Increments a Child ticket without an Adult and asserts `Tickets_ChildRequiresAdultError` is displayed.
   - Adds an Adult ticket and asserts the error disappears.
2. **Date & Time Selection Reset Rule**:
   - Confirms dates & times for mandatory products.
   - Taps `DateTime_ResetSelectionLink` and asserts all confirmed product dates are cleared (`assertNotVisible`).
   - Re-selects dates/times to proceed.
3. **Questions Page Validation**:
   - Attempts to proceed with empty required fields and asserts `Questions_ValidationError` appears.
   - Fills required fields to proceed.
4. **Checkout Contact Validation**:
   - Attempts to confirm order without contact details and asserts field errors (`Checkout_FirstNameError`, `Checkout_LastNameError`, `Checkout_CountryError`, `Checkout_StateProvinceError`).
   - Fills contact details to verify form completion.

---

### 3. Card Payment Declined Flow (`card_payment_declined_flow.yaml`)
Covers the card payment path when no promo code is applied:
- Navigates through ticket selection, date/time pickers, and questions form.
- Fills contact details on Checkout and proceeds directly to the `Payment_Page`.
- Inputs 16-digit card number, MMYY expiry, 3-digit CVC, and cardholder name.
- Submits payment and verifies transition to `PaymentResult_DeclinedPage` ("Payment declined").
- Tests the "Try again" action button returning the user to `Payment_Page`.

---

## 🛠️ Design & Technical Highlights

- **Stable Semantic Selectors**: All actions and assertions rely exclusively on stable accessibility identifiers defined in `lib/ids/booking_ids.dart` (mapped via Flutter's `Semantics(identifier: ...)`).
- **Simulated Latency Handling**: Uses `extendedWaitUntil: visible` with a 15-second timeout on key page transitions to accommodate the app's `withSimulatedLatency` (3-8s random delay).
- **Deterministic Time Slots**: Activates `Debug_SetForceOpenButton` on the DateTime screen to ensure test runs pass consistently regardless of local time.
- **Keyboard Handling**: Explicitly issues `hideKeyboard` commands after text inputs to prevent soft keyboards from obstructing underlying UI controls or touch targets.
