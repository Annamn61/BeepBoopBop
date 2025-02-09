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
                {status: 'Governors Office', data: []},
                {status: 'Chamber', data: [
                    "Senate President Desk",
                    "Speakers Desk"
                ]}
            ]},
        ]},
    ]

interface passedKanban {
    group: 'Passed'
    section: ''
    status: ''
    sublocation: ''
}

interface notPassedKanban {
    group: 'Not Passed'
    section: ''
    status: ''
    sublocation: ''
}

interface administrativeKanban {
    group:  'Administrative Checks'
    section:  'Awaiting Signature'
    status: "Governors Office" | "Chamber"
    sublocation: "Senate President Desk" | "Speakers Desk"
}

interface chamberKanban {
    group: 'First Chamber' | 'Second Chamber',
    section: 'Committee' | 'Floor',
    status: 'In Committee' | 'Awaiting Transfer to desk'
    sublocation: 'In House Committee' | 'In Senate Committee' | 'On House Floor' | 'On Senate Floor'
}

export const getKanbanLocationFromBilLocation = (location: string, xxx: 'SB' | 'HB') => {
    // Chambers
    if(chamberOptions.some(option => location === option)) {
        var chamberLocation = {} as chamberKanban;

        // TODO: Fix for joint Measures (HJM)
        const billAndChamberMatch = (location.includes('Senate') && xxx === 'SB') || (location.includes('House') && xxx === 'HB');
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
        } else {
            adminLocation.status = 'Chamber'
            adminLocation.sublocation = location.includes('Speaker') ? "Speakers Desk" : "Senate President Desk"
        }
        return adminLocation;
    }
    // Passed

    // Failed
    return {
        group: '',
        sublocation: '',
        status: '',
        section: '',
    }
}