import React, { useEffect, useState, useRef } from 'react';
import DivAdd from '../../Components/DivAdd';
import DivTable from '../../Components/DivTable';
import DivInput from '../../Components/DivInput';
import DivSelect from '../../Components/DivSelect';
import Modal from '../../Components/Modal';
import { confirmation, sendRequest } from '../../functions';
import { PaginationControl } from 'react-bootstrap-pagination-control';

const Celulares = () => {
  const [celulares, setCelulares] = useState([]);
  const [id, setId] = useState('');
  const [modelo, setModelo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [marcaId, setMarcaId] = useState('');
  const [camara, setCamara] = useState('');
  const [foto, setFoto] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');
  const [classLoad, setClassLoad] = useState('');
  const [classTable, setClassTable] = useState('d-none');
  const [rows, setRows] = useState(0);
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(0);
  const ModeloInput = useRef();
  const close = useRef();
  let method = '';
  let url = '';

  useEffect(() => {
    getCelulares(1);
    getMarcas();
  }, []);

  const getCelulares = async (page) => {
    try {
      const res = await sendRequest('GET', '', `/api/celulares?page=${page}`);
      console.log('Respuesta de la API:', res);

      if (Array.isArray(res)) {
        setCelulares(res);
        setRows(res.length);
        setClassTable('');
        setClassLoad('d-none');
      } else {
        console.error("No se encontraron datos en la respuesta de la API");
        setCelulares([]);
      }
    } catch (error) {
      console.error("Error al obtener celulares:", error);
      setCelulares([]);
    }
  };

  const getMarcas = async () => {
    const res = await sendRequest('GET', '', '/api/marcas', '');
    setMarcas(res);
  };

  const deleteCelulares = (id, modelo) => {
    confirmation(modelo, '/api/celulares/' + id, 'celulares');
  };

  const clear = () => {
    setModelo('');
    setDescripcion('');
    setPrecio('');
    setMarcaId('');
    setCamara('');
    setFoto('');
  };

  const openModal = (op, m, d, p, mi, c, f, em) => {
    clear();
    setTimeout(() => ModeloInput.current.focus(), 600);
    setOperation(op);
    setId(em);
    if (op === 1) {
      setTitle('Create Celular');
    } else {
      setTitle('Update Celular');
      setModelo(m);
      setDescripcion(d);
      setPrecio(p);
      setMarcaId(mi);
      setCamara(c);
      setFoto(f);
    }
  };

  const save = async (e) => {
    e.preventDefault();
  
    let method = operation === 1 ? 'POST' : 'PUT';
    let url = operation === 1 ? '/api/celulares' : `/api/celulares/${id}`;
  
    const formData = new FormData();
    formData.append('modelo', modelo);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('marca_id', marcaId);
    formData.append('camara', camara);
  
    // Verificar si `foto` es un archivo válido antes de adjuntarlo
    if (foto instanceof File) {
      formData.append('foto', foto);
    }
  
    // Verificar contenido de FormData antes de enviarlo
    console.log("Enviando FormData:", Array.from(formData.entries()));
  
    const res = await sendRequest(method, formData, url, '', true);
    if (res.status === true) {
      close.current.click();
      clear();
      getCelulares(page);
    }
  };
  
  
  
  // Manejar cambio del archivo de imagen
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Tipo de archivo seleccionado:", selectedFile.type);
      setFoto(selectedFile);
    } else {
      setFoto(null);
    }
  };
  
  
  const goPage = (p) => {
    setPage(p);
    getCelulares(p);
  };

  return (
    <div className="container-fluid">
      <DivAdd>
        <button className="btn btn-dark" data-bs-toggle='modal' data-bs-target='#modalCelulares' onClick={() => openModal(1)}>
          <i className="fa-solid fa-circle-plus"></i> Add
        </button>
      </DivAdd>
      <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
        <table className="table table-bordered">
          <thead>
            <tr><th>#</th><th>Modelo</th><th>Descripción</th><th>Precio</th><th>Marca</th><th>Cámara</th><th>Foto</th><th></th><th></th></tr>
          </thead>
          <tbody className='table-group-divider'>
            {celulares && celulares.length > 0 ? (
              celulares.map((row, i) => (
                <tr key={row.id}>
                  <td>{(i + 1)}</td>
                  <td>{row.modelo}</td>
                  <td>{row.descripcion}</td>
                  <td>{row.precio}</td>
                  <td>{row.marca_id}</td>
                  <td>{row.camara}</td>
                  <td>
                  {row.foto && (
  <img 
    src={row.foto} 
    alt={row.modelo} 
    style={{ width: '100px', height: 'auto', objectFit: 'cover' }} 
  />
)}
</td>
                  <td>
                    <button className='btn btn-warning' data-bs-toggle='modal'
                      data-bs-target='#modalCelulares' onClick={() => openModal(2, row.modelo, row.descripcion, row.precio, row.marca_id, row.camara, row.foto, row.id)}>
                      <i className="fa-solid fa-edit"></i>
                    </button>
                  </td>
                  <td><button className="btn btn-danger" onClick={() => deleteCelulares(row.id, row.modelo)}>
                    <i className="fa-solid fa-trash"></i></button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        <PaginationControl 
          changePage={(page) => goPage(page)}
          next={true} 
          limit={10} 
          page={page} 
          total={rows} 
        />
      </DivTable>
      <Modal title={title} modal="modalCelulares">
        <div className="modal-body">
          <form onSubmit={save}>
            <DivInput 
              type="text" 
              icon="fa-user" 
              value={modelo} 
              className="form-control" 
              placeholder="Modelo" 
              required="required" 
              ref={ModeloInput} 
              handleChange={(e) => setModelo(e.target.value)} 
            />
            <DivInput 
              type="text" 
              icon="fa-file-alt" 
              value={descripcion} 
              className="form-control" 
              placeholder="Descripcion" 
              required="required" 
              handleChange={(e) => setDescripcion(e.target.value)} 
            />
            <DivInput 
              type="text" 
              icon="fa-dollar-sign" 
              value={precio} 
              className="form-control" 
              placeholder="Precio" 
              required="required" 
              handleChange={(e) => setPrecio(e.target.value)} 
            />
            <DivSelect 
        icon="fa-tags"
        required="required"
        value={marcaId} 
        className="form-select" 
        options={marcas}
        handleChange={(e) => setMarcaId(e.target.value)} 
		/>
            <DivInput 
              type="text" 
              icon="fa-camera" 
              value={camara} 
              className="form-control" 
              placeholder="Camara" 
              required="required" 
              handleChange={(e) => setCamara(e.target.value)} 
            />
            <DivInput 
  type="file" 
  icon="fa-image" 
  className="form-control" 
  placeholder="Foto" 
  handleChange={handleFileChange} 
/>
			<div className="d-grid col-10 mx-auto">
  <button className="btn btn-dark">
    <i className="fa-solid fa-save"></i>
    Save
  </button>
</div>

          </form>
        </div>
		<div className="modal-footer">
          <button className="btn btn-dark" data-bs-dismiss="modal" ref={close}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default Celulares;
