import api from "./Services";



export const gerarResumo = async (titulo, descricao = "") => {
  try {
    const resposta = await api.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        temperature: 0.4,
        max_tokens: 120,
        messages: [
          {
            role: "user",
            content: `
              Faça uma sinopse simples do livro abaixo :

              Título: ${titulo}
            `,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return resposta.data.choices[0].message.content;
  } catch (erro) {
    console.error(erro);
    return "Erro ao gerar resumo.";
  }
};


//  Descrição:
// ${descricao}