// TableColumns.js

// Esta função retorna um objeto contendo definições de colunas para uma tabela, com opções para mostrar colunas especiais
const TableColumns = (showSpecialColumns, visibleColumns = []) => ({
  // Definição da coluna de ID do usuário
  user: {
    accessorKey: 'id', // Chave de acesso aos dados do usuário
    header: 'Id', // Texto do cabeçalho da coluna
    grow: false, // Indica se a coluna pode expandir
    size: 40, // Tamanho da coluna
    show: showSpecialColumns, // Indica se a coluna deve ser exibida
    muiTableHeadCellProps: {
      align: 'center', // Propriedades da célula do cabeçalho da coluna
    },
    muiTableBodyCellProps: {
      align: 'center', // Propriedades da célula do corpo da coluna
    },
  },
  // Definição da coluna de protocolo
  protocolo: {
    accessorKey: 'protocolo',
    header: 'Protocolo',
    grow: false,
    size: 40,
    align: 'center',
    show: visibleColumns.includes('protocolo'), // Verifica se a coluna está incluída nas colunas visíveis
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
  },
  status: {
    accessorKey: 'status',
    header: 'Status',
    grow: false,
    size: 50,
    align: 'center',
    show: visibleColumns.includes('status'), // Verifica se a coluna está incluída nas colunas visíveis
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
  },
  // Definição da coluna de nome
  nome: {
    accessorKey: 'nome',
    header: 'Nome',
    grow: true,
    size: 300,
    // Verifica se deve exibir a coluna especial ou se não há colunas visíveis definidas ou se a coluna está incluída nas colunas visíveis
    show:
      showSpecialColumns ||
      !visibleColumns.length ||
      visibleColumns.includes('nome'),
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
  },
  // Definição da coluna de email
  email: {
    accessorKey: 'email',
    header: 'Email',
    grow: false,
    size: 100,
    align: 'center',
    // Verifica se deve exibir a coluna especial ou se não há colunas visíveis definidas ou se a coluna está incluída nas colunas visíveis
    show:
      showSpecialColumns ||
      !visibleColumns.length ||
      visibleColumns.includes('email'),
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
  },
  // Definição da coluna de número
  numero: {
    accessorKey: 'numero',
    header: 'Número',
    grow: false,
    size: 40,
    align: 'center',
    // Verifica se não há colunas visíveis definidas ou se a coluna está incluída nas colunas visíveis
    show: !visibleColumns.length || visibleColumns.includes('numero'),
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
  },
  // Definição da coluna de data
  data: {
    accessorKey: 'data',
    header: 'Data',
    grow: false,
    size: 40,
    align: 'center',
    // Verifica se não há colunas visíveis definidas ou se a coluna está incluída nas colunas visíveis
    show: !visibleColumns.length || visibleColumns.includes('data'),
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
  },

  // Adicione mais definições de colunas conforme necessário
});

export default TableColumns;
