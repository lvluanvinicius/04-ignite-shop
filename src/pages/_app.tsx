import { AppProps } from "next/app";
import Image from 'next/image'
import { globalStyles } from "../styles/global";

import LogoImg from '../assets/logo.svg'
import { Container, Header } from "../styles/pages/app";

globalStyles();

export default function App({ Component, pageProps }: AppProps) { 
  return (
    <Container>
      <Header>
        <Image src={LogoImg} alt="Logo Ignite Shop"/>
      </Header>

      <Component {...pageProps} />
    </Container>
  );
}
