import React from "react";

type Column<T> = {
  header: string;
  accessor: keyof T;
};

type AdminTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

function AdminTable<T extends { _id?: string; id?: string | number }>({ columns, data }: AdminTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row) => (
            <tr key={row._id ?? row.id} className="hover:bg-muted/50">
              {columns.map((col) => (
                <td key={String(col.accessor)} className="px-4 py-2 whitespace-nowrap">
                  {String(row[col.accessor] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
