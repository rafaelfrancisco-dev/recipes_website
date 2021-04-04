import React from 'react';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Meta } from '../layout/Meta';
import { Recipe } from '../models/Recipe';
import StyleUtils from '../styles/StyleUtils';
import { Main } from '../templates/Main';

const recipes = require('../models/recipes.json');

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

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    recipeList: getRandomElements(recipes, 33).sort(compareRecipeTitle),
  },
});

const Index = ({ recipeList }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Main
    meta={(
      <Meta
        title="Next.js Boilerplate Presentation"
        description="Next js Boilerplate is the perfect starer code for your project. Build your React application with Next.js framework."
      />
    )}
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 pt-8">
      {recipeList.map((recipe: Recipe, index: number) => (
        <Link key={recipe.idMeal} href={`/recipes/${recipe.idMeal}`}>
          <div className="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg">
            <div
              className={`w-full flex md:flex-col bg-gradient-to-br ${StyleUtils.getRandomGradientStyle(
                index,
              )}`}
            >
              <div className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8">
                <p>{recipe.strMeal}</p>
                <p>
                  ID:
                  {recipe.idMeal}
                </p>
              </div>

              <div className="relative md:pl-6 xl:pl-8 hidden sm:block">
                <Image
                  className="absolute top-6 left-6 md:static overflow-visible"
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  width={400}
                  height={200}
                  layout="responsive"
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
