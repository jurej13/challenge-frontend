import { useEffect, useRef, useState } from "react"
import { DropdownComponent } from "../components/Dropdown.component"
import { TableComponent } from "../components/Table.component"
import useFilesData from "../hooks/useFilesData.hook"
import { SpinnerComponent } from "../components/Spinner.component"

export const Dashboard = () => {
	const { data, loading, error, getFilesList, setSearchTerm, searchTerm } =
		useFilesData()
	const [options, setOptions] = useState([])

	const handleSelect = (file) => {
		setSearchTerm(file)
	}

	useEffect(() => {
		const fetchOptions = async () => {
			const fileList = await getFilesList()
			setOptions(fileList || [])
		}
		fetchOptions()
	}, [getFilesList])

	return loading ? (
		<SpinnerComponent />
	) : error ? (
		<p>{error}</p>
	) : (
		<section className='d-flex flex-column gap-3 p-3 '>
			<h1>Dashboard</h1>
			{options && (
				<DropdownComponent
					options={options}
					onSelect={handleSelect}
					searchTerm={searchTerm}
				/>
			)}
			{data ? <TableComponent data={data} /> : <SpinnerComponent />}
		</section>
	)
}
