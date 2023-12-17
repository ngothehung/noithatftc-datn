import { Tab } from "react-bootstrap";
import React, { Fragment, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { onFieldsChange, validateMessages } from "../../services";
import { Form, Input, Select, message } from "antd";
import { useDispatch } from "react-redux";
import { Auth_Service } from "../../services/shop/auth-service";
import { toggleShowLoading } from "../../redux/actions/common";

export const RegisterForm = ( props ) =>
{
	const [ form ] = useForm();
	const [ genderConfig, setGenderConfig ] = useState( [
		{
			value: 'male',
			label: 'Male'
		},
		{
			value: 'female',
			label: 'Female'
		},
		{
			value: 'other',
			label: 'Other'
		}
	] );
	const [error, setError] = useState([]);
	const dispatch = useDispatch();
	const submitForm = async ( e ) =>
	{
		if(e.password?.trim() !== e.password_cf?.trim()) {
			message.error('Password does not match');
		}
		dispatch(toggleShowLoading(true));
		const result = await Auth_Service.register({...e, type:2});
		if(result?.status === 'success') {
			message.success('Register successfully!');
			window.location.href = 'login';
		} else if(result?.status === 'failed') {
			setError(result.data);
			message.error(result.message);
		} else {
			message.error(result.message);
		}
		dispatch(toggleShowLoading(false));
	}
  
	return (
		<Tab.Pane eventKey="register">
			<div className="login-form-container">
				<div className="login-register-form">
					<Form
						className='p-3'
						name='form'
						form={ form }
						onFinish={ submitForm }
						onFieldsChange={ ( e ) => onFieldsChange( e, form ) }
						validateMessages={ validateMessages }
					>
						<Form.Item name="name" label="Name"
							rules={ [ { required: true } ] }
							className=' d-block text-left' >
							<Input className=' mb-0' placeholder='Enter name' />
						</Form.Item>
						<div className="row">
							<div className= 'col-md-6'>
								<Form.Item name="username" label="User Name"
									rules={ [ { required: true } ] }
									className=' d-block'>
									<Input className=' mb-0' placeholder='Enter user name' />
								</Form.Item>
							</div>
							<div className= 'col-md-6'>
								<Form.Item name="email" label="Email"
									rules={ [ { required: true } ] }
									className=' d-block'>
									<Input  className=' mb-0' placeholder='Enter email' />
								</Form.Item>
							</div>
							<div className="col-md-6">
								<Form.Item name="password" label="Password"
									rules={ [ { required: true } ] }
									className=' d-block '>
									<Input.Password type="password" className=' mb-0' placeholder='Enter password' />
								</Form.Item>
							</div>
							<div className="col-md-6">
								<Form.Item name="password_cf" label="Password confirmed"
									rules={ [ { required: true } ] }
									className=' d-block '>
									<Input.Password type="password" className=' mb-0' placeholder='Confirm password' />
								</Form.Item>
							</div>
							<div className="col-md-6">
								<Form.Item name="phone" label="Phone"
									rules={ [ { required: true } ] }
									className=' d-block '>
									<Input className=' mb-0' placeholder='Enter phone' />
								</Form.Item>
							</div>

							{/* <div className="col-md-6">
								<Form.Item name="date" label="Phone"
									rules={ [ { required: true } ] }
									className=' d-block '>
									<Input className=' mb-0' placeholder='Enter phone' />
								</Form.Item>
							</div>

							<div className="col-md-6">
								<Form.Item name="address" label="Address"
									className=' d-block '>
									<Input className=' mb-0' placeholder='Enter address' />
								</Form.Item>
							</div> */}
							<div className="col-md-6">
								<Form.Item name="gender" label="Gender"
									rules={ [ { required: true } ] } className='d-block'>
									<Select
										placeholder="Select gender"
										style={ { width: '100%' } }
										options={ genderConfig }
									/>
								</Form.Item>
							</div>
						</div>

						<div className='button-box d-flex'>
							<button type="submit" className="mx-auto" style={ { padding: '15px 25px', fontSize: "16px", borderRadius: "10px" } }>
								Register
							</button>
						</div>
					</Form>
				</div>
			</div>
		</Tab.Pane>
	);
}