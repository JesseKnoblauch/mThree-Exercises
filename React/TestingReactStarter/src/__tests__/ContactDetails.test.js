/**
 * @jest-environment jsdom
 */
import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactDetails from "../components/ContactDetails";
import { MemoryRouter, Route } from "react-router";
import { server } from "../utils/mocks/server";
import ErrorBoundary from "../components/ErrorBoundary";

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("user can navigate back to the home page", async function () {
  // ARRANGE
  let testLocation;
  render(
    <MemoryRouter initialEntries={["/1"]}>
      <ContactDetails />
      <Route
        path="*"
        render={({ location }) => {
          testLocation = location;
          return null;
        }}
      />
    </MemoryRouter>
  );
  // ACT
  const backButton = screen.getByTestId("backNavigation");
  await userEvent.click(backButton);

  // ASSERT
  expect(testLocation.pathname).toBe("/1");
});

test("displays correct contact details", async function () {
  // ARRANGE

  render(
    <MemoryRouter initialEntries={["/1"]}>
      <Route path="/:id">
        <ErrorBoundary>
          <ContactDetails />
        </ErrorBoundary>
      </Route>
    </MemoryRouter>
  );
  // ACT
  const contactsName = await screen.findByText("Betty Holberton");

  // ASSERT
  expect(contactsName).toBeInTheDocument();
});

test("displays contact update form when edit button is clicked", async function () {
  // ARRANGE
  render(
    <MemoryRouter initialEntries={["/1"]}>
      <ContactDetails />
    </MemoryRouter>
  );
  //ACT
  await userEvent.click(screen.getByText("Edit"));

  // ASSERT
  expect(screen.getByLabelText("First Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Company:")).toBeInTheDocument();
  expect(screen.getByText("Save")).toBeInTheDocument();
});

test("user can update contact info", async function () {
  // ARRANGE
  render(
    <MemoryRouter initialEntries={["/1"]}>
      <ContactDetails />
    </MemoryRouter>
  );

  // ACT
  let editButton = screen.getByText("Edit");

  await userEvent.click(screen.getByText("Edit"));

  await userEvent.type(screen.getByLabelText("First Name"), "Betty");
  await userEvent.type(screen.getByLabelText("Last Name"), "Harvey");
  await userEvent.type(screen.getByLabelText("Company:"), "ENIAC");
  await userEvent.type(screen.getByLabelText("Phone Number:"), "4006670180");
  await userEvent.type(screen.getByLabelText("Email:"), "BetHol@gmail.com");

  await userEvent.click(screen.getByText("Save"));

  // ASSERT
  expect(screen.getByText("Betty Harvey")).toBeInTheDocument();
  expect(editButton).toBeInTheDocument();
});
