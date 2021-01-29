import React from 'react';
import styled from 'styled-components';
import db from '../db.json';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>AluraQuiz - Modelo Base </title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1> Magic Girls' Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (E) {
              E.preventDefault();
              router.push(`quiz?name= ${name}`);
              console.log('Fazendo uma submissão por meio do react')
            }}
            >
              <Input
                name="nomedoUsuario"
                onChange={(E) => { setName(E.target.value); }}
                placeholder="Insira o seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>

            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quiz da Galera</h1>

            <ul>
              {db.external.map((linkExterno) => {
                return (
                  <li>
                    <Widget.Topic href={linkExterno}>
                      {textoDoLink}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>

          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com" />
    </QuizBackground>
  )
}
