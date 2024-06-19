# Transformar AFN para AFD

Este projeto é uma aplicação React que permite transformar um Autômato Finito Não-determinístico (AFN) em um Autômato Finito Determinístico (AFD). O usuário pode inserir estados, transições, símbolos, estado inicial e estados finais de um AFN e visualizar o AFD resultante.

## Pré-requisitos

Para executar este projeto, você precisará ter o Node.js e o npm instalados em sua máquina.

## Instalação

Clone o repositório e navegue até o diretório do projeto:

```bash
git clone https://github.com/Gabriel-Bastos-Rabelo/NFA-To-DFA.git
```
Navegue até o diretório
```
cd NFA-To-DFA
```

Instale as dependências do projeto:
```
npm install
```

## Uso

Para iniciar a aplicação em modo de desenvolvimento, execute:
```
npm start
```
Após isso abra:
```
http://localhost:3000 
```
para visualizar no seu navegador.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```

├── public
├── src
│   ├── components
│   │   ├── Form.js
│   │   ├── GraphDisplay.js
│   ├── App.js
│   ├── index.js
│   ├── nfaToDfa.js
│   ├── index.css
│   ├── reportWebVitals.js
├── package.json
├── README.md

```

- **components/Form.js**: Componente responsável pelo formulário onde o usuário insere os dados do AFN.

- **components/GraphDisplay.js**: Componente que exibe o AFD resultante.

- **App.js**: Componente principal da aplicação.

- **nfaToDfa.js**: Função que realiza a transformação de AFN para AFD.

- **index.js**: Ponto de entrada da aplicação.

- **index.css**: Estilos globais da aplicação.

- **reportWebVitals.js**: Configurações para medir o desempenho da aplicação.

## Funcionalidades
### Formulário

O formulário permite ao usuário adicionar:

- **Estados**: Adicionar estados do AFN.
- **Transições**: Adicionar transições do AFN.
- **Símbolos**: Adicionar símbolos do alfabeto do AFN.
- **Estado Inicial**: Definir o estado inicial do AFN.
- **Estados Finais**: Adicionar estados finais do AFN.

### Visualização do AFD

Após submeter o formulário, o AFD resultante é exibido com:

- **Estados**: Estados do AFD.
- **Transições**: Transições do AFD.
- **Símbolos**: Símbolos do alfabeto do AFD.
- **Estado Inicial**: Estado inicial do AFD.
- **Estados Finais**: Estados finais do AFD.


## Testes

Para executar os testes, utilize o comando:

```
npm test
```


## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais informações.
