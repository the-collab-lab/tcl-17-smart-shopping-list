import { fireEvent, render } from '@testing-library/react';
import { db } from '../../lib/firebase';
import React from 'react';
import List from '../List';
import { mockFirebaseCollection } from '../../utils/testUtils';
import { mockDocs } from './fixtures';

jest.mock('../../lib/firebase');

describe('<List />', () => {
  it("displays 'Your shopping list is currently empty' to the user with a link to the Add Item page, when there are no items in a user's shopping list", () => {
    db.collection = mockFirebaseCollection();

    const { queryByText } = render(<List token="Sam I am" />);

    expect(queryByText('Your shopping list is currently empty.')).toBeTruthy();
    expect(queryByText('Add an Item')).toBeTruthy();
  });

  it('displays a search field and a list of items in a users shopping list when there are previously added items returned from the database', () => {
    db.collection = mockFirebaseCollection({
      docs: mockDocs,
    });

    const { queryByText, queryByPlaceholderText } = render(
      <List token="Sam I am" />,
    );
    expect(queryByText('Your shopping list is currently empty.')).toBeFalsy();
    expect(queryByText('Add an Item')).toBeFalsy();

    expect(queryByPlaceholderText('Start typing here...')).toBeTruthy();
    expect(queryByText('Bananas')).toBeTruthy();
    expect(queryByText('Apples')).toBeTruthy();
  });

  it('filters items in the list based on user input in the search field', () => {
    db.collection = mockFirebaseCollection({
      docs: mockDocs,
    });

    const { getByPlaceholderText, queryByText } = render(
      <List token="Sam I Am" />,
    );
    fireEvent.change(getByPlaceholderText('Start typing here...'), {
      target: { value: 'Ba' },
    });

    expect(getByPlaceholderText('Start typing here...').value).toEqual('Ba');
    expect(queryByText('Bananas')).toBeTruthy();
    expect(queryByText('Apples')).toBeFalsy();
  });

  it('clears the value of the input field when the reset button is clicked', () => {
    db.collection = mockFirebaseCollection({
      docs: mockDocs,
    });

    const { getByPlaceholderText, queryByText, getByTestId } = render(
      <List token="Sam I Am" />,
    );
    fireEvent.change(getByPlaceholderText('Start typing here...'), {
      target: { value: 'Ba' },
    });

    getByTestId('reset-button').click();

    expect(getByPlaceholderText('Start typing here...').value).toEqual('');
    expect(queryByText('Bananas')).toBeTruthy();
    expect(queryByText('Apples')).toBeTruthy();
  });
});
