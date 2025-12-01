import { Typography } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CommiteeMeetingModal from '../../Accessories/CommiteeMeetingModal/CommiteeMeetingModal';
import useCommitteeAgendaStore from '../../../store/CommitteeAgendaStore';

const localizer = momentLocalizer(moment);

function MeetingCalendar() {
  const [open, setOpen] = useState(false);
  const { getCalendarEvents } = useCommitteeAgendaStore();

  const [meetingId, setMeetingId] = useState<string | undefined>(undefined);
  const handleOpen = (event: any) => {
    setMeetingId(event.id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Typography>
        The calendar currently shows the committe meetings with a public hearing
        or work session about bills you're tracking
      </Typography>
      <Calendar
        localizer={localizer}
        events={getCalendarEvents()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, width: '1100px' }}
        onSelectEvent={(event) => {
          handleOpen(event);
        }}
        defaultView="week"
        step={15}
        timeslots={4}
        min={moment('7 am', 'h a').toDate()}
        max={moment('6 pm', 'h a').toDate()}
        eventPropGetter={(event) => {
          const backgroundColor = event.color || 'green'; // Default color
          return {
            style: {
              backgroundColor,
              color: 'black',
              borderRadius: '4px',
              padding: '5px',
            },
          };
        }}
      />
      {meetingId && (
        <CommiteeMeetingModal
          open={open}
          onClose={handleClose}
          committeeMeetingId={meetingId}
        />
      )}
    </>
  );
}

export default MeetingCalendar;
