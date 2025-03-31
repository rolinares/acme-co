import fs from "fs";
import { render, screen } from "@testing-library/react";
import HomePage, { getStaticProps } from "@/pages";

jest.mock("fs");

describe("HomePage - getStaticProps", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Should return an array with valid paths if there is index.md files.", async () => {
    (fs.readdirSync as jest.Mock).mockImplementation((dir) => {
      if (dir.endsWith("content")) return ["test", "test-page"];
      if (dir.endsWith("test")) return ["index.md"];
      if (dir.endsWith("test-page")) return ["sub-test"];
      if (dir.endsWith("sub-test")) return ["index.md"];
      return [];
    });

    (fs.statSync as jest.Mock).mockImplementation((filePath) => ({
      isDirectory: () => !filePath.endsWith(".md"),
    }));

    const response = await getStaticProps({ params: {} });

    expect(response).toEqual({
      props: {
        paths: ["/test", "/test-page/sub-test"],
      },
    });
  });

  it("Should return an empty array if there is no index.md files.", async () => {
    (fs.readdirSync as jest.Mock).mockImplementation((dir) => {
      if (dir === "content") return ["test-folder"];
      return [];
    });

    (fs.statSync as jest.Mock).mockImplementation(() => ({
      isDirectory: () => true,
    }));

    const response = await getStaticProps({ params: {} });

    expect(response).toEqual({
      props: {
        paths: [],
      },
    });
  });

  it("Should render the list of available pages.", () => {
    const mockPaths = ["/test", "/test-page/sub-test"];

    render(<HomePage paths={mockPaths} />);

    expect(screen.getByText("🌐 ACME Co. available pages")).toBeInTheDocument();
    expect(screen.getByText("/test")).toBeInTheDocument();
    expect(screen.getByText("/test-page/sub-test")).toBeInTheDocument();
  });

  it("Should render the placeholder text.", () => {
    const mockPaths = [] as string[];

    render(<HomePage paths={mockPaths} />);

    expect(screen.getByText("🌐 ACME Co. available pages")).toBeInTheDocument();
    expect(
      screen.getByText("No pages available at the moment.")
    ).toBeInTheDocument();
  });
});
