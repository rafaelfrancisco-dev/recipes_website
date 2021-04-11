import React, { ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Config } from '../utils/Config';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};
const Main = (props: IMainProps) => {
  const router = useRouter();

  return (
    <div className="antialiased w-full text-gray-700">
      {props.meta}

      <nav className="sticky-nav flex justify-between items-center max-w-4xl w-full p-8 my-0 md:my-8 mx-auto bg-white dark:bg-black bg-opacity-60">
        {!(router.pathname === '/') && (
          <button
            aria-label="Enable Dark Mode"
            type="button"
            className="bg-gray-200 dark:bg-gray-800 rounded p-3 h-10 w-10"
            onClick={router.back}
          >
            <Image
              src="/assets/images/chevron-left-solid.svg"
              width={30}
              height={30}
              layout="responsive"
            />
          </button>
        )}

        {router.pathname === '/' && <div />}

        <div>
          <Link href="/">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">Home</a>
          </Link>

          <Link href="/about/">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">About</a>
          </Link>
        </div>
      </nav>

      <div className="max-w-screen-md mx-auto">
        <div className="py-5 text-xl content">{props.children}</div>

        <div className="border-t border-gray-300 text-center py-8 text-sm">
          © Copyright
          {' '}
          {new Date().getFullYear()}
          {' '}
          {Config.title}
          . Powered with
          {' '}
          <span role="img" aria-label="Love">
            ♥
          </span>
          {' '}
          by
          {' '}
          <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>
          {/*
           * PLEASE READ THIS SECTION
           * We'll really appreciate if you could have a link to our website
           * The link doesn't need to appear on every pages, one link on one page is enough.
           * Thank you for your support it'll mean a lot for us.
           */}
        </div>
      </div>
    </div>
  );
};

export { Main };
