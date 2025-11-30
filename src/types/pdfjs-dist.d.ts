declare module "pdfjs-dist/build/pdf" {
  const pdfjsLib: any;
  export = pdfjsLib;
}

declare module "pdfjs-dist/legacy/build/pdf" {
  const pdfjsLib: any;
  export = pdfjsLib;
}

declare module "pdfjs-dist/build/pdf.worker.min.js" {
  const workerSrc: any;
  export default workerSrc;
}

declare module "pdfjs-dist/legacy/build/pdf.worker.min.js" {
  const workerSrc: any;
  export default workerSrc;
}
