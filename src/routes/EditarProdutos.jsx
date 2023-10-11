import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import "./EditarProdutos.scss"; 

export default function EditarProdutos() {
  document.title = "EDITAR PRODUTO";

  const navigate = useNavigate();
  const { id } = useParams();
  const [produto, setProduto] = useState({
    id: id,
    nome: '',
    desc: '',
    img: '',
    preco: '',
  });

  useEffect(() => {
    // Esta função é executada quando o componente é montado ou quando 'id' muda.
    // Faz uma solicitação GET para obter os detalhes do produto da API.
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProduto(data); // Define os detalhes do produto recuperados da API no estado
      })
      .catch((error) => console.log(error));
  }, [id]);

  
  const handleChange = (e) => {
    // Esta função é chamada quando os campos de entrada são alterados.
    // Atualiza o estado 'produto' com os valores dos campos de entrada.
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Esta função é chamada quando o formulário é enviado.
    // Faz uma solicitação PUT para atualizar o produto na API.
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    })
      .then((response) => response.json())
      .then(() => {
        navigate('/produtos'); // Redireciona para a página de produtos após a edição.
      })
      .catch((error) => console.log(error));
  }


  return (
    <div className="EditarProdutos">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Editar Produto</legend>
          <div>
            <label htmlFor="idNome">Nome</label>
            <input type="text" name="nome" id="idNome" value={produto.nome} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="idDesc">Descrição</label>
            <input type="text" name="desc" id="idDesc" value={produto.desc} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="idPreco">Preço</label>
            <input type="text" name="preco" id="idPreco" value={produto.preco} onChange={handleChange} />
          </div>
          <div>
            <button type="submit">EDITAR</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
