import './BillLocationBoard.css'
import { possibleLocation } from './BillLocationBoard.data'

export const BillLocationBoard = () => {
    return (
        <div className="container">
            {possibleLocation.map((location) => (
                <div className="section">
                    <div className="section-title">{location}</div>
                    Bill 2
                </div>
            ))}
        </div>
    )
}