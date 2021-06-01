interface CurvedEdgeProps {
  fill: string;
  scaleY?: number;
}

const CurvedEdge: React.FC<CurvedEdgeProps> = ({ fill, scaleY = 0.3 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 100"
    style={{ display: 'block' }}
  >
    <path
      fill={fill}
      fillOpacity="1"
      transform={`scale(1 ${scaleY})`}
      d="M0,96L6.2,122.7C12.3,149,25,203,37,213.3C49.2,224,62,192,74,181.3C86.2,171,98,181,111,170.7C123.1,160,135,128,148,112C160,96,172,96,185,101.3C196.9,107,209,117,222,138.7C233.8,160,246,192,258,192C270.8,192,283,160,295,170.7C307.7,181,320,235,332,240C344.6,245,357,203,369,165.3C381.5,128,394,96,406,74.7C418.5,53,431,43,443,74.7C455.4,107,468,181,480,213.3C492.3,245,505,235,517,224C529.2,213,542,203,554,176C566.2,149,578,107,591,80C603.1,53,615,43,628,69.3C640,96,652,160,665,202.7C676.9,245,689,267,702,234.7C713.8,203,726,117,738,112C750.8,107,763,181,775,181.3C787.7,181,800,107,812,80C824.6,53,837,75,849,106.7C861.5,139,874,181,886,208C898.5,235,911,245,923,256C935.4,267,948,277,960,256C972.3,235,985,181,997,138.7C1009.2,96,1022,64,1034,80C1046.2,96,1058,160,1071,176C1083.1,192,1095,160,1108,144C1120,128,1132,128,1145,122.7C1156.9,117,1169,107,1182,128C1193.8,149,1206,203,1218,202.7C1230.8,203,1243,149,1255,117.3C1267.7,85,1280,75,1292,106.7C1304.6,139,1317,213,1329,208C1341.5,203,1354,117,1366,74.7C1378.5,32,1391,32,1403,53.3C1415.4,75,1428,117,1434,138.7L1440,160L1440,0L1433.8,0C1427.7,0,1415,0,1403,0C1390.8,0,1378,0,1366,0C1353.8,0,1342,0,1329,0C1316.9,0,1305,0,1292,0C1280,0,1268,0,1255,0C1243.1,0,1231,0,1218,0C1206.2,0,1194,0,1182,0C1169.2,0,1157,0,1145,0C1132.3,0,1120,0,1108,0C1095.4,0,1083,0,1071,0C1058.5,0,1046,0,1034,0C1021.5,0,1009,0,997,0C984.6,0,972,0,960,0C947.7,0,935,0,923,0C910.8,0,898,0,886,0C873.8,0,862,0,849,0C836.9,0,825,0,812,0C800,0,788,0,775,0C763.1,0,751,0,738,0C726.2,0,714,0,702,0C689.2,0,677,0,665,0C652.3,0,640,0,628,0C615.4,0,603,0,591,0C578.5,0,566,0,554,0C541.5,0,529,0,517,0C504.6,0,492,0,480,0C467.7,0,455,0,443,0C430.8,0,418,0,406,0C393.8,0,382,0,369,0C356.9,0,345,0,332,0C320,0,308,0,295,0C283.1,0,271,0,258,0C246.2,0,234,0,222,0C209.2,0,197,0,185,0C172.3,0,160,0,148,0C135.4,0,123,0,111,0C98.5,0,86,0,74,0C61.5,0,49,0,37,0C24.6,0,12,0,6,0L0,0Z"
    />
  </svg>
);

export default CurvedEdge;