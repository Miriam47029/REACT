import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import{sendRequest} from '../functions';
import DivInput from '../Components/DivInput';

const Register = () => {
	const [name,setName] = useState('');
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const go = useNavigate();
	const csrf = async () => {
		await axios.get('/sanctum/csrf-cookie');
	}
	const register = async (e) => {
		e.preventDefault();
		await csrf();
		const form = {name:name,email:email,password:password};
		const res = await sendRequest('POST',form,'/api/auth/register','',false);
		if (res.status == true) {
			go('/login');
		}
	}
  return (
	<div className="container-fluid">
		<div className="row mt-5">
			<div className="col-md-4 offset-md-4">
				<div className="card border border-primary">
					<div className="card-header bg-primary border border-primary text-white fw-bold">
						REGISTER
					</div>
					<div className="card-body">
						<form onSubmit={register}>
						<DivInput type='text' icon='fa-user' value={name}
							className='form-control' placeholder='Name' required='required'
							handleChange={ (e)=> setName(e.target.value)} />
							<DivInput type='email' icon='fa-at' value={email}
							className='form-control' placeholder='Email' required='required'
							handleChange={ (e)=> setEmail(e.target.value)} />
							<DivInput type='password' icon='fa-key' value={password}
							className='form-control' placeholder='Password' required='required'
							handleChange={ (e)=> setPassword(e.target.value)} />
							<div className="d-grid col-10 mx-auto">
								<button className="btn btn-primary">
									<i className="fa-solid fa-door-open"></i> Register
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

export default Register
