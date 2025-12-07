import { Typography } from '@mui/material';
import { ParsedBill } from '../Types';
import { getTextStyle } from './PasedFileViewer.styles';

const ParsedFileViewer = ({ bill }: { bill?: ParsedBill }) => {
  if (!bill) return null;

  const renderLines = (bill: ParsedBill): JSX.Element[] => {
    return bill.map((page, index) => (
      <div key={index + 1}>
        {page.pre.map((line, index) => {
          let prepend = undefined;
          let text = line[0].text;
          if (text.startsWith('(') || text.startsWith('SECTION')) {
            prepend = '\t';
          }
          return (
            <Typography key={'LINE-pre-' + index}>
              {line.map((span, index) => (
                <Typography
                  component="span"
                  sx={getTextStyle(span)}
                  key={'pre-' + index}
                >
                  {prepend && index === 0 ? prepend + span.text : span.text}
                </Typography>
              ))}
            </Typography>
          );
        })}
        {page.content.map((line) => {
          let prepend = undefined;
          let editedLine = [...line];
          const first = editedLine.shift();
          if (first) {
            const tab = {
              text: '\t',
              height: first.height,
              isBold: first.isBold,
              x: first.x,
              y: first.y,
            };
            if (editedLine.length > 0) {
              let text = editedLine[0].text;
              if (text.startsWith('(') || text.startsWith('SECTION')) {
                editedLine.unshift(tab);
              }
            }
            editedLine.unshift(tab);
            editedLine.unshift(first);
          }
          return (
            <Typography key={'LINE-content-' + index}>
              {editedLine.map((span, index) => (
                <Typography
                  component="span"
                  sx={getTextStyle(span)}
                  key={'pre-' + index}
                >
                  {prepend && index === 0 ? prepend + span.text : span.text}
                </Typography>
              ))}
            </Typography>
          );
        })}
        {page.post.map((line) =>
          line.map((span, index) => (
            <Typography
              component="span"
              sx={getTextStyle(span)}
              key={'post-' + index}
            >
              {span.text}
            </Typography>
          ))
        )}
      </div>
    ));
  };

  return (
    <div
      style={{
        backgroundColor: '#f4f4f4',
        padding: 10,
        borderRadius: 5,
        fontFamily: 'Verdana',
        // fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
      }}
    >
      {bill && renderLines(bill)}
    </div>
  );
};

export default ParsedFileViewer;
