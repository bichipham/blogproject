import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../app/login/page";

import { jest } from '@jest/globals';

// Mock alert để tránh lỗi trong test
window.alert = jest.fn();

describe("LoginPage", () => {
  test("renders username and password inputs", () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows alert if fields are empty", () => {
    render(<LoginPage />);

    const button = screen.getByRole("button", { name: /login/i });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Username and password are required");
  });

  test("accepts input values and logs in", () => {
    render(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "john" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    fireEvent.click(button);

    // Check input values updated
    expect(usernameInput).toHaveValue("john");
    expect(passwordInput).toHaveValue("12345");
  });
});
