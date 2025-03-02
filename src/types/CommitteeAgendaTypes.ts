import { CommitteeMeeting } from "./CommitteeMeetingsTypes";

export interface AgendaItem {
  Action: string;
  BoardName: string;
  Comments: string;
  CommitteCode: string;
  CommitteeAgendaItemId: number;
  CreatedDate: string;
  CommitteeMeeting: CommitteeMeeting,
  ExecutiveAppointee: string;
  MeasureNumber: number;
  MeasurePrefix: string;
  MeetingDate: string;
  MeetingType: string;
  ModifiedDate: string;
  PrintOrder: string;
  SessionKey: string;
};

export interface TestimonyLinks {
    written: string,
    inPerson: string,
}

export interface CommitteeMeetingWithUserAgendaItems {
    [meetingId: string]: {
        CommitteeMeeting: CommitteeMeeting
        AgendaItems: AgendaItem[]
    }
}