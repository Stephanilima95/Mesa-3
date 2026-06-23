
const Botao = (props) => {
    return (
        <button
            className="botao"
            type={props.type}
            onClick={props.onClick}
        >
            {props.nomeDoBotao}
        </button>
    );
};

export default Botao;