import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import {DM_Sans, DM_Serif_Display} from '@next/font/google';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import { PostProvider } from '../context/postContext';


import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import {  goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public'
const { chains, provider, webSocketProvider } = configureChains(
  [ goerli],
  [
  
    publicProvider(),
  ],
  { targetQuorum: 1 },
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    })
  
  ],
  provider,
  webSocketProvider,
})
config.autoAddCss= false;

const  dmSans = DM_Sans({
  weight:['400', '500','700'],
  subsets:['latin'],
  variable:"--font-dm-sans"
})

const dmSerifDisplay = DM_Serif_Display({
  weight:['400'],
  subsets:['latin'],
  variable:"--font-dm-serif"
})


export default function App({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page)=>page)

  return (
  <UserProvider>
     <WagmiConfig client={client}>
    <PostProvider>
    <main className={`${dmSans.variable} ${dmSerifDisplay.variable} font-body`}>
     {getLayout(<Component {...pageProps} />,pageProps)  }
    </main>
    </PostProvider>
    </WagmiConfig>
    </UserProvider>
    );
}
