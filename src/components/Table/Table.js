// Componentes de páginas
import React, { useMemo, useState, useCallback } from 'react';
import {
  useMaterialReactTable,
  MRT_TableContainer as MRTTableContainer,
} from 'material-react-table';
import { Button } from '@mui/material';

import ActionMenu from '../ActionMenu/ActionMenu.js'; // Importa o componente de menu de ação
import DetailsDialog from '../ProtocolDetailsDialog/DetailsDialog.js'; // Importa o componente de diálogo de detalhes do protocolo
import TableColumns from './tableColumns.js'; // Importa as configurações das colunas da tabela

// Componente de Tabela
const Table = ({
  tableData, // Dados da tabela
  includeActionColumn = true, // Indica se a coluna de ação deve ser incluída (padrão: true)
  visibleColumns, // Colunas visíveis
  showSpecialColumns, // Indica se as colunas especiais devem ser exibidas
  enableRowClick = true, // Habilita o clique nas linhas da tabela (padrão: true)
  customActionMenuOptions, // Opções de menu de ação personalizadas
  actionMenuOptions, // Opções de menu de ação
}) => {
  // Estado para controlar se o diálogo de detalhes está aberto ou fechado
  const [isDialogOpen, setDialogOpen] = useState(false);
  // Estado para armazenar o item selecionado
  const [selectedItem, setSelectedItem] = useState({});
  // Estado para controlar o índice da página atual
  const [pageIndex, setPageIndex] = useState(0);
  // Estado para controlar a quantidade de linhas por página
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Estado para armazenar o elemento âncora do menu de ação
  const [anchorEl, setAnchorEl] = useState(null);

  // Função para ir para a página anterior
  const handlePreviousPage = () => {
    const newPageIndex = Math.max(pageIndex - 1, 0);
    setPageIndex(newPageIndex);
    table.setPageIndex(newPageIndex);
  };

  // Verifica se é possível ir para a próxima página
  const canGoToNextPage = tableData && tableData.length > (pageIndex + 1) * rowsPerPage;

  // Função para ir para a próxima página
  const handleNextPage = () => {
    if (canGoToNextPage) {
      const newPageIndex = pageIndex + 1;
      setPageIndex(newPageIndex);
      table.setPageIndex(newPageIndex);
    }
  };

  // Função para lidar com a alteração da quantidade de linhas por página
  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = Number(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setPageIndex(0);
    table.setPageSize(newRowsPerPage);
  };

  // Função para lidar com o clique no menu de ação
  const handleMenuClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(rowData);
  };

  // Função para fechar o menu de ação
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // Função para lidar com o clique em uma linha da tabela
  const handleTableRowClick = (event, row) => {
    if (enableRowClick) {
      const isMenuClick =
        event.target.closest('.MuiIconButton-root') ||
        event.target.closest('.MuiMenuItem-root');
      if (!isMenuClick && !anchorEl) {
        setSelectedItem(row.original);
        setDialogOpen(true);
      }
    }
  };

  // Simplifica a definição das colunas usando useMemo
  const columns = useMemo(() => {
    return [
      ...Object.values(TableColumns(showSpecialColumns, visibleColumns)).filter((column) => column.show),
      // Coluna de ação com o ícone de menu
      includeActionColumn && {
        accessorKey: 'acao',
        header: 'Ação',
        grow: false,
        size: 50,
        Cell: ({ row }) => (
          <ActionMenu
            onMenuClick={(event) => handleMenuClick(event, row.original)}
            onMenuClose={handleMenuClose}
            menuOptions={customActionMenuOptions || actionMenuOptions}
          />
        ),
        show: !visibleColumns || visibleColumns.includes('acao'),
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
    ].filter((column) => column.show);
  }, [includeActionColumn, visibleColumns, showSpecialColumns, customActionMenuOptions, actionMenuOptions, handleMenuClose]);

  // Memoiza os dados da tabela
  const data = useMemo(() => tableData, [tableData]);

  // Utiliza o hook useMaterialReactTable para criar a tabela
  const table = useMaterialReactTable({
    columns,
    data,
    actionMenuOptions,
    initialState: { pagination: { pageIndex, pageSize: rowsPerPage } },
    // Define as propriedades de estilo para as linhas da tabela
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => handleTableRowClick(event, row),
      sx: {
        cursor: 'pointer',
      },
    }),
    // Define as propriedades de estilo para as células da tabela
    muiTableCellProps: {
      sx: {
        backgroundColor: '#fff',
      },
    },
  });

  return (
    <div className="container-fluid card px-0 ml-0">
      <div className="row">
        <div className="col w-100">
          {/* Renderiza o contêiner da tabela */}
          <MRTTableContainer table={table} />
        </div>
      </div>
      <div className="pagination-controls d-flex justify-content-between align-items-center p-3">
        <div className="d-flex align-items-center">
          {/* Botão para ir para a página anterior */}
          <Button
            onClick={handlePreviousPage}
            disabled={pageIndex === 0}
            variant="btn btn-secondary btn-sm"
          >
            Página Anterior
          </Button>
          {/* Indicação da página atual */}
          <span className="mx-2">{`Página ${pageIndex + 1}`}</span>
          {/* Botão para ir para a próxima página */}
          <Button
            onClick={handleNextPage}
            disabled={!canGoToNextPage}
            variant="btn btn-secondary btn-sm"
          >
            Próxima Página
          </Button>
        </div>
        {/* Controle da quantidade de linhas por página */}
        <div className="rows-per-page-control align-items-center mt-2">
          <span className="mr-1">Linhas por Página:</span>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      {/* Diálogo de detalhes do protocolo */}
      <DetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default Table;