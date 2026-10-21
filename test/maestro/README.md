# Maestro End-to-End Automation Tests

This directory contains Maestro end-to-end (E2E) test flows for the ticket booking demo application (`com.ventrata.maestro_booking_demo`).

---

## 🚀 Quick Start & How to Run

### Prerequisites
1. **Flutter SDK** installed and initialized.
2. **Android Emulator** or physical Android device connected with USB debugging enabled.
3. **Maestro CLI** installed ([Install Instructions](https://maestro.mobile.dev/getting-started/installing-maestro))

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

## 📦 Page Objects Pattern (`test/maestro/pages/`)

All element selectors and resource IDs are encapsulated into JavaScript Page Objects (`.js` files) using CommonJS exports:

| Page Object | JS File | Purpose |
| :--- | :--- | :--- |
| `HomePage` | `HomePage.js` | Selectors for Home screen (package button, language toggle). |
| `TicketsPage` | `TicketsPage.js` | Selectors for ticket quantity controls and error banners. |
| `DateTimePage` | `DateTimePage.js` | Selectors for product tiles, calendar picker, timeslot picker, and debug mode buttons. |
| `QuestionsPage` | `QuestionsPage.js` | Selectors for text area, referral dropdown, per-ticket checkboxes, and promo field. |
| `CheckoutPage` | `CheckoutPage.js` | Selectors for contact fields, terms checkboxes, promo chip, and submit buttons. |
| `PaymentPage` | `PaymentPage.js` | Selectors for credit card form, error messages, processing overlay, and declined screen. |
| `SuccessPage` | `SuccessPage.js` | Selectors for ticket card, free badge, summary rows, and final total. |

---

## 🧩 Modular Subflows Architecture (`test/maestro/subflows/`)

To eliminate code duplication and maintain test suite DRYness, common user interactions are extracted into parameterized subflows invoked via Maestro's `runFlow` mechanism:

| Subflow | Purpose | Key Parameters (`env`) |
| :--- | :--- | :--- |
| `select_package.yaml` | Navigates from Home screen and selects package. | `PACKAGE_ID` |
| `select_tickets.yaml` | Increments ticket quantities. | `ADULT_COUNT`, `CHILD_COUNT` |
| `select_date_and_time.yaml` | Sets debug force-open mode and selects dates/timeslots for products 0, 1, 3. | `CALENDAR_DAY`, `TIMESLOT` |
| `fill_questions.yaml` | Fills textarea, referral dropdown, and per-ticket checkboxes. | `ARRIVAL_TEXT`, `REFERRAL_OPTION`, `TICKET_COUNT` |
| `fill_checkout_contact.yaml` | Fills contact fields and accepts terms checkboxes. | `FIRST_NAME`, `LAST_NAME`, `COUNTRY_OPTION_ID`, `STATE_PROVINCE` |
| `apply_promo_code.yaml` | Unlocks promo code hint, navigates back, and applies promo code. | `PROMO_CODE` |
| `verify_success_page.yaml` | Asserts ticket card, free badge, summary, and total on Success page. | N/A |

---

## 📋 Test Flows Overview

### 1. Happy Path Smoke Test (`subflows/purchase_flow.yaml`)
A single, fast end-to-end smoke test driving the minimal user path from product selection to a confirmed 0.00 EUR order using subflows and Page Objects.

### 2. Validations & Resets Test (`validations_and_resets_flow.yaml`)
A focused regression test asserting negative validation rules (child without adult error, missing question fields, missing contact fields) and selection reset functionality.

### 3. Card Payment Declined Flow (`card_payment_declined_flow.yaml`)
Covers the credit card payment gateway path when no promo code is applied, verifying CVC declined handling and retry navigation.

---

## 🛠️ Technical Highlights

- **Page Objects**: All UI selectors are decoupled into reusable JavaScript modules (`test/maestro/pages/`).
- **Nested Flows**: Clean separation between test scenarios and operational subflows using `runFlow` with `env` parameter passing.
- **Stable Accessibility Selectors**: Relies exclusively on stable accessibility identifiers defined in `lib/ids/booking_ids.dart` (`Semantics(identifier: ...)`).
- **Simulated Latency**: Uses `extendedWaitUntil: visible` with a 15-second timeout on key screen transitions to accommodate `withSimulatedLatency` (3-8s random delay).
- **Keyboard Safety**: Uses `hideKeyboard` commands to ensure soft keyboards do not obscure bottom action buttons.
