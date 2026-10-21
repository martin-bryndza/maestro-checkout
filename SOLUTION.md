# Solution by Martin Bryndza

The task was to implement a scenario with specific steps and validations.

Run the scenario with:

```bash
maestro test assignment_purchase_flow.yaml
```

In my opinion, the assigned scenario would not make a good test for the following reasons:

- **It uses random values.** Tests should be deterministic and repeatable, making it easier to identify flaky tests. Instead of random inputs, edge cases should be tested explicitly in every test run.
- **It combines negative scenarios with a happy-path flow.** This could prevent the smoke test from completing due to a less critical error, potentially hiding other critical issues.

I understand that the scenario was most likely designed to showcase my JavaScript programming skills. :-)

**What follows is my thought and learning process and a list of the steps I took to complete the assignment.**

1. Install all the required tools and dependencies.
2. Discover that the project uses an older version of Gradle that does not support the current Java SDK. Download Java SDK 24.
3. Discover that Maestro does not support Android API 36. Set up a device running API 34 instead.
4. Run the app and perform a brief exploratory testing session. (Ah, there are a few bugs!)
5. Use Gemini in Android Studio to generate two test flows: a purchase smoke test and a negative scenario covering invalid card details.
   - The successful purchase scenario with a promo code also checked validations and form resets along the way.
6. Decide that the happy-path smoke test should focus on the critical flow without unnecessary checks. Ask Gemini to split the original flow into `purchase_flow` and `validations_and_resets_flow`.
7. Run and fix the second flow in Maestro Studio.
8. Run and fix the smoke test in Maestro Studio. Both flows were missing `scrollUntilVisible` commands.
9. Discover that Maestro has no global option for automatic scrolling, so scrolling must be specified for individual elements. Bummer.
10. Discover that Maestro sends a Back command when `hideKeyboard` is called. This can occasionally navigate back to the previous screen and cause the test to fail. Use the command carefully.
11. Improve the scenarios by adding assertions and extra steps.
12. Ask Gemini to create parameterized subflows to make test maintenance easier, then fix the generated output.
13. Implement a loop to select the `perTicketCheckboxes`.
14. Verify that date selection works reliably. The developer has made the app testable by Maestro, which is great!
15. Ask Gemini to extract selectors into Page Objects to improve test maintainability, then fix the generated code.
16. Introduce data-driven testing (DDT) for the smoke E2E flow.
17. Ensure the tests also run on a small device by adding automatic scrolling and `hideKeyboard` calls where necessary.
18. Include the original flow from the assignment for completeness (`assignment_purchase_flow.yaml`).
19. Create this `SOLUTION.md` file.

## Bugs and design flaws found in the demo app

- The home page displays Slovak instead of Czech and contains a typo: “so výhľadom”.
- Activating the promo code field displays an error. The promo code field is added to the previous “questions” page.
- The app does not automatically scroll to the first validation error on the Questions page, leaving the user wondering why the confirmation button did not work.

## Maestro bugs and pain points

- When an unsupported character is entered into a text field, the keyboard closes automatically. A subsequent `hideKeyboard` call then triggers a Back action instead.
- No automatic scrolling.
- Limited debugging options in Maestro Studio, at least with the default configuration.
- Slow test execution.

## TODO — What I would do for real-world test automation

- Add or improve assertions on the Success page.
- Add all possible fields and options to `purchase_flow_ddt` to ensure the critical purchase flow also works when optional inputs are provided.
- Add more edge-case inputs to `purchase_flow_ddt`. This is the most critical flow and deserves thorough coverage.
- Improve the DDT design, so that failure of one test does not prevent the others from completing.
- Implement a JavaScript soft-assertion function to prevent one failure from hiding other bugs in the Validations and Resets flow. Ideally, all assertions would be in a separate test, but the slow execution time makes this impractical.
- Add more negative scenarios to improve test coverage.