import "./Botao.css";

const Botao = (props) => {
    return (
        <button
            className="botao"
            type={props.btnEditar ? "button" : "submit"}
            onClick={(e) => {
                if (props.btnEditar) {
                    e.preventDefault();
                    props.cancelarEdicao();
                    return;
                }

                if (props.onClick) {
                    props.onClick(e);
                }
            }}
        >
            {props.nomeDoBotao}
        </button>
    );
};

export default Botao;