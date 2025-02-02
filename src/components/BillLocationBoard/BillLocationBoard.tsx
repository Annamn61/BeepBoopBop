import { useEffect, useState } from 'react';
import { fetchMeasures } from '../../utils/ODataRquests';
import './BillLocationBoard.css'
import { possibleLocation } from './BillLocationBoard.data'
import { findMeasureByNumber } from '../../data/measureData';

const convertGivenLocationToLocationColumn = (location: string) => {
    if(location === 'In House Committee' || location === 'In Senate Committee') {
        return 'In Committee'
    }
    return 'Error'
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
                    
                    {billsInLocations[location].map(bill => {                       
                        const position = findMeasureByNumber(bill.value[0].MeasureNumber)?.position;
                        const measureDocURL = bill.value[0].MeasureDocuments[0].DocumentUrl;

                        return (
                        <a className='bill' href={measureDocURL} target='_blank'>
                            <div className="bill-title">
                                {bill.value[0].RelatingTo}
                            </div>
                            <div className="bill-additonal-info">
                                <div className="bill-position">
                                    {position === 'Support' ? '🌍' : '🚨'}
                                </div>
                                <div className={`bill-number ${position === 'Support' ? 'bill-number-green' : 'bill-number-orange'}`} >
                                    {`${bill.value[0].MeasurePrefix} ${bill.value[0].MeasureNumber}`}
                                </div>
                            </div>
                        </a>
                    )})}
                    </div>
                </div>)
            })}
        </div>
    )
}