# Holiday Moment

## Exercício

**Criar um projeto React Native que faça as seguintes operações:**

- Consumir a API REST e armazenar a lista localmente no aplicativo; <span style="color:red"><b>\*</b></span>
- Apresente em um grid os dados armazenados localmente que foram extraídos da api criada no item anterior;
- Apresente um botão de editar as informações que estão armazenadas (localmente);
- Apresente um botão de excluir a informação (localmente).
- Apresente um botão para tirar uma foto e adicionar ao item da lista (feriado), garantir que a foto seja salva localmente.
- Garantir que ao anexar a foto, capture e salve também a geolocalização (latitude e longitude) localmente.

**Dados da API:**

- <span style="color:red"><b>\*</b></span> Api Rest: Pode ser utilizada a API: http://dadosbr.github.io/feriados/nacionais.json

**OBS:** O atributo de foto e os dados das coordenadas deve somente existir localmente no aplicativo.

## Sobre o APP

- Criado uma tela de _Feeds_ para a listagem de feriados onde:
  - Carrega feriados da API quando não contem nenhum armazenado na memoria interna;
  - Feriados com data variáveis _(variableDates)_ foram separados como novos;
  - Feriados com data _(date)_ são exibidos apenas no ano atual;
  - Os feriados são ordenados por data;
  - Exibe parte da descrição, nome, data, imagem e coordenadas;
  - Feriados sem localização, não exibe a localização;
  - Feriados sem imagem é carregado uma padrão;
  - Botões de ação em cada item do _Feed_ (_Editar_, _Registrar Feriado_ e _Remover_);
  - **Pressionar e segurar _longPress_ sobre uma imagem é exibido mais detalhes;**
- Editar:
  - Edita um feriado especifico;
  - Possível alterar a data tanto digitando como selecionando;
- Registrar Feriado:
  - Solicita a permissão de acesso a camera e gps;
  - Salva a foto na memoria interna do APP;

## Menções

- Hooks
  - **usePromise**: Criado para facilitar o controle de _Promises_ e seus estados;
  - **useLocation/useCamera**: Criado para facilitar o uso de permissão/solicitação/uso das APIS;
- Utils:
  - **Storage**: Criado para manipulação da API Storage;
- Components:
  - **Form**: Criado components básico de formulários para simplificar o código;
- Helpers:
  - **str**: Manipulação de string para facilitar _fills_ de input;

## Pacotes utilizados

- <a href="https://www.npmjs.com/package/dotenv" target="_blank">**dotenv**</a>: Controle de variáveis de ambiente;
- <a href="https://nativebase.io/" target="_blank">**NativeBase**</a>: Componentes visuais;
- <a href="https://reactnavigation.org/" target="_blank">**@react-navigation/native**</a>: Sistema de rotas;
- <a href="https://axios-http.com/docs/intro" target="_blank">**axios**</a>: Realização de requisições http;
- <a href="https://www.npmjs.com/package/@expo-google-fonts/poppins" target="_blank">**@expo-google-fonts/poppins**</a>: Realização de requisições http;
- <a href="https://react-native-async-storage.github.io/async-storage/docs/install/" target="_blank">**@react-native-async-storage/async-storage**</a>: Sistema para armazenamento de chave/valor;
- <a href="https://www.npmjs.com/package/@react-native-community/datetimepicker" target="_blank">**@react-native-community/datetimepicker**</a>: Seleção de data/time;
- <a href="https://day.js.org/" target="_blank">**dayjs**</a>: Manipulação de data;
- <a href="https://docs.expo.dev/versions/latest/sdk/asset/" target="_blank">**expo-asset**</a>: Carregamento de assets do projeto;
- <a href="https://docs.expo.dev/versions/latest/sdk/camera/" target="_blank">**expo-camera**</a>: API de acesso à camera;
- <a href="https://docs.expo.dev/versions/latest/sdk/filesystem/" target="_blank">**expo-file-system**</a>: API de acesso à file system do celular;
- <a href="https://docs.expo.dev/versions/latest/sdk/location/" target="_blank">**expo-location**</a>: API de acesso à localização do celular;
- <a href="https://formik.org/" target="_blank">**formik**</a>: Manipulação e construção de formulários;
- <a href="https://www.npmjs.com/package/uuid" target="_blank">**uuid**</a>: Geração de uuids;
- <a href="https://www.npmjs.com/package/yup" target="_blank">**yup**</a>: Validação de dados;

---

- Demais pacotes utilizados foram para auxilio dos principais;

## Capturas de tela
