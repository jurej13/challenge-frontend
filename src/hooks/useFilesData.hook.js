import { useEffect, useState } from "react"

const useFilesData = () => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const getFilesData = async () => {
		try {
			const response = await fetch("http://localhost:3200/files/data")
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
	useEffect(() => {
		getFilesData()
	}, [])
	return { data, loading, error }
}

export default useFilesData
