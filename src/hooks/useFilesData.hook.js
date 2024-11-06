import { useCallback, useEffect, useState } from "react"

const useFilesData = (initialSearchTerm = "") => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
	const getFilesData = async () => {
		try {
			const response = await fetch(
				`http://localhost:3200/files/data${
					searchTerm ? `?fileName=${searchTerm}` : ""
				}`
			)
			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`)
			}
			const result = await response.json()
			const formattedData = result.flatMap((file) =>
				file.lines.map((line) => ({
					fileName: file.file,
					text: line.text,
					number: line.number,
					hex: line.hex,
				}))
			)
			setData(formattedData)
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}
	const getFilesList = useCallback(async () => {
		try {
			setLoading(true)
			const response = await fetch(`http://localhost:3200/files/list`)
			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`)
			}
			const result = await response.json()
			return result
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}, [])
	useEffect(() => {
		getFilesData()
	}, [searchTerm])
	return { data, loading, error, getFilesList, setSearchTerm, searchTerm }
}

export default useFilesData
