import React from 'react'

const DivAdd = ({ children}) => {
  return (
	<div className="row mt-3">
		<div className="col-md-4 offset-4">
			<div className="d-grid mx-auto">
				{children}
			</div>
		</div>
	</div>
  )
}

export default DivAdd
