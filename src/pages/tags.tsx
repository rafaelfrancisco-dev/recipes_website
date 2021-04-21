import React from 'react';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { Meta } from '../layout/Meta';
import { RecipeMethods } from '../models/logic/RecipeMethods';
import { Recipe } from '../models/Recipe';
import recipes from '../models/recipes.json';
import { Main } from '../templates/Main';

type TagPageProps = {
  tagsList: Array<String>;
};

function gatherUniqueTags(): Set<String> {
  const recipeArray = recipes as Array<Recipe>;
  const set: Set<String> = new Set();

  recipeArray.forEach((element) => {
    RecipeMethods.getTags(element).forEach((element2) => set.add(element2));
  });

  return set;
}

export const getStaticProps: GetStaticProps<TagPageProps> = async () => ({
  props: {
    tagsList: Array.from(gatherUniqueTags()),
  },
});

const TagsPage = ({ tagsList }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Main
    meta={(
      <Meta
        title="Next.js Boilerplate Presentation"
        description="Next js Boilerplate is the perfect starer code for your project. Build your React application with Next.js framework."
      />
    )}
  >
    <div>
      <ul className="list-none pl-0 flex flex-wrap items-center justify-center">
        {Array.from(tagsList).map((element) => (
          <Link key={element.big()} href={`/search/${element}`}>
            <a className="block font-medium p-2 relative transition duration-100 ease-in-out hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110">
              {element}
            </a>
          </Link>
        ))}
      </ul>
    </div>
  </Main>
);

export default TagsPage;
