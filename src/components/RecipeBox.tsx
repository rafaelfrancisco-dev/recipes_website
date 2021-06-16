import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { RecipeMethods } from '../models/logic/RecipeMethods';
import { Recipe } from '../models/Recipe';

type RecipeBoxProps = {
  recipe: Recipe;
};

const RecipeBox = (props: RecipeBoxProps) => (
  <Link href={`/recipes/${props.recipe.idMeal}`}>
    <div className="transition duration-500 ease-in-out max-w-xs rounded overflow-hidden shadow-lg my-2 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
      <div>
        <div className="relative md:pl-6 xl:pl-8 hidden sm:block h-48">
          <Image
            className="absolute md:static overflow-visible"
            src={props.recipe.strMealThumb}
            alt={props.recipe.strMeal}
            placeholder="blur"
            blurDataURL={props.recipe.strMealThumb}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{props.recipe.strMeal}</div>

          <p className="text-grey-darker text-base">{props.recipe.strCategory}</p>
          <p className="text-grey-darker text-base">
            {`${RecipeMethods.getNumberOfIngredients(props.recipe)} ingredients`}
          </p>
        </div>

        <div className="px-6 py-4">
          <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">{`#${props.recipe.strIngredient1}`}</span>
          <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">{`#${props.recipe.strIngredient2}`}</span>
          <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">{`#${props.recipe.strIngredient3}`}</span>
          <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">{`#${props.recipe.strIngredient4}`}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default RecipeBox;
