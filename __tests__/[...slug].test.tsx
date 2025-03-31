import Page, { getStaticProps } from "@/pages/[...slug]";
import { render, screen } from "@testing-library/react";
import fs from "fs";
import path from "path";

jest.mock("fs");

jest.mock("path", () => ({
  join: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Page - getStaticProps", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Should render the page and return a 200 HTTP status for a valid URL.", async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    (fs.readFileSync as jest.Mock).mockReturnValue(
      "---\ntitle: Hello World\n---\n# Hello World"
    );

    (path.join as jest.Mock).mockImplementation((...args) => args.join("/"));

    const props = await getStaticProps({
      params: { slug: ["test-page"] },
    });

    if ("props" in props) {
      render(
        <Page
          {...props.props}
          content="<h1>Hello World</h1>"
          metadata={{ title: "Test Page" }}
        />
      );
    }

    expect(screen.getByText("⬅ Back")).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("Should return content if the file exist.", async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    (fs.readFileSync as jest.Mock).mockReturnValue(
      "---\ntitle: Hello World\n---\n# Hello World"
    );

    (path.join as jest.Mock).mockImplementation((...args) => args.join("/"));

    const response = await getStaticProps({
      params: { slug: ["test-page"] },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: expect.objectContaining({
          content: expect.stringContaining("<h1>Hello World</h1>"),
        }),
      })
    );
  });

  it("Should return 404 if file doesn't exist.", async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const response = await getStaticProps({
      params: { slug: ["no-existe"] },
    });

    expect(response).toEqual({ notFound: true });
  });
});
