'use client';

import { useMemo, useState } from 'react';
import { isEmpty } from 'lodash';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FunctionComponent } from 'react';
import { Input } from 'postcss';
import { SearchBar } from '..';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

interface InputSearchComboboxProps {
  data: any[];
}

const InputSearchCombobox: FunctionComponent<InputSearchComboboxProps> = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const filteredValue =
    value === ''
      ? frameworks
      : frameworks.filter((framework) => {
          return framework.value.toLowerCase().includes(value.toLowerCase());
        });

  return (
    <div className='flex flex-col relative'>
      <SearchBar inputValue={value} setInputValue={setValue} />
      {!isEmpty(value) && (
        <div className='absolute h-52 mt-10 w-full z-[999]'>
          <div className='absolute bottom-0 shadow-lg border mt-2 rounded-md h-52 flex flex-col py-2 px-4 bg-white w-full'>
            {isEmpty(filteredValue) ? (
              <span className='text-gray-500'>No results found</span>
            ) : (
              filteredValue.map((framework) => <span key={framework.label}>{framework.label}</span>)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputSearchCombobox;
