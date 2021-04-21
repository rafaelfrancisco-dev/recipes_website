import React from 'react';

import { GetStaticProps, InferGetStaticPropsType } from 'next';

import RecipeBox from '../components/RecipeBox';
import SearchBar from '../components/SearchBar';
import { Meta } from '../layout/Meta';
import { Recipe } from '../models/Recipe';
import { Main } from '../templates/Main';

const recipes = require('../models/recipes.json');

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

export const getServerSideProps: GetStaticProps<IndexPageProps> = async () => ({
  props: {
    recipeList: getRandomElements(recipes, 33).sort(compareRecipeTitle),
  },
});

const Index = ({ recipeList }: InferGetStaticPropsType<typeof getServerSideProps>) => (
  <Main
    meta={(
      <Meta
        title="Next.js Boilerplate Presentation"
        description="Next js Boilerplate is the perfect starer code for your project. Build your React application with Next.js framework."
      />
    )}
  >
    <SearchBar />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 pt-8">
      {recipeList.map((recipe: Recipe) => (
        <RecipeBox recipe={recipe} key={recipe.idMeal} />
      ))}
    </div>
  </Main>
);

export default Index;
