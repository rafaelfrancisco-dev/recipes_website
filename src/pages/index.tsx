import React from 'react';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { Meta } from '../layout/Meta';
import { Recipe } from '../models/Recipe';
import StyleUtils from '../styles/StyleUtils';
import { Main } from '../templates/Main';
import FadeInImage from '../components/FadeInImage';
import SearchBar from '../components/SearchBar';

const recipes = require('../models/recipes.json');

type IndexPageProps = {
  recipeList: Array<Recipe>
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => ({
  props: {
    recipeList: getRandomElements(recipes, 33).sort(compareRecipeTitle)
  },
});

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

const Index = ({ recipeList }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Main
    meta={(
      <Meta
        title="Next.js Boilerplate Presentation"
        description="Next js Boilerplate is the perfect starer code for your project. Build your React application with Next.js framework."
      />
    )}
  >
    <SearchBar/>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 pt-8">
      {recipeList.map((recipe: Recipe, index: number) => (
        <Link key={recipe.idMeal} href={`/recipes/${recipe.idMeal}`}>
          <div className="transition duration-500 ease-in-out w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110">
            <div
              className={`w-full flex md:flex-col bg-gradient-to-br ${StyleUtils.getRandomGradientStyle(
                index,
              )}`}
            >
              <p className="pt-6 px-4 h-20 text-lg font-medium leading-none text-center text-black">{recipe.strMeal}</p>

              <div className="relative md:pl-6 xl:pl-8 hidden sm:block h-32">
                <FadeInImage
                  className="absolute md:static overflow-visible"
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </Main>
);

export default Index;
