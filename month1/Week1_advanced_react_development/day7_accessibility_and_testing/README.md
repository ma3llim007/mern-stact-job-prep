# Accessibility And Testing in React

This guide covers important practices for improving web accessibility, auditing performance, and testing React applications. These techniques ensure your applications are inclusive, performant, and reliable.

---

## Section 1: Web Accessibility (ARIA Roles)

Using ARIA roles and attributes improves the accessibility of your web application for users with assistive technologies.

### Key ARIA Roles and Attributes

-   **Role**: Describes the purpose of an element (e.g., `button`, `navigation`, `alert`).
-   **ARIA-Labeledby**: Links elements with labels for better context.
-   **ARIA-Expanded**: Indicates the expandable state of an element.

### Example

```javascript
const AccessibleButton = () => {
    return (
        <button aria-label="Expand menu" aria-expanded="false">
            Menu
        </button>
    );
};
```

### Best Practices

-   Use ARIA roles only when native HTML elements don't suffice.
-   Test your app with screen readers like NVDA or VoiceOver.

---

## Section 2: Lighthouse for Performance & Accessibility Audits

Lighthouse is a tool for auditing performance, accessibility, SEO, and more. It provides actionable insights to improve your web application.

### Running a Lighthouse Audit

1. Open Chrome DevTools.
2. Navigate to the **Lighthouse** tab.
3. Choose the audit categories (Performance, Accessibility, etc.).
4. Run the audit and review results.

### Example Accessibility Metrics

-   Contrast ratios for text and background.
-   Proper usage of ARIA attributes.
-   Keyboard navigability.

### Improving Scores

-   Fix issues highlighted by Lighthouse, such as missing alt attributes or insufficient color contrast.
-   Ensure all interactive elements are accessible via keyboard.

---

## Section 3: Unit Testing with Jest

Jest is a powerful testing framework for validating the correctness of individual components or functions in React.

### Example Test Case

```javascript
import { sum } from "./utils";

test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
});
```

### Benefits of Unit Testing

-   Catch bugs early.
-   Validate the behavior of individual components or utilities.

### Best Practices

-   Test edge cases and common scenarios.
-   Keep tests isolated and independent.

---

## Section 4: Integration Testing with React Testing Library

React Testing Library focuses on testing components in a way that resembles user interactions.

### Example Test Case

```javascript
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders a button and handles click event", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    expect(screen.getByText(/clicked/i)).toBeInTheDocument();
});
```

### Benefits of Integration Testing

-   Tests multiple components working together.
-   Mimics user behavior to ensure app functionality.

### Best Practices

-   Avoid testing implementation details.
-   Focus on the user experience.

---

## Summary

This guide has covered:

-   **Web Accessibility (ARIA Roles)** to make applications inclusive.
-   **Lighthouse Audits** for performance and accessibility improvements.
-   **Unit Testing with Jest** to validate individual components or functions.
-   **Integration Testing with React Testing Library** for end-to-end component testing.

By adopting these practices, you ensure your React applications are robust, accessible, and user-friendly.
