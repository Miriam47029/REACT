import React,{useEffect,useState,useRef} from 'react'
import { sendRequest } from '../functions';
import DivInput from './DivInput';

const FormMarc = (params) => {
	const [marca,setMarca] = useState('');
	const MarcaInput = useRef();
	let method = 'POST';
	let url = '/api/marcas';
	let redirect = '';
	useEffect( () =>{
		MarcaInput.current.focus();
		getMarcas();
	},[]);
	const getMarcas = async() =>{
		if (params.id !== null) {
			const res = await sendRequest('GET','',(url+'/'+params.id));
			setMarca(res.data.marca);
		}
	}
	const save = async(e) =>{
		e.preventDefault();
		if(params.id !== null){
			method= 'PUT';
			url ='/api/marcas/'+params.id;
			redirect ='/';
		}
		const res = await sendRequest(method,{marca:marca},url,redirect);
		if (method == 'POST' && res.status == true) {
			setMarca('');
		}
	}
  return (
	<div className="container-fluid">
  <div className="row mt-5">
    <div className="col-md-4 offset-md-4">
      <div className="card border border-info">
        <div className="card-header bg-info border-info">
          {params.title}
        </div>
        <div className="card-body">
          <form onSubmit={save}>
			<DivInput type='text' icon='fa-building'
			value={marca} className='form-control'
			placerholder='Marca' required='required'
			ref={MarcaInput}
			handleChange={(e)=>setMarca(e.target.value)}></DivInput>
			<div className="d-grip col-10 mx-auto">
				<button className="btn btn-dark">
					<i className="fa-solid fa-save"></i> Save
				</button>
			</div>

		  </form>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default FormMarc
