import { useEffect, useState } from 'react';
import { fetchMeasures } from '../../utils/ODataRquests';
import './BillLocationBoard.css'
import { possibleLocation } from './BillLocationBoard.data'
import Bill from './BillCard/BillCard';

const convertGivenLocationToLocationColumn = (location: string) => {
    return location;
    // if(location === 'In House Committee' || location === 'In Senate Committee') {
    //     return 'In Committee'
    // }
    // return 'Error'
}

export const BillLocationBoard = () => {

    const [billsInLocations, setBillsInLocations] = useState<{[key: string]: any[]}>({});

    useEffect(() => {
        let tempBillsInLocations: {[key: string]: any[]} = {}
        possibleLocation.forEach(location => (
            tempBillsInLocations[location] = []
        ))
    
        fetchMeasures().then(response => {
            response.forEach(bill => {
                if(bill?.value?.[0]) {
                    console.log('bill', bill)
                    // TODO: We should create a helper function to getCurrentLocation
                    const location = convertGivenLocationToLocationColumn(bill.value[0].CurrentLocation);
                    tempBillsInLocations[location] = [...tempBillsInLocations[location], bill]
                };
            })
            setBillsInLocations(tempBillsInLocations);
        });
    
    }, []);



    return (
        <div className="container">
            {Object.keys(billsInLocations).map((location) => {
                return (<div className="section">
                    <div className="section-title">{location}</div>
                    <div className="bill-container">
                        {billsInLocations[location].map((bill) => (<Bill bill={bill} />))}
                    </div>
                </div>)
            })}
        </div>
    )
}