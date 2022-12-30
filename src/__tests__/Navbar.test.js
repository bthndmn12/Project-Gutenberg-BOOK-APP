import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import '@testing-library/jest-dom'


describe('Navbar component', () => {
  it('renders correctly and displays all elements', () => {
    render(<Navbar />);

    // Check if heading is rendered
    const heading = screen.getByText('Project Gutenberg');
    expect(heading).toBeInTheDocument();

    // Check if search input is rendered
    const searchInput = screen.getByPlaceholderText('Kitaplarda Arayın!');
    expect(searchInput).toBeInTheDocument();

    // Check if search icon is rendered
    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();

    // Check if plus icon is rendered
    const plusIcon = screen.getByTestId('plus-icon');
    expect(plusIcon).toBeInTheDocument();

    // Check if heart icon is rendered
    const heartIcon = screen.getByTestId('heart-icon');
    expect(heartIcon).toBeInTheDocument();

    // Check if search input changes value when input is changed
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
  });
});