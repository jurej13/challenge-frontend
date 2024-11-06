import { TableComponent } from "../components/Table.component"
import useFilesData from "../hooks/useFilesData.hook"

export const Dashboard = () => {
	const { data, loading, error } = useFilesData()

	return loading ? (
		<p>Loading...</p>
	) : error ? (
		<p>{error}</p>
	) : (
		<TableComponent data={data} />
	)
}
