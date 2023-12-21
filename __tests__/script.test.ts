import { test, expect, describe, beforeEach, afterEach, vi } from "vitest";
import { screen, waitFor } from "@testing-library/dom";

import { main } from "../script";

const requestUrl = "https://jsonplaceholder.typicode.com/posts";
const titleValue = "title";
const contentValue = "content";

beforeEach(() => {
  document.body.innerHTML = `
    <form>
    <div>
      <label for="title">Title: </label>
      <input data-testid="form-title" id="title" type="text">
    </div>
    <div>
      <label for="content">Content: </label>
      <input data-testid="form-content" id="content" type="text">
    </div>
    <div>
      <input data-testid="submit" id="submit" type="submit" />
    </div>
  </form>

  <div data-testid="result-id" id="result-id"></div>
  <div data-testid="result-title" id="result-title"></div>
  <div data-testid="result-content" id="result-content"></div>
  `;
  const formTitle = screen.queryByTestId<HTMLInputElement>("form-title");
  const formContent = screen.queryByTestId<HTMLInputElement>("form-content");
  if (formTitle) formTitle.value = titleValue;
  if (formContent) formContent.value = contentValue;
});

describe("DOM操作とイベントの問題", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("POSTリクエストが正しく行われている", async () => {
    // @ts-ignore
    vi.spyOn(global, "fetch").mockImplementation(() => ({
      json: () => ({ id: 0, title: "", content: "" }),
    }));
    main();
    screen.queryByTestId("submit")?.click();
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(requestUrl, {
        method: "POST",
        body: JSON.stringify({
          title: titleValue,
          content: contentValue,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    });
  });

  test("正しい挙動になっている", async () => {
    main();
    screen.queryByTestId("submit")?.click();
    await waitFor(() => {
      expect(screen.queryByTestId("result-id")?.textContent).toEqual(
        "created post ID is 101"
      );
      expect(screen.queryByTestId("result-title")?.textContent).toEqual(
        `created post title is ${titleValue}`
      );
      expect(screen.queryByTestId("result-content")?.textContent).toEqual(
        `created post content is ${contentValue}`
      );
    });
  });
});
