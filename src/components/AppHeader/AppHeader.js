import { useUser } from '@auth0/nextjs-auth0/client';
import Link from "next/link";

import Head from "next/head";
export const AppHeader = ({ }) => {

  return (
    <>
      <Head>
        <title>ESGWall</title>
        <meta name="description" content="Discover, Engage, Build: ESGWall
Connecting ESG Project Owners and Users, Creating a Sustainable Community" />
        <meta charSet="UTF-8" />
        <meta name="keywords" content="ai, chatgpt, content, writer, blog" />
        <meta name="author" content="Kenneth Hu" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

    </ >
  )
}