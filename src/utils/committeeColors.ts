const committeeColors: { [key: string]: string } = {
  BB: "#91F2A4",
  BM49: "#91F2B6",
  BM50: "#91F2B6",
  BM51: "#91F2B6",
  BM52: "#91F2B6",
  BM53: "#91F2B6",
  BM54: "#91F2B6",
  BM55: "#91F2B6",
  BM56: "#91F2B6",
  BM57: "#91F2B6",
  BM70: "#91F2B6",
  BM71: "#91F2B6",
  BM72: "#91F2B6",
  BM77: "#91F2B6",
  BM78: "#91F2B6",
  BM86: "#91F2B6",
  BM87: "#91F2B6",
  BM93: "#91F2B6",
  CIS: "#91ACF2",
  CRR: "#919FF2",
  EB: "#91F2A9",
  EBED: "#C591F2",
  EBGG: "#CD91F2",
  EBHS: "#E291F2",
  EBOARD: "#E3F291",
  EBPS: "#EF91F2",
  EBTR: "#F291F0",
  FSSC: "#F291ED",
  HA: "#91F2AC",
  HAGLU: "#F29F91",
  HAGLUW: "#B8F291",
  HAGNR: "#F29E91",
  HALNRW: "#B1F291",
  HANR: "#ED91F2",
  HB2021: "#91F2AE",
  HB2092: "#91F2AE",
  HB2111: "#91F2AE",
  HB2112: "#91F2AE",
  HB2122: "#91F2AE",
  HB2147: "#91F2AE",
  HB2175: "#91F2AE",
  HB2227: "#91F2AE",
  HB2233: "#91F2AE",
  HB2312: "#91F2AE",
  HB2342: "#91F2AE",
  HB2434: "#91F2AE",
  HB2453: "#91F2AE",
  HB2463: "#91F2AE",
  HB2472: "#91F2AE",
  HB2536: "#91F2AE",
  HB2604: "#91F2AE",
  HB2710: "#91F2AE",
  HB2723: "#91F2AE",
  HB2792: "#91F2AE",
  HB2823: "#91F2AE",
  HB2841: "#91F2AE",
  HB2870: "#91F2AE",
  HB2872: "#91F2AE",
  HB2896: "#91F2AE",
  HB2898: "#91F2AE",
  HB3039: "#91F2AE",
  HB3089: "#91F2AE",
  HB3099: "#91F2AE",
  HB3225: "#91F2AE",
  HB3242: "#91F2AE",
  HB3271: "#91F2AE",
  HB3280: "#91F2AE",
  HB3283: "#91F2AE",
  HB3416: "#91F2AE",
  HB3438: "#91F2AE",
  HB3452: "#91F2AE",
  HB3464: "#91F2AE",
  HBH: "#91C1F2",
  HBHHC: "#F291A3",
  HBL: "#91BBF2",
  HBLWD: "#F29F91",
  HBLWFD: "#D3F291",
  HC: "#91F2B0",
  HC1221: "#91F2B0",
  HCAS: "#DD91F2",
  HCCP: "#DB91F2",
  HCD19R: "#91C6F2",
  HCEE: "#CD91F2",
  HCOND: "#F29791",
  HCP: "#91B3F2",
  HCPGA: "#F29199",
  HCPGE: "#F29192",
  HCRED: "#F29194",
  HEC: "#91C5F2",
  HECD: "#CB91F2",
  HECDSB: "#EAF291",
  HECDT: "#F29191",
  HECFS: "#F29291",
  HECHS: "#F29691",
  HED: "#91C3F2",
  HEE: "#91C1F2",
  HEER: "#E591F2",
  HEEW: "#ED91F2",
  HEMGGV: "#C8F291",
  HENVNR: "#A9F291",
  HEPOP: "#F2B191",
  HERP: "#F291ED",
  HEW: "#91A4F2",
  HGAIT: "#F29991",
  HGAMRG: "#D5F291",
  HGG: "#91BBF2",
  HGGCP: "#F29291",
  HGL: "#91B3F2",
  HHC: "#91C0F2",
  HHC19: "#91C0F2",
  HHED: "#D391F2",
  HHEDIW: "#D0F291",
  HHEDW: "#F29E91",
  HHEWD: "#F29E91",
  HHOUS: "#F2C391",
  HHOUSH: "#ACF291",
  HHS: "#91A6F2",
  HHSWW: "#F2D391",
  HJUD: "#F091F2",
  HJUDCL: "#CEF291",
  HJUDEP: "#C5F291",
  HLC: "#91B9F2",
  HLRED: "#F29C91",
  HLU: "#919CF2",
  HLWS: "#F291D5",
  HMPL: "#F291EA",
  HNR: "#919EF2",
  HOCTF: "#F2A491",
  HRC: "#91B0F2",
  HRCLUW: "#A3F291",
  HRED: "#E391F2",
  HREDIS: "#C6F291",
  HREV: "#F291E3",
  HRP: "#919BF2",
  HRULES: "#A6F291",
  HSB: "#91B0F2",
  HSBG: "#E591F2",
  HSBTF: "#F2A991",
  HSCAIM: "#D6F291",
  HSED: "#E591F2",
  HSEI: "#ED91F2",
  HSHE: "#EB91F2",
  HSHP: "#F291E6",
  HSUBED: "#CDF291",
  HTED: "#E691F2",
  HTP: "#9197F2",
  HTRANS: "#ABF291",
  HVA: "#91ACF2",
  HVEM: "#F291EB",
  HVES: "#F291E2",
  HVET: "#F291E0",
  HVETS: "#F2C891",
  HWED: "#EB91F2",
  HWFED: "#F29B91",
  HWR: "#9291F2",
  HWREC: "#F2AC91",
  HWSUB: "#F2C691",
  HWTR: "#F291C9",
  IRR401: "#9196F2",
  IRR404: "#9196F2",
  J1SS: "#DBF291",
  J2SS: "#DBF291",
  J3SS: "#DBF291",
  JACSR: "#F2A391",
  JARDHO: "#D1F291",
  JAUD: "#E591F2",
  JBM401: "#91B6F2",
  JBM402: "#91B6F2",
  JBMARG: "#DAF291",
  JBMTES: "#BCF291",
  JBTM: "#F291F0",
  JCASA: "#F2919B",
  JCCC: "#C991F2",
  JCCR: "#E291F2",
  JCDEO: "#F29196",
  JCF: "#91C0F2",
  JCFWO: "#F2AC91",
  JCOND: "#F29B91",
  JCPAY: "#F2A991",
  JCSS: "#F291E6",
  JCSSAT: "#B8F291",
  JCSSEC: "#CDF291",
  JCSSR: "#F2C091",
  JCT: "#91A9F2",
  JCTE: "#E891F2",
  JCTOA: "#F29F91",
  JEB: "#91C3F2",
  JEBED: "#F291A7",
  JEBGG: "#F2919F",
  JEBHS: "#F29791",
  JED: "#91C0F2",
  JEHB: "#D391F2",
  JEPOP: "#F2B491",
  JFPRX: "#F2C891",
  JFSS: "#F291E2",
  JFSSC: "#F2AC91",
  JGAMRG: "#D1F291",
  JHCCR: "#F29491",
  JHCT: "#ED91F2",
  JHIT: "#F291ED",
  JI5: "#91F2BC",
  JI5B: "#91F2BC",
  JISCWF: "#BBF291",
  JJSR: "#F291DD",
  JLA: "#91B9F2",
  JLAC: "#D591F2",
  JLADMN: "#D5F291",
  JLAIMT: "#C3F291",
  JLAUD: "#F29E91",
  JLC: "#91B6F2",
  JLCC: "#D891F2",
  JLCCPR: "#C8F291",
  JLCIMT: "#C0F291",
  JLCPR: "#F2B091",
  JLPR: "#F291DE",
  JLUF: "#F291EA",
  JM91: "#91F2C3",
  JML: "#91A6F2",
  JMR: "#919CF2",
  JOCRC: "#F29F91",
  JOCSS: "#F2BB91",
  JOL: "#91A3F2",
  JOLCC: "#F29691",
  JP2SS: "#91F2C8",
  JPEA: "#DE91F2",
  JPGC: "#E591F2",
  JPS: "#9196F2",
  JRF301: "#91A7F2",
  JSAFE: "#F29291",
  JSC762: "#91ABF2",
  JSCF: "#E891F2",
  JSCVR: "#F2C591",
  JSEMI: "#F2AB91",
  JSHC: "#EB91F2",
  JSHP: "#F291E3",
  JSP: "#9196F2",
  JSPEA: "#F2A391",
  JSRED: "#F2AB91",
  JSS: "#9191F2",
  JSSCWF: "#ABF291",
  JSSS: "#F291CD",
  JSTEM: "#F2BC91",
  JTAX: "#F291E0",
  JTBHCP: "#CDF291",
  JTFACC: "#E6F291",
  JTFAI: "#F29B91",
  JTFAS: "#F2AB91",
  JTFBHA: "#E0F291",
  JTFBHW: "#BCF291",
  JTFCCB: "#E5F291",
  JTFCFR: "#C6F291",
  JTFCMC: "#D3F291",
  JTFCS: "#F2AE91",
  JTFFFW: "#B9F291",
  JTFHDC: "#DAF291",
  JTFRDE: "#C6F291",
  JTFREB: "#C9F291",
  JTFREH: "#C0F291",
  JTFRF: "#F2B191",
  JTFS: "#F291E0",
  JTFSC: "#F2AE91",
  JTFSES: "#ACF291",
  JTFST: "#F2C991",
  JTFUHC: "#BEF291",
  JTMP: "#F291DA",
  JTOAC: "#F29F91",
  JTPM: "#F291DA",
  JTPUFR: "#99F291",
  JTR: "#9191F2",
  JTSSTP: "#91F29E",
  JTUSHE: "#A6F291",
  JUG: "#91A1F2",
  JVSG: "#F291DB",
  JWM: "#9194F2",
  JWMCC: "#F2A491",
  JWMED: "#F2A991",
  JWMGG: "#F2B191",
  JWMHS: "#F2C691",
  JWMIT: "#F2C991",
  JWMNR: "#F2CE91",
  JWMPS: "#F2D391",
  JWMTR: "#F2D891",
  LAC: "#91C5F2",
  LWRK: "#F291D1",
  OCCC: "#D191F2",
  OSCF: "#F091F2",
  OTCA: "#EA91F2",
  PSS: "#9B91F2",
  SB1036: "#91F2C0",
  SB1040: "#91F2C0",
  SB108: "#91F2C0",
  SB1509: "#91F2C0",
  SB1563: "#91F2C0",
  SB19: "#91F2C0",
  SB24: "#91F2C0",
  SB244: "#91F2C0",
  SB248: "#91F2C0",
  SB274: "#91F2C0",
  SB347: "#91F2C0",
  SB413: "#91F2C0",
  SB473: "#91F2C0",
  SB600: "#91F2C0",
  SB64: "#91F2C0",
  SB673: "#91F2C0",
  SB688: "#91F2C0",
  SB729: "#91F2C0",
  SB753: "#91F2C0",
  SB767: "#91F2C0",
  SB816: "#91F2C0",
  SB93: "#91F2C0",
  SB973: "#91F2C0",
  SB998: "#91F2C0",
  SBG: "#91B1F2",
  SBGG: "#E391F2",
  SBT: "#919CF2",
  SBTED: "#F2A191",
  SBTW: "#F291D1",
  SCAMP: "#F2A491",
  SCL: "#91A7F2",
  SCOM: "#F291E8",
  SCON: "#F291E6",
  SCOND: "#F2A991",
  SCPPA: "#F2A991",
  SCR14: "#919EF2",
  SCWD: "#F291EA",
  SECBH: "#F29196",
  SED: "#91B1F2",
  SEDWD: "#F2A991",
  SEE: "#91B0F2",
  SEGG: "#E891F2",
  SENR: "#F291DE",
  SFR: "#9199F2",
  SFY: "#9491F2",
  SGAIT: "#F2AB91",
  SGGA: "#E291F2",
  SGGCP: "#F2A491",
  SGGEP: "#F2A791",
  SHC: "#91AEF2",
  SHCR: "#F291EB",
  SHCVA: "#F2A691",
  SHDEV: "#F2AE91",
  SHH: "#91A6F2",
  SHHR: "#F291E3",
  SHHS: "#F291E2",
  SHOUS: "#F2D591",
  SHPPA: "#F2B191",
  SHS: "#9194F2",
  SHSEC: "#F2A791",
  SHSMHR: "#A3F291",
  SHSRH: "#F2C591",
  SHSRHP: "#9EF291",
  SIM91: "#919CF2",
  SJ: "#91F2CD",
  SJD110: "#91A9F2",
  SJR41: "#9192F2",
  SJT: "#9291F2",
  SJUD: "#F291E2",
  SLB: "#91A9F2",
  SLOR: "#F291D1",
  SLUF: "#F291DB",
  SMH: "#919EF2",
  SNR: "#9691F2",
  SNRW: "#F291C1",
  SNRWR: "#F2E591",
  SRCED: "#F29F91",
  SRE: "#919BF2",
  SREA: "#F091F2",
  SRED: "#F291EF",
  SRULES: "#94F291",
  SSC: "#919CF2",
  SSDS: "#F291D6",
  SSHCR: "#F2BC91",
  SSSPD: "#F2CD91",
  SST: "#A191F2",
  ST: "#91F2DD",
  STEST: "#F2D691",
  STRANS: "#99F291",
  SVA: "#919BF2",
  SVEMFW: "#9EF291",
  SVEP: "#F291D5",
  SVET: "#F291CE",
  SVMA: "#F291E0",
  SWF: "#9191F2",
  SWGG: "#F291DE",
  SWRR: "#F291BB",
  TFASC: "#F29F91",
  TFCCBP: "#DBF291",
  TFCSFL: "#C1F291",
  TFHST: "#F2C691",
  TFORS: "#F2CE91",
  TFPH: "#F291E8",
  TFPMH: "#F2B691",
  TFSBP: "#F2B691",
  TFTORT: "#91F296",
  TOA: "#91A4F2",
  WGJCD: "#F29C91",
  WGOEA: "#F2A391",
  WGREDS: "#B1F291"
};


export default committeeColors;