import Button from '@mui/material/Button';
import useMeasureStore from '../../../store/MeasureStore';
import './BillCard.css';
import { useState } from 'react';
import MeasureModal from '../../Accessories/MeasureModal/MeasureModal';

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
          borderLeft: `6px solid ${measureColor}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          backgroundColor: '#fff',
          '&:hover': {
            outline: '2px solid #aaa',
            borderColor: measureColor,
          },
          '&:focus': {
            outline: '2px solid #aaa',
          },
        }}
        className="bill"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        //   href={measureDocURL}
        //   target="_blank"
        key={billId}
      >
        <div className="bill-title">{billTitle}</div>
        {committeeCode && <div className="bill-committee">{committeeCode}</div>}
        <div className="bill-additonal-info">
          <div className="bill-position">
            {position === 'Support' ? '🌍' : '🚨'}
          </div>
          <div
            className={`bill-number ${
              position === 'Support'
                ? 'bill-number-green'
                : 'bill-number-orange'
            }`}
          >
            {billId}
          </div>
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
