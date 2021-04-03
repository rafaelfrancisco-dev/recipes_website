import React from 'react';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Recipe } from '../models/Recipe';

import Link from 'next/link';
import Image from 'next/image';

const recipes = require('../models/recipes.json');

function compareRecipeTitle(a: Recipe, b: Recipe) {
  if ( a.strMeal < b.strMeal ){
    return -1;
  }

  if ( a.strMeal > b.strMeal ){
    return 1;
  }

  return 0;
}

function getRandomElements(sourceArray: Array<any>, neededElements: number) {
  let result = [];

  for (var i = 0; i < neededElements; i++) {
    const indexToRemove = Math.floor(Math.random() * sourceArray.length);

    result.push(sourceArray[indexToRemove]);
    sourceArray.splice(indexToRemove, 1);
  }

  return result;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      recipeList: getRandomElements(recipes, 33)
    }
  };
};

const Index = ({ recipeList }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Main
    meta={(
      <Meta
        title='Next.js Boilerplate Presentation'
        description='Next js Boilerplate is the perfect starer code for your project. Build your React application with Next.js framework.'
      />
    )}
  >

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 pt-8">
      {recipeList.sort(compareRecipeTitle).map((recipe: Recipe) => (
        <Link key={recipe.idMeal} href={"/recipes/" + recipe.idMeal}>
          <div className="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg">
            <div className="w-full flex md:flex-col bg-gradient-to-br from-purple-500 to-indigo-500">
              <div className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8">
                <p>{recipe.strMeal}</p>
              </div>

              <div>
                <Image
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  width={100}
                  height={100}
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
