import './filme-info.css';
import {useParams} from 'react-router-dom'
import api from '../../services/api';
import {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';

export default function Filme(){
    const {id} = useParams();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(()=>{
        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);
            if(response.data.length === 0){
                history.replace('/')
                return;
            }
            setFilme(response.data);
            console.log(response.data);
            setLoading(false);
        }
        loadFilme();
    },[history, id]);

    function salvaFilme(){
        const minhaLista = localStorage.getItem('filmes')
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id );
        if(hasFilme){
            alert('Voce ja possui esse filme salvo')
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        alert("filme salvo");
    }

    if(loading){
        return(
            <div className='filme-info' >
                <h1>Carregando seu Filme...</h1>
            </div>
            )
    }
    return(
         <div className='filme-info' >
                <h1>{filme.nome}</h1>
                <img src={filme.foto} alt={filme.nome}/>
                <h3>Sinopse</h3>
                {filme.sinopse}
                <div className='botoes'>
                    <button onClick={() => salvaFilme()}>Salvar</button>
                    <button onClick={()=>{}}><a target="blank" href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                        </a></button>
                </div>
             </div>
         )
    
}