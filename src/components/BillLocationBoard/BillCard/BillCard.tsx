import Button from '@mui/material/Button';
import useMeasureStore from '../../../store/MeasureStore';
import './BillCard.css';
import { useState } from 'react';
import MeasureModal from '../../Accessories/MeasureModal/MeasureModal';
import Typography from '@mui/material/Typography';

interface BillProps {
  billId: string;
}

const Bill = ({ billId }: BillProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const committeeCode = useMeasureStore
    .getState()
    .getMeasureCommitteeNameById(billId);
  const position = useMeasureStore
    .getState()
    .getUserTrackedMeasurePositionById(billId);
  const measureDocURL = useMeasureStore
    .getState()
    .getMeasureDocumentUrlById(billId);
  const billTitle = useMeasureStore.getState().getMeasureTitleById(billId);
  const measureColor = useMeasureStore
    .getState()
    .getUserMeasureColorById(billId);

  return (
    <>
      <Button
        sx={{
          borderLeft: `8px solid ${measureColor}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          backgroundColor: '#fff',
          borderRadius: '6px',
          padding: 1.5,
          gap: 1.5,
          width: '100%',
          boxSizing: 'border-box',
          boxShadow: '2px 2px 4px 0px rgba(127, 127, 132, 0.2)',
          '&:hover': {
            outline: '2px solid #aaa',
            borderColor: measureColor,
          },
          '&:focus': {
            outline: '2px solid #aaa',
          },
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        key={billId}
      >
        <Typography variant="body1" className="bill-title">
          {billTitle}
        </Typography>
        {committeeCode && (
          <Typography variant="body2" className="bill-committee">
            {committeeCode}
          </Typography>
        )}
        <div className="bill-additonal-info">
          <div>{position === 'Support' ? '🌍' : '🚨'}</div>
          <Typography variant="h5">{billId}</Typography>
        </div>
      </Button>
      <MeasureModal
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        measureId={billId}
      />
    </>
  );
};

export default Bill;
