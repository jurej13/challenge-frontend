import PropTypes from "prop-types"
import { Button, Dropdown } from "react-bootstrap"

export const DropdownComponent = ({ options, onSelect, searchTerm }) => {
	return (
		<section className='d-flex gap-3 align-items-center'>
			<Dropdown
				onSelect={(eventKey) => {
					onSelect(eventKey)
				}}
			>
				<Dropdown.Toggle variant='success' id='dropdown-basic'>
					Select a File
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{options &&
						options.map((file, index) => (
							<Dropdown.Item key={index} eventKey={file}>
								{file}
							</Dropdown.Item>
						))}
				</Dropdown.Menu>
			</Dropdown>
			{searchTerm && (
				<Button variant='outline-danger' onClick={() => onSelect("")}>
					Clear
				</Button>
			)}
		</section>
	)
}

DropdownComponent.propTypes = {
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	onSelect: PropTypes.func.isRequired,
}
