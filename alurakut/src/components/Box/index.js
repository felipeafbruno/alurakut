import styled from 'styled-components';

const Box = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;

  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: #2E7BB4;
    text-decoration: none;
    font-weight: 800;
  }

  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 20px;
  }

  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }

  input {
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  
  button {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 10000px;
    background-color: #6F92BB;
  }
`;

export default Box;

// export function BoxCommunity(props) {
//   const info = props.communities || props.pessoasFavoritas;
//   const title = props.title;
//   return (
//     <React.Fragment>
//       <h2 className='smallTitle'>
//         {title} ({info.length})
//       </h2>
//       <ul>
//         {info.map((itemAtual, index) => {
//           if(index < 6) {
//             return (
//               <li key={typeof itemAtual === 'object' ? itemAtual.id : itemAtual}>
//                 <a href={`/users/${typeof itemAtual === 'object' ? itemAtual.title : itemAtual}`}>
//                   <img src={typeof itemAtual === 'object' ? itemAtual.image : `https://github.com/${itemAtual}.png`} />
//                   <span>{typeof itemAtual === 'object' ? itemAtual.title : itemAtual}</span>
//                 </a>
//               </li>
//             )
//           }
//         })}
//       </ul>
//     </React.Fragment>
//   )
// }