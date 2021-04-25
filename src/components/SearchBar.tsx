import React, { FormHTMLAttributes, SyntheticEvent, useState } from 'react';

import { useRouter } from 'next/router';

interface SearchBarProps extends FormHTMLAttributes<HTMLFormElement> {
  changeFunction: (searchValue: string) => void;
}

function SearchBar(props: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const searchRecipe = async (event: SyntheticEvent) => {
    event.preventDefault();
    router.push(`search/${searchValue}`).then();
  };

  return (
    <form className={props.className} onSubmit={searchRecipe}>
      <input
        className="w-full h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow"
        type="search"
        defaultValue={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          props.changeFunction(searchValue);
        }}
        placeholder="Search..."
      />
    </form>
  );
}

export default SearchBar;
