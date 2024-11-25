import React,{useEffect,useState} from 'react'
import DivAdd from '../../Components/DivAdd';
import DivTable from '../../Components/DivTable';
import { Link } from 'react-router-dom';
import {confirmation,sendRequest} from '../../functions';

const Marcas = () => {
	const[marcas,setMarcas] = useState([]);
	const[classLoad,setClassLoad] = useState('');
	const[classTable,setClassTable] = useState('d-none');
	useEffect( () =>{
		getMarcas();
	},[]);
	const getMarcas = async() =>{
		const res = await sendRequest('GET','','/api/marcas','');
		console.log('Datos de la API:', res);
		setMarcas(res);
		setClassTable('');
		setClassLoad('d-none');
	}
	const deleteMarcas = (id,marca) =>{
		confirmation(marca,('/api/marcas'+id,'/'));
	}
  return (
	<div className="container-fluid">
		<DivAdd>
			<Link to='create' className='btn btn-dark'>
			<i className="fa-solid fa-circle-plus"></i> Add
			</Link>
		</DivAdd>
		<DivTable col='6' off='3' classLoad={classLoad} classTable={classTable}>
			<table className="table table-bordered">
				<thead><tr><th>#</th><th>MARCAS</th><th></th><th></th></tr></thead>
				<tbody className='table-group-divider'>
					{marcas.map( (row,i) =>(
						<tr key={row.id}>
							<td>{(i+1)}</td>
							<td>{row.marca}</td>
							<td>
								<Link to={`/edit/${row.id}`} className='btn btn-warning'>
								<i className="fa-solid fa-edit"></i></Link>
							</td>
							<td><button className="btn btn-danger" onClick={() => deleteMarcas(row.id,row.marca)}>
								<i className="fa-solid fa-trash"></i></button></td>
						</tr>
					))}
				</tbody>
			</table>

		</DivTable>
	</div>
  )
}

export default Marcas
