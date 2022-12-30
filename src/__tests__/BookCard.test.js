import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import BookCard from "../BookCard";

describe("BookCard component", () => {
  it("renders correctly and displays all elements", () => {
    // Mock props for the component
    const mockProps = {
      data: {
        id: 123,
        title: "Test Book",
      },
      author: "Test Author",
      language: "Test Language",
      favIds: [],
      addFavorites: jest.fn(),
      removeFavorites: jest.fn(),
    };

    // Render the component
    render(<BookCard {...mockProps} />);

    // Check if book image is rendered
    const bookImg = screen.getByAltText("Test Book");
    expect(bookImg).toBeInTheDocument();

    // Check if book title is rendered
    const bookTitle = screen.getByText("Test Book");
    expect(bookTitle).toBeInTheDocument();

    // Check if book author is rendered
    const bookAuthor = screen.getByText("Yazar: Test Author");
    expect(bookAuthor).toBeInTheDocument();

    // Check if book language is rendered
    const bookLanguage = screen.getByText("Dil: Test Language");
    expect(bookLanguage).toBeInTheDocument();

    // Check if "read book" button is rendered
    const readBookBtn = screen.getByText("Oku");
    expect(readBookBtn).toBeInTheDocument();
  });
});
