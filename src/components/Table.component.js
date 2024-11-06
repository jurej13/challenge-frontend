import PropTypes from "prop-types"
import { Table } from "react-bootstrap"

export const TableComponent = ({ data }) => {
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>File Name</th>
					<th>Text</th>
					<th>Number</th>
					<th>Hex</th>
				</tr>
			</thead>
			<tbody>
				{data &&
					data.map((item, index) => (
						<tr key={index}>
							<td>{item.fileName}</td>
							<td>{item.text}</td>
							<td>{item.number}</td>
							<td>{item.hex}</td>
						</tr>
					))}
			</tbody>
		</Table>
	)
}

TableComponent.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			fileName: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			number: PropTypes.number.isRequired,
			hex: PropTypes.string.isRequired,
		})
	).isRequired,
}
