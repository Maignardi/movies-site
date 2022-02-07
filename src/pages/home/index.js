
//https://sujeitoprogramador.com/r-api/?api=filmes/
import api from '../../services/api';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {

  const [filmes, setFilmes] = useState([]);

  useEffect(()=>{
    async function loadFilmes(){
      const response = await api.get('r-api/?api=filmes')
      console.log(response.data);
      setFilmes(response.data);
    }
    loadFilmes();
  },[]);

  return (
    <div className='contnainer'>
      <div className='lista-filmes'>
        {filmes.map((filmes)=>{
          return(
            <article key={filmes.id}>
              <strong>{filmes.nome}</strong>
              <img src={filmes.foto} alt={filmes.nome}/>
              <Link to={`/filme/${filmes.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  );
}

export default Home;