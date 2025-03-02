import { CommitteeMeeting } from "../types/CommitteeMeetingsTypes";
import { getYYYYMMDDHHString } from "./time";

export const getCommitteeMeetingURL = (committeeMeeting: CommitteeMeeting) => {
    const { SessionKey, CommitteeCode, MeetingDate } = committeeMeeting;

    const dateString = getYYYYMMDDHHString(new Date(MeetingDate))

    return `https://olis.oregonlegislature.gov/liz/${SessionKey}/Committees/${CommitteeCode}/${dateString}/Agenda`
}