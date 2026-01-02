import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import useCommitteeAgendaStore from '../../../store/CommitteeAgendaStore';
import useCommitteeStore from '../../../store/CommitteeStore';
import useHistoryStore from '../../../store/HistoryStore';
import useLegislatorStore from '../../../store/LegislatorStore';
import useMeasureStore from '../../../store/MeasureStore';
import { getShortFormatDateWithTime } from '../../../utils/time';
import HistoryItemLine from '../../Accessories/HistoryItemLine/HistoryItemLine';
import MeasurePill from '../../Accessories/MeasurePill/MeasurePill';
import SendEmailButton from '../../Accessories/SendEmailButton/SendEmailButton';
import ViewInOlisButton from '../../Accessories/ViewInOlisButton/ViewInOlisButton';
import { styles } from './Measure.styles';
import { useUserStore } from '../../../store/UserStore';
import PartyAffiliationBadge from '../../Accessories/PartyAffiliationBadge/PartyAffiliationBadge';

const Measure = ({
  measureModalId,
  onModalClose,
}: {
  measureModalId?: string;
  onModalClose?: () => void;
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const measureId = measureModalId || params.id;
  const {
    getMeasureById,
    getMeasureUrlById,
    getSortedMeasureSponsorsById,
    getSortedMeasureChiefSponsorsById,
  } = useMeasureStore();
  const { getUpdatesById } = useHistoryStore();
  const { getUpcomingAgendaItemsById } = useCommitteeAgendaStore();
  const { getFullCommitteeNameByCode } = useCommitteeStore();
  const {
    getFullLegislatorNameByCodeWithTitle,
    getEmailByLegislatorCode,
    getWebsiteByLegislatorCode,
    getLegislatorPartyByCode,
  } = useLegislatorStore();
  const measure = getMeasureById(measureId);
  const measureNickname = useUserStore
    .getState()
    .getUserMeasureNicknameById(measureId);
  const agendaItems = getUpcomingAgendaItemsById(measureId);
  const sponsors = getSortedMeasureSponsorsById(measureId);
  const chiefSponsors = getSortedMeasureChiefSponsorsById(measureId);
  const isOnModal = !!measureModalId;
  if (!measureId || !measure) {
    return null;
  }

  const { RelatingTo, CatchLine, MeasureDocuments, CurrentLocation } = measure;

  const allSponsorEmails = [
    ...chiefSponsors.map((s) => getEmailByLegislatorCode(s.LegislatoreCode)),
    ...sponsors.map((s) => getEmailByLegislatorCode(s.LegislatoreCode)),
  ].filter((email) => email !== undefined) as string[];

  return (
    <>
      <Box sx={styles.modalContent}>
        <Box sx={styles.header}>
          <MeasurePill id={measureId} withModal={false} />
          <Box sx={styles.headerButtons}>
            <ViewInOlisButton url={getMeasureUrlById(measureId)} />
            {isOnModal && (
              <IconButton
                sx={styles.headerButton}
                onClick={() => {
                  onModalClose?.();
                  navigate(`/bill/${measureId}`);
                }}
              >
                <OpenInFullRoundedIcon />
              </IconButton>
            )}
          </Box>
        </Box>
        <Typography variant="h1" sx={styles.title}>
          {measureNickname || CatchLine}
        </Typography>
        {measureNickname && (
          <Typography variant="subtitle2">{CatchLine}</Typography>
        )}
        <Box sx={styles.measureDocumentSection}>
          <Typography variant="h3">Measure Documents</Typography>
          <Box sx={styles.documentsContainer}>
            {MeasureDocuments.map((doc) => (
              <Link
                role="button"
                sx={styles.measureDocument}
                href={`/#/bill/${measureId}/document/${doc.VersionDescription}`}
                key={doc.DocumentUrl}
                onClick={() => {
                  onModalClose?.();
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
                  {doc.VersionDescription}
                </Typography>
              </Link>
            ))}
          </Box>
        </Box>
        {/* <Box sx={{ ...styles.quicklook, ...(styles.infoSection as any) }}>
          <Typography variant="h3">Quicklook</Typography>
        </Box> */}
        <Box sx={styles.infoSection}>
          <Typography variant="h3">Upcoming Events</Typography>
          {!!agendaItems.length ? (
            agendaItems.map((item) => (
              <Box sx={styles.lineItem} key={item.CommitteeAgendaItemId}>
                <Typography variant="subtitle2">
                  {getShortFormatDateWithTime(new Date(item.MeetingDate))}
                </Typography>
                <Typography variant="body1">{item.MeetingType}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="subtitle2">No Upcoming Events</Typography>
          )}
        </Box>
        <Box sx={{ ...styles.history, ...(styles.infoSection as any) }}>
          <Typography variant="h3">History</Typography>
          <Box sx={styles.historyItemsContainer}>
            {getUpdatesById(measureId).map((updateItem) => (
              <HistoryItemLine
                selected={false}
                toggleSelected={() => console.log('TODO: IMPLEMENT')}
                key={updateItem.Key}
                updateItem={updateItem}
                variant="light"
              />
            ))}
          </Box>
        </Box>
        <Box sx={styles.infoSection}>
          <Typography variant="h3">Summary</Typography>
          {/* <Box sx={styles.lineItem}>
              <Typography variant="subtitle2">Catchline</Typography>
              <Typography variant="body1">{CatchLine}</Typography>
            </Box> */}
          <Box sx={styles.lineItem}>
            <Typography variant="subtitle2">Relating to</Typography>
            <Typography variant="body1">{RelatingTo}</Typography>
          </Box>
          <Box sx={styles.lineItem}>
            <Typography variant="subtitle2">Location</Typography>
            <Typography variant="body1">
              {`${CurrentLocation} | ${getFullCommitteeNameByCode(
                measure?.CurrentCommitteeCode
              )}`}
            </Typography>
          </Box>
          <Box sx={styles.lineItem}>
            <Typography sx={{ maxWidth: '100px' }} variant="subtitle2">
              Chief Sponsors
            </Typography>
            <Typography variant="body1">
              {chiefSponsors.map((s) => (
                <>
                  <Link
                    href={getWebsiteByLegislatorCode(s.LegislatoreCode)}
                    target="_blank"
                    key={s.LegislatoreCode}
                    sx={styles.hyperlink}
                  >
                    {getFullLegislatorNameByCodeWithTitle(s.LegislatoreCode)}
                  </Link>
                  <br />
                </>
              ))}
            </Typography>
          </Box>
          <Box sx={styles.lineItem}>
            <Typography variant="subtitle2">Sponsors</Typography>
            <Typography variant="body1">
              {sponsors.map((s) => {
                const party = getLegislatorPartyByCode(s.LegislatoreCode);

                return (
                  <Box
                    key={s.LegislatoreCode}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    {party && (
                      <PartyAffiliationBadge
                        isCircleBadge={true}
                        parties={[party]}
                      />
                    )}
                    <Link
                      href={getWebsiteByLegislatorCode(s.LegislatoreCode)}
                      target="_blank"
                      sx={styles.hyperlink}
                    >
                      {getFullLegislatorNameByCodeWithTitle(s.LegislatoreCode)}
                    </Link>
                  </Box>
                );
              })}
            </Typography>
          </Box>
          <Box sx={styles.lineItemButton}>
            <Typography sx={{ maxWidth: '100px' }} variant="subtitle2">
              Contact Sponsors
            </Typography>
            <SendEmailButton
              emails={allSponsorEmails}
              buttonText="Send Email To All Sponsors"
            />
            {/* <ExportContactsButton
              legislatorCodes={allSponsorCodes}
              buttonText="Export Contacts"
            /> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Measure;
