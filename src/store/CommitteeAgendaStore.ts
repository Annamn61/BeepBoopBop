import { create } from 'zustand';
import { AgendaItem, CommitteeMeetingWithUserAgendaItems, TestimonyLinks } from '../types/CommitteeAgendaTypes';
import { Measure } from '../types/MeasureTypes';
import { CommitteeMeeting } from '../types/CommitteeMeetingsTypes';
import { getMeasureUniqueId } from '../utils/measure';
import committeeColors from '../utils/committeeColors';

interface CommitteeAgendaState {
  unfilteredCommitteeAgenda: AgendaItem[];
  setUnfilteredCommitteeAgenda: (agendaItems: AgendaItem[]) => void;
  getCommitteeAgendaItems: () => AgendaItem[];
  getCalendarEvents: () => { title: string; start: Date; end: Date; id: string; comments: string; color: string }[];
  getUpcomingAgendaItemsById: (id: Measure['id'] | undefined) => AgendaItem[];
  getTestimonyLinkByIdAndDate: (id: Measure['id'], date: Date) => TestimonyLinks | null;
  getCommitteeMeetingByIdAndDate: (id: Measure['id'], date: Date) => CommitteeMeeting | undefined;
  getCommitteeItemsGroupedIntoMeetings: () => CommitteeMeetingWithUserAgendaItems;
  getCommitteeMeetingWithItemsByGuid: (guid: string) => {CommitteeMeeting: CommitteeMeeting, AgendaItems: AgendaItem[]};
};

export const useCommitteeAgendaStore = create<CommitteeAgendaState>((set, get) => ({
    unfilteredCommitteeAgenda: [],
    setUnfilteredCommitteeAgenda: (agendaItems) => set({ unfilteredCommitteeAgenda: agendaItems }),
    getCommitteeAgendaItems: () => get().unfilteredCommitteeAgenda,
    getCalendarEvents: () => getCalendarEvents(get().getCommitteeItemsGroupedIntoMeetings()),
    getUpcomingAgendaItemsById: (id) => get().unfilteredCommitteeAgenda.filter(item => getMeasureUniqueId(item) === id).filter(item => new Date(item.MeetingDate) > new Date()),
    getTestimonyLinkByIdAndDate: (id, date) => getTestimonyLinksFromAgendaItem(findPublicHearingItem(get().unfilteredCommitteeAgenda, id, date)),
    getCommitteeMeetingByIdAndDate: (id, date) => findPublicHearingItem(get().unfilteredCommitteeAgenda, id, date)?.CommitteeMeeting,
    getCommitteeItemsGroupedIntoMeetings: () => groupItemsIntoMeetings(get().getCommitteeAgendaItems()),
    getCommitteeMeetingWithItemsByGuid: (guid) => (get().getCommitteeItemsGroupedIntoMeetings()[guid])
}));

const getCalendarEvents = (meetings: CommitteeMeetingWithUserAgendaItems) => {

    console.log('meetings', Object.keys(meetings));

    return Object.keys(meetings).map((key) => {
        const meeting = meetings[key].CommitteeMeeting;
        const start = new Date(meeting.MeetingDate);
        const end = new Date(start.getTime() + 90 * 1000 * 60)

        return {
            title: meeting.CommitteeCode,
            start,
            end: end,
            id: key,
            comments: 'item.Comments',
            color: committeeColors[meeting.CommitteeCode] || "#f7f7f7"
        }
    })
}

const groupItemsIntoMeetings = (items: AgendaItem[]) => {
    const meetingsWithItems: CommitteeMeetingWithUserAgendaItems = {};

    items.forEach((item) => {
        const meetingId = item.CommitteeMeeting.MeetingGuid;
        const meetingObject = meetingsWithItems[meetingId];
        if(!meetingObject) {
            meetingsWithItems[meetingId] = {
                CommitteeMeeting:  item.CommitteeMeeting,
                AgendaItems: [item]
            }
        } else {
            let newAgendaItems =  [...meetingObject.AgendaItems];
            newAgendaItems.push(item);
            meetingsWithItems[meetingId] = {
                ...meetingObject,
                AgendaItems: newAgendaItems,
            }
        }
    })

    return meetingsWithItems;
}

const findPublicHearingItem = (items: AgendaItem[], id: Measure['id'], date: Date) => {
    const item = items.find((item) => {
        const sameMeasure = getMeasureUniqueId(item) === id;
        const meetingDate = new Date(item.MeetingDate);
        const millisecondsIn5Minutes = 5 * 60 * 1000;
        const within5Minutes = Math.abs(meetingDate.getTime() - date.getTime()) < millisecondsIn5Minutes;

        return sameMeasure && within5Minutes;
    });
    return item;
}


const getTestimonyLinksFromAgendaItem = (item: AgendaItem | undefined) => {
    if(!item) {
        return null;
    }

    return {
        written: `https://olis.oregonlegislature.gov/liz/${item.SessionKey}/Testimony/${item.CommitteCode}/${item.MeasurePrefix}/${item.MeasureNumber}/0000-00-00-00-00?area=Measures`,
        inPerson: ``
    }
}

export default useCommitteeAgendaStore;