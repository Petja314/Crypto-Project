import Dashboard from "./Dashboard";
import {fireEvent, getByTestId, render, screen, waitFor} from "@testing-library/react"


describe(Dashboard, () => {
    test('counter displays correct initial value', () => {
        render(<Dashboard/>)
        let dash = screen.getByRole('heading', {
            name: /🔥dashboard/i
        })
        expect(dash).toBeInTheDocument()
    })

})