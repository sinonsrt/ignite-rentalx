**RF** => Requisitos Funcionais

**RNF** => Requisitos não funcionais

**RN** => Regra de negócio


# Cadastro de Carros
**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas a categorias.

**RNF**
-

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado, por padrão com disponibílidade.
Apenas administradores podem realizar o cadastro.

# Listagem de carro
**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis através do nome do categoria.
Deve ser possível listar todos os carros disponíveis através do nome do marca.
Deve ser possível listar todos os carros disponíveis através do nome do carro.

**RNF**
-

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro
**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RNF**
-

**RN**
Não deve ser possível cadastar uma especificação para um carro inexistente.
Não deve ser possível cadastar uma especificação já existente no mesmo carro.

# Cadastro de imagens do carro
**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve por cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Agendamento de alugel de carro
**RF**
Deve ser possível cadastrar um aluguel.

**RNF**

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.