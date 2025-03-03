import { administrativeKanban, chamberKanban, notPassedKanban, passedKanban } from "../../../../types/KanbanTypes";
import { Measure } from "../../../../types/MeasureTypes";

const chamberOptions = [
    "In House Committee",
    "In House Committee Awaiting transfer to Desk",
    "In Senate Committee",
    "In Senate Committee Awaiting transfer to Desk",
    "Senate Desk - Awaiting Second Reading",
]

const failedOptions = [
    "Senate - Tabled",
    "Senate Desk - Failed",
    "House Desk - Failed",
    "At House Desk Upon Adjournment",
"At Senate Desk Upon Adjournment",
"At Speakers Desk Upon Adjournment",
]

const administrativeChecks = [
    "Governors Office - Awaiting Signature",
    "Senate Presidents Desk - Awaiting Signature",
    "Speakers Desk - Awaiting Signature",
]

const passedOptions = [
    "Filed with Secretary of State",
    "Secretary of States Office - Chapter Number Assignment",
    "Chapter Number Assigned",
]

export type KanbanLocation = chamberKanban | administrativeKanban | passedKanban | notPassedKanban;

export const errorColumn = [
    {group: 'Sorting Errors', data: [
        {section: 'Uncategorized Bills'},
    ]},
]

export const renderedKanbanLocations = [
        {group: 'First Chamber', data: [
            {section: 'Committee', data: [
                {status:'In Committee', data: [
                    'In House Committee', 'In Senate Committee'
                ]},
                {status: 'Awaiting Transfer to Desk', data: [
                    'In House Committee', 'In Senate Committee'
                ]},
            ]},
            {section:'Floor', data: [
                {status:'Awaiting First Reading', data: [
                    'In House', 'In Senate'
                ]},
                {status:'Awaiting Second Reading', data: [
                    'In House', 'In Senate'
                ]}
            ]},
        ]},
        {group: 'Second Chamber', data: [
            {section:'Committee', data: [
                {status:'In Committee', data: [
                    'In House Committee', 'In Senate Committee'
                ]},
                {status:'Awaiting Transfer to Desk', data: [
                    'In House Committee', 'In Senate Committee'
                ]},
            ]},
            {section:'Floor', data: [
                {status:'Awaiting First Reading', data: [
                    'In House', 'In Senate'
                ]},
                {status:'Awaiting Second Reading', data: [
                    'In House', 'In Senate'
                ]}
            ]},
        ]},
        {group: 'Administrative Checks', data: [
            {section: 'Awaiting Signature', data: [
                {status: 'Governors Office', data: [""]},
                {status: 'Chamber', data: [
                    "Senate President Desk",
                    "Speakers Desk"
                ]}
            ]},
        ]},
        {group: 'Passed', data: [
            {section: 'Passed', data: [
                {status: 'Filed with Secretary of State', data: [""]},
                {status: 'Awaiting Chapter Number', data: [""]},
                {status: 'Chapter Number Assigned', data: [""]},
            ]},
        ]},
        {group: 'Not Passed', data: [
            {section: 'Not Passed', data: [
                {status: 'Failed', data: [
                    "At House Desk",
                    "At Senate Desk"
                ]},
                {status: 'Tabled', data: [
                    "In Senate",
                    "In House"
                ]},
                {status: 'At Desk Upon Adjourment', data: [
                    "At House Speakers Desk", 
                    "At Senate Desk", 
                    "At House Desk"
                ]},
            ]},
        ]},
    ]

export const getKanbanLocationFromBilLocation = (location: string, xxx: Measure["MeasurePrefix"]) => {
    // Chambers
    if(chamberOptions.some(option => location === option)) {
        var chamberLocation = {} as chamberKanban;

        // TODO: Fix for joint Measures (HJM) + LC
        const billAndChamberMatch = (location.includes('Senate') && xxx === 'SB') || (location.includes('House') && xxx === 'HB') || (location.includes('House') && xxx === 'HJM');
        const inCommittee = location.includes('Committee');

        chamberLocation.group = billAndChamberMatch ? 'First Chamber' : 'Second Chamber'
        chamberLocation.section = inCommittee ? 'Committee' : 'Floor'
        chamberLocation.status = location.includes('Awaiting Transfer') ?'Awaiting Transfer to desk' : 'In Committee'
        if(inCommittee) {
            chamberLocation.sublocation = location.includes('Senate') ? 'In Senate Committee' : 'In House Committee';
        } else {
            chamberLocation.sublocation = location.includes('Senate') ? 'On Senate Floor' : 'On House Floor';
        }
        return chamberLocation;
    }
    // Administrative Actions
    if(administrativeChecks.some(option => location === option)) {
        var adminLocation = {} as administrativeKanban;
        adminLocation.group = 'Administrative Checks'
        adminLocation.section = 'Awaiting Signature'
        if(location.includes('Governors')) {
            adminLocation.status = 'Governors Office'
            adminLocation.sublocation = '';
        } else {
            adminLocation.status = 'Chamber'
            adminLocation.sublocation = location.includes('Speaker') ? "Speakers Desk" : "Senate President Desk"
        }
        return adminLocation;
    }

    // Passed
    if(passedOptions.some(option => location === option)) {
        var passedLocation = {} as passedKanban;
        passedLocation.group = 'Passed';
        passedLocation.section = 'Passed';
        if(location.includes('filed')) {
            passedLocation.status = 'Filed with Secretary of State'
        } else if(location = 'Chapter Number Assigned') {
            passedLocation.status = 'Chapter Number Assigned'
        } else {
            passedLocation.status = 'Awaiting Chapter Number'
        }
        passedLocation.sublocation = '';
        return passedLocation;
    }

    // Failed
    if(failedOptions.some(option => location === option)) {
        var failedLocation = {} as notPassedKanban;
        failedLocation.group = 'Not Passed';
        failedLocation.section = 'Not Passed';
        if(location.includes('tabled')) {
            failedLocation.status = 'Tabled'
            failedLocation.sublocation = location.includes('senate') ? 'In Senate' : 'In House'
        } else if(location.includes('failed')) {
            failedLocation.status = 'Failed';
            failedLocation.sublocation = location.includes('senate') ? 'At Senate Desk' : 'At House Desk'
        } else {
            failedLocation.status = 'At Desk Upon Adjourment'
            if(location === 'At House Desk Upon Adjournment') failedLocation.sublocation = 'At House Desk'
            if(location === 'At Senate Desk Upon Adjournment') failedLocation.sublocation = 'At Senate Desk'
            if(location === 'At Speakers Desk Upon Adjournment') failedLocation.sublocation = 'At House Speakers Desk'
        }

    }


    // Errors
    return {
        group: 'Sorting Errors',
        status: location,
        section: "Uncategorized Bills",
        sublocation: 'uncategorized',
    }
}