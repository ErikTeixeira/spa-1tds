import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ExcluirProdutos.module.scss'; // Import the SCSS module

export default function ExcluirProdutos() {
  document.title = 'EXCLUIR PRODUTO';

  const navigate = useNavigate();
  const { id } = useParams();
  const [produto, setProduto] = useState({});

  
  useEffect(() => {
    // Este efeito é executado quando o componente é montado ou quando 'id' muda.
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

  const handleDelete = () => {
    // Esta função é chamada quando o botão "EXCLUIR" é clicado.
    // Faz uma solicitação DELETE para excluir o produto da API.
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        alert('Produto excluído com SUCESSO!');
        navigate('/produtos'); // Redireciona para a página de produtos após a exclusão
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className={styles.ExcluirProdutos}>
      <h1>Excluir Produto</h1>

      <div className={styles['produto-selecionado']}>
        <h2>Produto Selecionado</h2>
        <h3>Deseja realmente excluir esse produto?</h3>

        {/* Exibição dos detalhes do produto */}
        <div>
          <img src={produto.img} alt={produto.desc} />
          <h4>{produto.nome}</h4>
          <p>Preço: R$ {produto.preco}</p>
          <p>Descrição: {produto.desc}</p>
        </div>

        <div>
          <button onClick={handleDelete}>EXCLUIR</button>
          <button onClick={() => navigate('/produtos')}>CANCELAR</button>
        </div>
      </div>
    </div>
  );
}
