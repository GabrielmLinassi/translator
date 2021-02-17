import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

const server = setupServer(
  rest.post("https://libretranslate.com/translate", (req, res, ctx) => {
    return res(ctx.json({ translatedText: "hola" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const setup = () => {
  const utils = render(<App />);
  const input = utils.getByLabelText("word-input");

  return {
    input,
    ...utils,
  };
};

test("renders learn react link", async () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "Hi" } });

  const translatedText = await waitFor(() => screen.getByText(/hola/i));
  expect(translatedText).toBeInTheDocument();
});
