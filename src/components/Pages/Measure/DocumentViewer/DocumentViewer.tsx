import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import useMeasureStore from '../../../../store/MeasureStore';
import Breadcrumbs from '../../../Accessories/Breadcrumbs/Breadcrumbs';
import ParsedFileViewer from '../../Parser/ParsedFileViewer/ParsedFileViewer';
import { getParsedBill, getParsedInstructionsNEW } from '../../Parser/helpers';
import { useEffect, useState } from 'react';
import { ParsedBill } from '../../Parser/Types';
import ViewInOlisButton from '../../../Accessories/ViewInOlisButton/ViewInOlisButton';
import CircularProgress from '@mui/material/CircularProgress';
import { Switch, FormControlLabel } from '@mui/material';
import FF from '../../../Things/FF/FF';
import { applyInstructions } from '../../Parser/applyInstructions';
// import { getParsedInstructions } from '../../Parser/HELPERS_COPY_INCASE_BROKEN';

const DocumentViewer = () => {
  const [parsedFile, setParsedFile] = useState<ParsedBill>();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const measureId = params.id;
  const documentName = params.name;
  const { getMeasureById } = useMeasureStore();
  const measure = getMeasureById(measureId);
  const [applyAmendment, setApplyAmendment] = useState(false);
  // House ammendments to introduced
  const isAmendment = documentName?.includes('Amendment');
  const fileBeingAmmended = isAmendment
    ? measure?.MeasureDocuments?.find(
        (document) =>
          documentName?.includes(document.VersionDescription) &&
          documentName !== document.VersionDescription
      )
    : undefined;

  const currentDoc = measure?.MeasureDocuments?.find(
    (doc) => doc.VersionDescription === documentName
  );

  useEffect(() => {
    if (currentDoc) {
      setLoading(true);
      const getParsedFile = async () => {
        try {
          const baseFile =
            isAmendment && applyAmendment && fileBeingAmmended
              ? await getParsedBill(fileBeingAmmended.DocumentUrl)
              : await getParsedBill(currentDoc.DocumentUrl);
          const parsedInstructions = isAmendment
            ? await getParsedInstructionsNEW(currentDoc.DocumentUrl)
            : [];
          const engrossed =
            isAmendment &&
            applyInstructions(
              structuredClone(baseFile),
              structuredClone(parsedInstructions)
            );

          const fileToSet =
            isAmendment && applyAmendment && engrossed ? engrossed : baseFile;

          setParsedFile(fileToSet);
        } catch (error) {
          console.error('Error parsing file:', error);
        } finally {
          setLoading(false);
        }
      };
      getParsedFile();
    }
  }, [currentDoc, applyAmendment, fileBeingAmmended, isAmendment]);

  if (!measureId || !measure || !currentDoc) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Breadcrumbs
          measureId={measureId}
          pagesList={[]}
          lastPageTitle={documentName || ''}
        />
        {currentDoc?.DocumentUrl && (
          <ViewInOlisButton url={currentDoc?.DocumentUrl} />
        )}
      </Box>
      <FF value="amend">
        {documentName?.includes('Amendment') && (
          <FormControlLabel
            value="applyAmendment"
            control={
              <Switch
                checked={applyAmendment}
                onChange={(e) => setApplyAmendment(e.target.checked)}
                color="success"
              />
            }
            label="Apply Amendments"
          />
        )}
      </FF>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ParsedFileViewer bill={parsedFile} />
      )}
    </Box>
  );
};

export default DocumentViewer;
