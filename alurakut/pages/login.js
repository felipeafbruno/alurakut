
import React from 'react';
// useRouter Hook do Next.js
import { useRouter } from 'next/router';
import nookies from 'nookies';

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('');
  
  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={(e) => {
              // alert('alguem clicou no botão!');
              e.preventDefault();
              console.log('Usuário: ', githubUser);
              
              // Por meio da requisição POST da API alurakut.vercel.app/api/login
              // passando no body o githubUser é obtido o 
              // token para verificar a existenci do usuário
              fetch('https://alurakut.vercel.app/api/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type' : 'application/json'
                  },
                  body: JSON.stringify({
                    githubUser: githubUser   
                  })
              })                  
              .then(async (response) => {
                const jsonResponse = await response.json();
                const token = jsonResponse.token;

                // PRIMEIRO PARAMENTRO é um contexto mas já que o código 
                // esta no client-side(browser) é colocado null para o contexto.
                // SEGUNDO PARAMENTRO é o nome da informação que vai ser armazenada.
                // TERCEIRO PARAMETRO é o valor que vai ser armazenado.
                nookies.set(null, 'USER_TOKEN', token, {
                  path: '/',
                  maxAge: 86400 * 7  
                });

                // router.push('/') redireciona para a próxima página, nesse caso a página do perfil
                router.push('/');
              })
          }}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
          </p>
            <input 
              placeholder="Usuário" 
              value={githubUser}
              onChange={(e) => {
                console.log(e.target.value);
                setGithubUser(e.target.value);
              }} 
            />
            {githubUser.length === 0 ? "Preencha o campo!" : ''}
            <button type="submit">
              Login
          </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
              </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
} 