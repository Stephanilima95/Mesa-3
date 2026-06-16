import "./CardLivro.css";

const CardLivro = ({ livro }) => {
    return (
        <div className="card-livro">

            <h2>{livro.titulo}</h2>

            <p>
                <strong>Autor:</strong> {livro.autor}
            </p>

            <p>
                <strong>Gênero:</strong> {livro.genero}
            </p>

            <p>
                <strong>Ano:</strong> {livro.ano}
            </p>

        </div>
    );
};

export default CardLivro;