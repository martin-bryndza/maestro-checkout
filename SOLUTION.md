# Solution by Martin Bryndza

The task was to implement a scenario with particular steps and validations.
The scenario can be run by 
```bash
maestro test assignment_purchase_flow.yaml
```

In my opinion, the assigned scenario would not make a good test for the following reasons:
- It inputs random values - tests must be deterministic for them to be repeatable and to make identification of flaky tests easier. Instead, edge values should be properly tested in every test run.
- It validates bad-day scenarios in a happy-day flow - this may lead to the smoke scenario not be executed because of some less important error. This may hide other critical errors.

I do understand that the scenario was most probably created for me to showcase my JS programming skills. :-)

**What follows is my thought process and the list of the things I have done for this assignment:**

1. Install all the requirements and tools needed for the project
2. The project uses an older version of Graddle, that does not support the current Java SDK. I must download Java SDK 24.
3. Maestro does not support Android API 36, I must get a device with API 34
4. Run the app and perform a brief exploratory testing session (ah, there are some bugs)
5. Use Gemini in Android Studio to generate two test flows - a smoke test for the purchase and a bad-day scenario with invalid card details:
     - The successful purchase with promo code scenario was checking all validations and resets along the way as well
6. I want to have a proper smoke test for the happy day scenario without checking anything unnecessary, so I tasked Gemini to split the first flow into purchase_flow and validations_and_resets_flow.
7. Run and fix the second flow in Maestro Studio
8. Run and fix the smoke test in Maestro Studio - in both cases, there were missing scrollUntilVisible commands
9. Discovery: There is no global option for Maestro to scroll automatically without having to specify it for every single object. Bummer.
10. Discovery: Maestro sends a Back command when hideKeyboard is called. This occasionally leads to the app going to a previous screen and fails the test. I must use the command carefully.
11. Improve the scenarios by adding asserts and some extra steps
12. Task Gemini to create and parametrize subflows (to make test maintenance easier), then fix the output
13. Make perTicketCheckboxes be selected in a loop
14. Check that the date selection will always work - Dev prepared for it, making the app testable by Maestro, good job!
15. Task Gemini to extract selectors into Page Objects to make test maintenance easier. Fix the generated code.
16. Introduce DDT for the smoke E2E flow
17. Make sure the tests run also on a small device (add auto-scrolling and hideKeyboard where necessary)
18. Add the original flow from the assignment (just in case).
19. Create the SOLUTION.md

### BUGS and design flaws found in the demo app:
- The Home page shows Slovak instead of Czech + there is a typo “so výhľadom”.
- Promo code field activation displays an error. The promo code field is added to the previous “questions” page.
- The app does not automatically scroll to the first validation error, leaving the user wondering why the confirm button did not work.

### Maestro bugs and bummers:
- When an unsupported character is input into a text field, the keyboard is closed automatically. The following call to hide the keyboard then produces a Back action instead.
- No automatic scrolling.
- Limited debugging options (at least the default ones).
- Slow test execution and laggy IDE.

### TODO - things I haven’t done but definitely would do for a real-world test automation:
- Add all possible fields and options into the purchase_flow_ddt - it must be possible to complete this critical flow also when optional inputs are used
- Add more edge case inputs for the purchase_flow_ddt - again, this is the most critical flow
- Implement a JS soft-assert function to prevent bug hiding in the Validations and Resets flow
- Add more bad-day scenarios