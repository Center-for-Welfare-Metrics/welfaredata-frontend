import ContextMenu from "@/context/context-menu";
import React, { useContext } from "react";
import { Table, Td, Tr, Th } from "./default-table-styled";
import { IContextOptions } from "@/context/context-menu";
import { DefaultEventComportamentOnContextMenuOpen } from "@/utils/context-menu";

interface IColumn {
  Header: string;
  accessor: string;
  preRender?(rowValue: any): any;
}

interface IDefaultTable {
  data: any[];
  columns: IColumn[];
  rowClick?(row: any): void;
  options?: IContextOptions[];
}

const DefaultTable = ({ data, columns, rowClick, options }: IDefaultTable) => {
  const { setContextMenu, contextMenu } = useContext(ContextMenu);

  const onRowClick = (row) => () => {
    rowClick(row);
  };

  const onRowContextMenu = (row) => (event: any) => {
    DefaultEventComportamentOnContextMenuOpen(event);
    let { clientX, clientY } = event;
    setContextMenu({
      open: true,
      type: "options",
      x: clientX,
      y: clientY,
      options: options,
      optionTarget: row,
      position: "mouse-oriented",
    });
  };

  return (
    <Table>
      <tbody>
        <Th>
          {columns.map((column) => (
            <th key={column.accessor}>{column.Header}</th>
          ))}
        </Th>
        {data.map((row) => (
          <Tr
            onContextMenu={onRowContextMenu(row)}
            onClick={onRowClick(row)}
            key={row?._id}
          >
            {columns.map((column) => (
              <Td key={column.accessor}>
                {row[column.accessor] && column.preRender
                  ? column.preRender(row[column.accessor])
                  : row[column.accessor]}
              </Td>
            ))}
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DefaultTable;
