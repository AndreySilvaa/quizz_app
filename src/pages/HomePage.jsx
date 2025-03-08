import React from "react";
import "../styles/homepage.css";

const HomePage = () => {
  return (
    <main>
      <article className="intro">
        <section className="apresentaçãoBG"></section>
        <div className="apresentação">
          O Lumia é um projeto educacional que visa trazer um processo
          de aprendizado e estudo mais interativo e rico em recursos visuais.
          Disciplinas como física, biologia e matemática serão abordadas em
          quizzes/jogos de perguntas e respostas com múltiplas escolhas, isso
          incentiva o cérebro a buscar na memória informações e conceitos
          corretos, tornando o aprendizado ativo e mais eficiente.
        </div>
      </article>

      <article className="methodDV">
        <h2>Metódos e Estratégias de Aprendizado</h2>

        <section className="method">
          <div className="template tpt1">
            <h3>Níveis de Dificuldade</h3>
            <p>
              As questões irão ser organizadas em diferentes níveis de
              dificuldade, incluindo iniciante, fácil, médio e difícil.
            </p>
          </div>
          <div className="template tpt2">
            <h3>Múltipla Escolha</h3>
            <p>
              Analise com senso crítico as opções disponíveis e distingua qual a que melhor corresponde com o que foi pedido no enunciado.
            </p>
          </div>
          <div className="template tpt3">
            <h3>Fórmulas</h3>
            <p>
              Identifique equações importantes e frequentemente usadas na elaboração de questões.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
};

export default HomePage;
