import React, { useState } from 'react';

import { GetStaticProps, InferGetStaticPropsType } from 'next';

import RecipeBox from '../components/RecipeBox';
import SearchBar from '../components/SearchBar';
import { Meta } from '../layout/Meta';
import { Recipe } from '../models/Recipe';
import models from '../models/recipes.json';
import { Main } from '../templates/Main';

type IndexPageProps = {
  recipeList: Array<Recipe>;
};

function compareRecipeTitle(a: Recipe, b: Recipe) {
  if (a.strMeal < b.strMeal) {
    return -1;
  }

  if (a.strMeal > b.strMeal) {
    return 1;
  }

  return 0;
}

function getRandomElements(sourceArray: Array<any>, neededElements: number) {
  const result = [];
  const newArray = [...sourceArray];

  for (let i = 0; i < neededElements; i += 1) {
    const indexToRemove = Math.floor(Math.random() * newArray.length);

    result.push(newArray[indexToRemove]);
    newArray.splice(indexToRemove, 1);
  }

  return result;
}

function filterRecipesByText(text: string, recipeList: Array<Recipe>): Array<Recipe> {
  if (text === '' || text.length === 0) {
    return recipeList;
  }

  return recipeList.filter((recipe) => recipe.strMeal.toLowerCase().includes(text.toLowerCase()));
}

export const getServerSideProps: GetStaticProps<IndexPageProps> = async () => ({
  props: {
    recipeList: getRandomElements(models, 33).sort(compareRecipeTitle),
  },
});

const Index = ({ recipeList }: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Main meta={<Meta title="Recipes" description="Just a bunch of recipes" />}>
      <article className="prose lg:prose-xl">
        <h1 className="text-gray-900 dark:text-gray-100">Random recipes</h1>
      </article>

      <SearchBar className="mt-8" changeFunction={setSearchValue} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 pt-8">
        {filterRecipesByText(searchValue, recipeList).map((recipe: Recipe) => (
          <RecipeBox recipe={recipe} key={recipe.idMeal} />
        ))}

        {filterRecipesByText(searchValue, recipeList).length === 0 && (
          <button
            className="items-center content-center self-center place-self-auto pb-2"
            type="submit"
          >
            Search for more recipes...
          </button>
        )}
      </div>
    </Main>
  );
};

export default Index;
