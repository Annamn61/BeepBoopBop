import * as pdfjs from 'pdfjs-dist/build/pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
// import { useState } from 'react';
// import { ParsedBill } from './Types';
// import { applyInstructions } from './applyInstructions';
// import { getParsedBill, getParsedInstructions } from './helpers';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function ThreeVersionBillViewer(): JSX.Element {
  //   const [introducedFile, setIntroducedFile] = useState<File | null>(null);
  //   const [amendmentsFile, setAmendmentsFile] = useState<File | null>(null);
  //   const [introducedBill, setIntroducedBill] = useState<ParsedBill>();
  //   //   const [amendmentBill, setAmendmentBill] = useState<TextLine[]>([]);
  //   const [engrossedBill, setEngrossedBill] = useState<ParsedBill>([]);

  //   const handleBuild = async (): Promise<void> => {
  //     if (!introducedFile || !amendmentsFile) {
  //       return;
  //     }

  //     // getParsedBill(introducedFile);
  //     const introBill = await getParsedBill(introducedFile);
  //     setIntroducedBill(introBill);
  //     const parsedInstructions = await getParsedInstructions(amendmentsFile);
  //     const engrossed = applyInstructions(
  //       structuredClone(introBill),
  //       structuredClone(parsedInstructions)
  //     );
  //     setEngrossedBill(engrossed);

  //     // setIntroducedBill(amendBill);
  //     // setAmendmentsLines(amendLines);
  //   };

  //   const renderLines = (bill: ParsedBill): JSX.Element[] => {
  //     return bill
  //       .flatMap((page) => [...page.pre, ...page.content, ...page.post])
  //       .map((line, i) => (
  //         <div key={i}>
  //           {line.map((span, j) => (
  //             <span
  //               key={j}
  //               style={{ fontWeight: span.isBold ? 'bold' : 'normal' }}
  //             >
  //               {span.text}
  //             </span>
  //           ))}
  //         </div>
  //       ));
  //   };

  return (
    <div style={{ padding: 20 }}>
      <h2>Oregon Bill Viewer - Three Versions</h2>

      {/* <div style={{ marginBottom: 10 }}>
        <p>Introduced Bill PDF:</p>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setIntroducedFile(e.target.files?.[0] || null)}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <p>Amendments PDF:</p>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setAmendmentsFile(e.target.files?.[0] || null)}
        />
      </div>

      <button
        style={{ marginTop: 20, padding: '10px 20px', fontSize: 16 }}
        onClick={handleBuild}
      >
        Build Engrossed
      </button>

      {introducedBill && (
        <div style={{ display: 'flex', marginTop: 30, gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <h3>Introduced</h3>
            <div
              style={{
                backgroundColor: '#f4f4f4',
                padding: 10,
                borderRadius: 5,
                maxHeight: '500px',
                overflowY: 'auto',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
              }}
            >
              {renderLines(introducedBill)}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h3>Amendments</h3>
            <div
              style={{
                backgroundColor: '#f4f4f4',
                padding: 10,
                borderRadius: 5,
                maxHeight: '500px',
                overflowY: 'auto',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
              }}
            >
              {renderLines(amendmentsLines)}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h3>Engrossed</h3>
            <div
              style={{
                backgroundColor: '#f4f4f4',
                padding: 10,
                borderRadius: 5,
                maxHeight: '500px',
                overflowY: 'auto',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
              }}
            >
              {renderLines(engrossedBill)}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
