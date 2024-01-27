import React, { FunctionComponent, ReactElement } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}
const SearchBar: FunctionComponent<SearchBarProps> = ({
  inputValue,
  setInputValue,
  open,
  setOpen,
}): ReactElement => {
  return (
    <span
      onClick={() => inputValue.trim() && setOpen(true)}
      className='flex w-full items-center justify-between rounded-lg border-0 px-2 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
    >
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className='w-[calc(100%_-_1rem)] border-none focus:outline-none'
        placeholder='Search...'
      />
      <Search />
    </span>
  );
};

export default SearchBar;
