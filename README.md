# QuizMaster 🚀

Um sistema completo de criação e resolução de quizzes, com suporte a múltiplos quizzes, ranking de usuários e respostas verificadas pelo servidor.  

## Funcionalidades

- **Cadastro e login** de usuários.  
- **Criação de quizzes** personalizados.  
- **Criação de perguntas** dentro dos quizzes.  
- **Adição de múltiplas respostas** para cada pergunta.  
- **Início e resolução de quizzes** pelo servidor.  
- **Validação de respostas** e verificação de acertos.  
- **Proibição de responder a mesma pergunta duas vezes**.  
- **Reset de quizzes** para poder jogar novamente.  
- **Visualização de resultados** de todos os quizzes que o usuário já fez.  
- **Ranking de usuários** que participaram dos seus quizzes.  

## Funcionalidades Técnicas

- Cada quiz é carregado no **Redis em memória**, garantindo interações rápidas e dinâmicas.  
- Ao iniciar um quiz, o progresso do usuário também fica em **cache**.  
- Se o usuário demorar mais de **2 horas** para responder, o progresso é perdido e o quiz precisa ser reiniciado.  
- Desenvolvido com **NestJS**, garantindo arquitetura escalável e modular.  

## Como usar

1. Clone o projeto:  
```bash
git clone <url-do-projeto>