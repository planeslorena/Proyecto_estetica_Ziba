import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import './adminTable.css'
import { AddClient } from '../modalsAdmin/clients';
import { AddProfessional } from '../modalsAdmin/professional';
import { AddServices } from '../modalsAdmin/services';
import { AddAppoinments } from '../modalsAdmin/appointments';
import Swal from 'sweetalert2';
import { deleteClient, deleteProf } from '@/app/services/User';
import { deleteAppointment, deleteService } from '@/app/services/Services';


interface tableProps {
  data: any[];
  columns: any[];
  filter: string;
  updateData: () => void;
}

export const AdminTable: React.FC<tableProps> = ({ data, columns, filter, updateData }) => {

  const [showClient, setShowClient] = useState(false);
  const [showProfessional, setShowProfessional] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const [showEditClient, setShowEditClient] = useState<number>();
  const [showEditProfessional, setShowEditProfessional] = useState<number>();
  const [showEditServices, setShowEditServices] = useState<number>();

  const handleClose = () => {
    switch (filter) {
      case "Clientes":
        setShowClient(false)
        break;
      case "Profesionales":
        setShowProfessional(false)
        break;
      case "Turnos":
        setShowAppointments(false)
        break;
      case "Servicios":
        setShowServices(false)
        break;
    }
  };

  const handleShow = () => {
    switch (filter) {
      case "Clientes":
        setShowClient(true)
        break;
      case "Profesionales":
        setShowProfessional(true)
        break;
      case "Turnos":
        setShowAppointments(true)
        break;
      case "Servicios":
        setShowServices(true)
        break;
    }
  };

  const handleShowEdit = (id: any) => {
    switch (filter) {
      case "Clientes":
        setShowEditClient(id)
        break;
      case "Profesionales":
        setShowEditProfessional(id)
        break;
      case "Servicios":
        setShowEditServices(id)
        break;
    }
  };

  const deleteFunction = async (id: number) => {
    switch (filter) {
      case "Clientes":
        return await deleteClient(id);
      case "Profesionales":
        return await deleteProf(id);
      case "Turnos":
        return await deleteAppointment(id);
      case "Servicios":
        return await deleteService(id);
    }
  }

  const deleteRow = async (id: number) => {
    let deleteItem = ''
    switch (filter) {
      case "Clientes":
        deleteItem = 'cliente';
        break;
      case "Profesionales":
        deleteItem = 'profesional';
        break;
      case "Turnos":
        deleteItem = 'turno';
        break;
      case "Servicios":
        deleteItem = 'servicio';
        break;
    }

    Swal.fire({
      title: "Advertencia",
      text: `Estas seguro de que quieres eliminar el ${deleteItem} numero ${id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await deleteFunction(id);
        if (resp == 200) {
          Swal.fire({
            title: `Eliminar ${deleteItem}`,
            text: `El ${deleteItem} fue eliminado con exito!`,
            icon: "success"
          });
          updateData();
        } else {
          Swal.fire({
            title: `${resp}`,
            text: `No se pudo eliminar el ${deleteItem}`,
            icon: "error"
          });
        }
      }
    });
  }

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="p-2 container-principal">
      <div className='d-flex flex-row justify-content-between'>
        <input className='inputbuscador-admin' placeholder="Buscar "
          type='text'
          value={filtering}
          onChange={e => setFiltering(e.target.value)}
        />
        <button onClick={handleShow} className='button-agregar'>Agregar {filter} +</button>

        {filter == 'Clientes' && <AddClient show={showClient} handleClose={handleClose} action='Agregar' updateData={updateData} />}
        {filter == 'Profesionales' && <AddProfessional show={showProfessional} handleClose={handleClose} action='Agregar' updateData={updateData} />}
        {filter == 'Servicios' && <AddServices show={showServices} handleClose={handleClose} action='Agregar' updateData={updateData} />}
        {filter == 'Turnos' && <AddAppoinments show={showAppointments} handleClose={handleClose} action='Agregar' updateData={updateData} />}
      </div>
      <table className='table-admin-container'>
        <thead className='table-admin-thead'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className='table-admin-th' key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    { 'asc': <i className="bi bi-sort-down-alt icon-down" />, 'desc': <i className="bi bi-sort-up icon-up" /> }[header.column.getIsSorted() as string] ?? <i className="bi bi-arrow-down-up icon-double-arrow" />
                  }
                </th>
              ))}
              <th className='table-admin-th'>Ajustes</th>
            </tr>
          ))}
        </thead>
        <tbody className='body-ajustes'>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td className='table-admin-td' key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td table-admin-td>
                {filter !== 'Turnos' &&
                  <i onClick={() => handleShowEdit(row.original.id)} className='bi bi-pencil icon-pencil' />
                }
                {filter == 'Clientes' && <AddClient data={row.original} show={row.original.id == showEditClient} handleClose={() => setShowEditClient(0)} action='Modificar' updateData={updateData} />}
                {filter == 'Profesionales' && <AddProfessional data={row.original} show={row.original.id == showEditProfessional} handleClose={() => setShowEditProfessional(0)} action='Modificar' updateData={updateData} />}
                {filter == 'Servicios' && <AddServices data={row.original} show={row.original.id == showEditServices} handleClose={() => setShowEditServices(0)} action='Modificar' updateData={updateData} />}
                <i className='bi bi-trash3 icon-trash' onClick={() => deleteRow(row.original.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <i onClick={() => table.setPageIndex(0)} className="bi bi-chevron-double-left"></i>
      <i onClick={() => table.previousPage()} className="bi bi-chevron-left"></i>
      <i onClick={() => table.nextPage()} className="bi bi-chevron-right"></i>
      <i onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="bi bi-chevron-double-right"></i>
      <div className="h-4" />
    </div>
  );
}