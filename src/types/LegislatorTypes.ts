export interface Legislator {
    SessionKey: string;
    LegislatorCode: string;
    FirstName: string;
    LastName: string;
    CapitolAddress: string;
    CapitolPhone: string;
    Title: string;
    Chamber: string;
    Party: 'Democrat' | 'Republican' | 'Independent' | 'Other';
    DistrictNumber: number; // Edm.Decimal
    EmailAddress: string;
    WebSiteUrl: string;
    CreatedDate: string; // ISO date string
    ModifiedDate: string | null; // ISO date string, nullable
}
