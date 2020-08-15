import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  // arrange
  const { getByText } = render(<CheckoutForm />);
  // act
  const header = getByText(/checkout form/i);
  // assert
  expect(header).toBeTruthy();
});

test("form shows success message on submit with form details", async () => {
  // arrange
  const { getByLabelText, getByText, getByTestId } = render(<CheckoutForm />);
  const firstNameInput = getByLabelText("First Name:");

  // act
  fireEvent.change(firstNameInput, { target: { value: "Mitchell" } });
  // submit form
  fireEvent.click(getByTestId("checkout-button"));
  const successMessage = await waitFor(() =>
    getByText(/Your new green friends will be shipped to:/i)
  );
  const successFirstName = getByText("Mitchell");
  // assert
  expect(successMessage).toBeTruthy();
  expect(successFirstName).toBeTruthy();
});
