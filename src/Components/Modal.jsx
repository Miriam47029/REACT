import React from 'react'

const Modal = ({ title, modal, children }) => (
	<div className="modal fade" id={modal} tabIndex="-1" aria-labelledby={`${modal}Label`} aria-hidden="true">
	  <div className="modal-dialog">
		<div className="modal-content">
		  <div className="modal-header">
			<h5 className="modal-title" id={`${modal}Label`}>{title}</h5>
			<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		  </div>
		  <div className="modal-body">
			{children}
		  </div>
		</div>
	  </div>
	</div>
  );
  
  

export default Modal
