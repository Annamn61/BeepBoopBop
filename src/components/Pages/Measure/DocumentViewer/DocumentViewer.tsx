import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import useMeasureStore from '../../../../store/MeasureStore';
import Breadcrumbs from '../../../Accessories/Breadcrumbs/Breadcrumbs';
import ParsedFileViewer from '../../Parser/ParsedFileViewer/ParsedFileViewer';
import { getParsedBill } from '../../Parser/helpers';
import { useEffect, useState } from 'react';
import { ParsedBill } from '../../Parser/Types';
import ViewInOlisButton from '../../../Accessories/ViewInOlisButton/ViewInOlisButton';
import CircularProgress from '@mui/material/CircularProgress';

const DocumentViewer = () => {
  const [parsedFile, setParsedFile] = useState<ParsedBill>();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const measureId = params.id;
  const documentName = params.name;
  console.log('mID', measureId, documentName);

  const { getMeasureById } = useMeasureStore();
  const measure = getMeasureById(measureId);

  if (!measureId || !measure) {
    return null;
  }

  const { MeasureDocuments } = measure;

  const currentDoc = MeasureDocuments.find(
    (doc) => doc.VersionDescription === documentName
  );

  const getParsedFile = async () => {
    if (currentDoc) {
      const introBill = await getParsedBill(currentDoc.DocumentUrl);
      setLoading(false);
      setParsedFile(introBill);
    }
  };

  useEffect(() => {
    setLoading(true);
    getParsedFile();
  }, [currentDoc]);

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
