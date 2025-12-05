export interface passedKanban {
    group: 'Passed'
    section: 'Passed'
    status: 'Filed with Secretary of State' | 'Awaiting Chapter Number' | 'Chapter Number Assigned'
    sublocation: ''
}

export interface notPassedKanban {
    group: 'Not Passed'
    section: 'Not Passed'
    status: 'Failed' | 'Tabled' | 'At Desk Upon Adjourment' | 'In Committee Upon Adjourment'
    sublocation: 'In Senate' | 'In House' | 'At House Speakers Desk' | 'At Senate Desk' | 'At House Desk' | 'In Senate Committee' | 'In House Committee'
}

export interface administrativeKanban {
    group:  'Administrative Checks'
    section:  'Awaiting Signature'
    status: "Governors Office" | "Chamber"
    sublocation: "Senate President Desk" | "Speakers Desk" | ''
}

export interface chamberKanban {
    group: 'First Chamber' | 'Second Chamber',
    section: 'Committee' | 'Floor',
    status: 'In Committee' | 'Awaiting Transfer to desk'
    sublocation: 'In House Committee' | 'In Senate Committee' | 'On House Floor' | 'On Senate Floor'
}