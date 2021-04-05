import { SyntheticEvent, useState } from "react";
import { useRouter } from 'next/router'

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const searchRecipe = async (event: SyntheticEvent) => {
    event.preventDefault();
    router.push(`search\/${searchValue}`)
  }

  return (
    <form onSubmit={searchRecipe}>
      <input className="w-full h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg"
             type="search"
             defaultValue={searchValue}
             onChange={(e) => setSearchValue(e.target.value)}
             placeholder="Search..."/>
    </form>
  );
}

export default SearchBar;
