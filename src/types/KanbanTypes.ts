export interface passedKanban {
    group: 'Passed'
    section: ''
    status: ''
    sublocation: ''
}

export interface notPassedKanban {
    group: 'Not Passed'
    section: ''
    status: ''
    sublocation: ''
}

export interface administrativeKanban {
    group:  'Administrative Checks'
    section:  'Awaiting Signature'
    status: "Governors Office" | "Chamber"
    sublocation: "Senate President Desk" | "Speakers Desk"
}

export interface chamberKanban {
    group: 'First Chamber' | 'Second Chamber',
    section: 'Committee' | 'Floor',
    status: 'In Committee' | 'Awaiting Transfer to desk'
    sublocation: 'In House Committee' | 'In Senate Committee' | 'On House Floor' | 'On Senate Floor'
}