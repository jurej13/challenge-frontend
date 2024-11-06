import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import useFilesData from "../hooks/useFilesData.hook"

const TestComponent = () => {
	const { data, loading, error, setSearchTerm } = useFilesData()
	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm)
	}
	return (
		<>
			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			<button onClick={() => handleSearch("test1")}>Search for test1</button>
			{data &&
				data.map((item, index) => (
					<div key={index}>
						<p>{item.fileName}</p>
						<p>{item.text}</p>
						<p>{item.number}</p>
						<p>{item.hex}</p>
					</div>
				))}
		</>
	)
}

describe("useFilesData", () => {
	beforeEach(() => {
		global.fetch = jest.fn()
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should initially display "Loading...".', () => {
		render(<TestComponent />)

		expect(screen.getByText("Loading...")).toBeInTheDocument()
	})

	it("should return the data correctly when fetch is successful.", async () => {
		const mockData = [
			{
				file: "test.txt",
				lines: [
					{ text: "line 1", number: 123, hex: "abc123" },
					{ text: "line 2", number: 456, hex: "def456" },
				],
			},
		]

		fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockData,
		})

		render(<TestComponent />)

		await waitFor(() =>
			expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
		)

		const fileNames = screen.getAllByText("test.txt")
		expect(fileNames.length).toBe(2)
		expect(fileNames[0]).toBeInTheDocument()
		expect(fileNames[1]).toBeInTheDocument()

		expect(screen.getByText("line 1")).toBeInTheDocument()
		expect(screen.getByText("123")).toBeInTheDocument()
		expect(screen.getByText("abc123")).toBeInTheDocument()
		expect(screen.getByText("line 2")).toBeInTheDocument()
		expect(screen.getByText("456")).toBeInTheDocument()
		expect(screen.getByText("def456")).toBeInTheDocument()
	})
	it("should update data when search term is changed.", async () => {
		const mockData = [
			{
				file: "test1.txt",
				lines: [{ text: "line 1", number: 123, hex: "abc123" }],
			},
		]

		fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockData,
		})

		render(<TestComponent />)

		fireEvent.click(screen.getByText("Search for test1"))

		await waitFor(() =>
			expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
		)

		const fileName = screen.getByText("test1.txt")
		expect(fileName).toBeInTheDocument()
		expect(screen.getByText("line 1")).toBeInTheDocument()
		expect(screen.getByText("123")).toBeInTheDocument()
		expect(screen.getByText("abc123")).toBeInTheDocument()
	})
	it("should display an error message when fetch fails.", async () => {
		fetch.mockRejectedValueOnce(new Error("Network Error"))

		render(<TestComponent />)

		expect(await screen.findByText("Network Error")).toBeInTheDocument()

		expect(screen.queryByText("test.txt")).not.toBeInTheDocument()
	})
})
