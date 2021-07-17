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
  const [communities, setCommunities] = React.useState([]);
  const pessoasFavoritas = [
    'leonardomleitao',
    'joaohcrangel',
    'EdsonMSouza',
    'pedrodobrubf'
  ];

  // Pegar array de dados da API do github
  const [followers, setFollowers] = React.useState([]);
  React.useEffect(function () { 
    fetch('https://api.github.com/users/felipeafbruno/followers')
    .then(function (serverResponse) {
      return serverResponse.json();
    })
    .then(function (jsonResponse) {
      console.log('followes', jsonResponse);
      setFollowers(jsonResponse);
    })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'f4bc706fb13fe561d8b6331479cff7',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({'query' : `query {
        allCommunities(orderBy: [_createdAt_ASC]) {
          id
          title
          imageUrl
          creatorSlug
          communityUrl
        }
      }`})
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
      const data = jsonResponse.data.allCommunities;
      console.log(data);
      setCommunities(data);
    })
  }, []);

  return (
    <>
      {/* 
        TODO:
          Adicionar para ao componente AlurakutMenu a foto e o username do perfil.
      */}
      <AlurakutMenu githubUser={githubUser}/>
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
                const newData = new FormData(e.target);

                const community = {
                  title: newData.get('title'),
                  imageUrl: newData.get('image'),
                  creatorSlug: githubUser,
                  communityUrl: newData.get('communityUrl')
                }

                // Fazendo fetch no bff api/communities.js para criar
                // um novo registro do DatoCMS
                fetch('/api/communities', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(community)
                }).then(async (response) => {
                  const data = await response.json();
                  console.log(data);
                  
                  const updatedCommunities = [...communities, community]
                  setCommunities(updatedCommunities);
                })
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
              <div>
                <input 
                  placeholder='Qual Url da Comunidade?' 
                  name='communityUrl' 
                  aria-label='Qual Url da Comunidade?'
                  type='url'
                />
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
          <ProfileRelationsBoxWrapper title='Seguidores' followers={followers} />
          <ProfileRelationsBoxWrapper title='Comunidades' communities={communities} />
          <ProfileRelationsBoxWrapper title='Pessoas da Comunidade' pessoasFavoritas={pessoasFavoritas} />
        </div>
      </MainGrid>
    </>
  )
}
