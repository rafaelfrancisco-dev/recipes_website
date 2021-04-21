import React from 'react';

import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

type IndexPageProps = {
  tagsList: Array<String>;
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => ({
  props: {
    tagsList: [''],
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
      <p>asd</p>
      <p>{tagsList}</p>
    </div>
  </Main>
);

export default TagsPage;
