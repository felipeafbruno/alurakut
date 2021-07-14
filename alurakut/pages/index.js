import React from 'react'
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(props) {
  return (
    <Box as='aside'>
      <img src={ `https://github.com/${props.githubUser}.png` } style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className='boxLink' href={`https://github.com${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'felipeafbruno';
  const [communities, setCommunities] = React.useState([{
    id: new Date().toISOString(),
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const pessoasFavoritas = [
    'leonardomleitao',
    'joaohcrangel',
    'EdsonMSouza',
    'pedrodobrubf'
  ];

  return (
    <>
      {/* 
        TODO:
          Adicionar para ao componente AlurakutMenu a foto e o username do perfil.
      */}
      <AlurakutMenu />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className='subTitle'>O que você quer fazer?</h2>
            <form 
              onSubmit={function handleCommunityCreate(e) {
                e.preventDefault();
                const newDatas = new FormData(e.target);

                const community = {
                  id: '21312412253357565876974478',
                  title: newData.get('title'),
                  image: newData.get('image')
                }
                const updatedCommunities = [...communities, Community]
                setCommunities(updateCommunities);
              }
            }>
              <div>
                <input 
                  placeholder='Qual vai ser o nome da sua comunidade?' 
                  name='title' 
                  aria-label='Qual vai ser o nome da sua comunidade?'
                  type='text' />
              </div>
              <div>
                <input 
                  placeholder='Coloque uma URL para usarmos de capa' 
                  name='image' 
                  aria-label='Coloque uma URL para usarmos de capa' />
              </div>

              <button>
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>

            {/* 
              TODO:
                Criar um novo componente(Box) que recebe como parametro
                Título e as informações que compõe a lista (nome e imagem) 
                tanto para Comunidades e Pessoas da Comunidade.
            */}

          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Comunidades ({communities.length})
            </h2>
            <ul>
                {communities.map(itemAtual => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/users/${itemAtual.title}`}>
                        <img src={itemAtual.image} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map(itemAtual => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
