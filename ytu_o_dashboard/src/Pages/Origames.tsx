import { useEffect, useState, useMemo } from 'react';
import { useTable, useFilters, Column, TableInstance } from 'react-table';
import { SideBar } from '../Components/SideBar';
import { GameRepository } from '../repositories/OrigamesRepository';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import './Origames.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Game } from '../Interfaces';


const gameRepository = new GameRepository();

const Origames = () => {
  const [data, setData] = useState<Game[]>([]);
  const navigate = useNavigate(); // Use navigate for routing

  useEffect(() => {
    gameRepository.getAll().then((games) => {
      setData(games);
    });
  }, []);

  const columns: Column<Game>[] = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Event', accessor: 'name' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Creator', accessor: 'creator' },
      {
        Header: 'Kayit Ol',
        accessor: 'action',
        Cell: ({ row }) => {
          const game : Game= row.original;
          console.log(game)
          return game.status ? (
            <button 
              className="btn btn-primary"
              onClick={() => handleButtonClick(game)}
            >
              Action
            </button>
          ) : (
            <button 
              className="btn btn-danger"
              disabled
            >
              Finished
            </button>
          );
        }
      }
    ],
    []
  );

  const handleButtonClick = (rowData: Game) => {
    navigate(`/origames/${rowData.id}`);
  };

  const tableInstance: TableInstance<Game> = useTable({ columns, data }, useFilters);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <>
      <div className="container-fluid d-flex justify-content-center">
        <h1 className="text-primary pt-4 display-1 handwritten-title">ORİGAMES</h1>
      </div>
      <br />
      <br />
      <div className="Origames d-flex">
        <SideBar />
        <div className="content-container" style={{ marginLeft: '60px' }}>
          <table {...getTableProps()} className="table table-striped table-bordered">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Origames;
