import { Box } from '@mui/material';
import styled from 'styled-components';

const PointerStyledDiv = styled.div`
  position: absolute;
  width: 50px;
  height: 250px;
  left: calc(50% - 25px);
  transition: 2s all ease;
`;

const CircleStyledDiv = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #ba0101;
  margin: 0 auto;
  margin-top: calc(-50% - 9px);
  border: 5px solid #ba0101;
`;

const ArrowUpStyledDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 125px solid #ba0101;
`;

const MainLineStyledDiv = styled.div`
  width: 2px;
  height: 15px;
  background-color: #ffffff;
  margin-left: auto;
  margin-right: auto;
`;

const MainMiniLineStyledDiv = styled.div`
  width: 1px;
  height: 8px;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
`;

const PreciseLineStyledDiv = styled.div`
  width: 1px;
  height: 100%;
  margin: 0 auto;
  position: absolute;
`;

// const MeterStyledDiv = styled.div`
//   position: relative;
//   width: 250px;
//   height: 250px;
//   border-radius: 50%;
//   border: 4px solid #939393;
//   background-color: #282828;
//   overflow: hidden;
//   font-family: Verdana;
// `;

const MeterStyledDiv = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: #282828;
  overflow: hidden;
  font-family: Verdana;
  box-shadow: inset 0 0 0 4px rgba(147, 147, 147, 0),
    inset 0 -4px 10px rgba(147, 147, 147, 0.4),
    inset 0 -4px 10px rgba(147, 147, 147, 0.6),
    inset 0 -4px 10px rgba(147, 147, 147, 0.5);
`;

const MarkerStyledDiv = styled.div`
  position: absolute;
  width: 50px;
  height: 250px;
  left: calc(50% - 25px);
  padding-top: 5px;
  text-align: center;
  color: #fff;
`;

const Meater = ({ degree, percentage, prograssPercentage, isRunning }) => {
  const totalpercentage = isRunning ? degree || 121 : -121 + percentage * 2;
  const arrowStyle = {
    transform: `rotate(${totalpercentage}deg)`,
  };

  const preciseLines = Array.from({ length: 4 }, (_, j) => {
    const preciseStyle = { transform: `rotate(${(j + 1) * 4.8}deg)` };
    return <PreciseLineStyledDiv style={preciseStyle} key={`precise-${j}`} />;
  });

  const minpreciseLines = Array.from({ length: 4 }, (_, j) => {
    const minPreciseStyle = { transform: `rotate(${(j + 1) * 4.8}deg)` };
    return (
      <PreciseLineStyledDiv style={minPreciseStyle} key={`minprecise-${j}`} />
    );
  });

  const markerElements = [];
  for (let i = -5; i <= 5; i++) {
    const markerStyle = { transform: `rotate(${i * 24}deg)` };

    markerElements.push(
      <MarkerStyledDiv style={markerStyle} key={`marker-${i}`}>
        <MainLineStyledDiv />
        <p style={{ fontSize: 11 }}>{10 * (i + 5)}</p>
        {preciseLines}
      </MarkerStyledDiv>
    );

    if (i < 5) {
      const miniMarkerStyle = { transform: `rotate(${i * 24 + 12}deg)` };
      markerElements.push(
        <MarkerStyledDiv style={miniMarkerStyle} key={`mini-marker-${i}`}>
          <MainMiniLineStyledDiv />
          {minpreciseLines}
        </MarkerStyledDiv>
      );
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '32px',
          height: '32px',
          border: '1px solid var(--white)',
          borderRadius: '50%',
          color: 'var(--yellow)',
          zIndex: 100,
          position: 'absolute',
          top: 70,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 10,
          p: 0.5,
        }}
      >
        {prograssPercentage || 0}%
      </Box>

      <MeterStyledDiv>
        {markerElements}
        <PointerStyledDiv style={arrowStyle}>
          <ArrowUpStyledDiv />
          <CircleStyledDiv />
        </PointerStyledDiv>
      </MeterStyledDiv>
    </Box>
  );
};

export default Meater;
