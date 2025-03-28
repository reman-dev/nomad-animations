import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type CirclePosition = "topRight" | "bottomLeft";
type ClickedBox = "topLeft" | "bottomRight";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BoxTopLeft = styled(Box)`
  transform-origin: 100% 100% !important;
  cursor: pointer;
`;

const BoxBottomRight = styled(Box)`
  transform-origin: 0% 0% !important;
  cursor: pointer;
`;

const InOverlayBox = styled(Box)`
  background-color: rgba(255, 255, 255, 0.9);
`;

const Circle = styled(motion.div)`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 35px;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const SwitchButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OverlayVariants = {
  initial: { backgroundColor: "rgba(0, 0, 0, 0)" },
  animate: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const BoxVariants = {
  whileHover: {
    scale: 1.05,
    transition: {
      type: "tween",
      duration: 0.05,
      ease: "easeOut",
    },
  },
};

function App() {
  const [circlePosition, setCirclePosition] =
    useState<CirclePosition>("topRight");
  const [clickedBox, setClickedBox] = useState<ClickedBox | null>(null);

  const toggleBox = () => {
    setCirclePosition((prev) =>
      prev === "topRight" ? "bottomLeft" : "topRight",
    );
  };

  return (
    <>
      <Wrapper>
        <BoxContainer>
          <BoxTopLeft
            onClick={() => setClickedBox("topLeft")}
            variants={BoxVariants}
            whileHover="whileHover"
            layoutId="topLeft"
          ></BoxTopLeft>
          <Box>
            {circlePosition === "topRight" && <Circle layoutId="circle" />}
          </Box>
          <Box>
            {circlePosition === "bottomLeft" && <Circle layoutId="circle" />}
          </Box>
          <BoxBottomRight
            onClick={() => setClickedBox("bottomRight")}
            variants={BoxVariants}
            whileHover="whileHover"
            layoutId="bottomRight"
          ></BoxBottomRight>
        </BoxContainer>
        <AnimatePresence>
          {clickedBox && (
            <Overlay
              onClick={() => setClickedBox(null)}
              variants={OverlayVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <InOverlayBox layoutId={clickedBox}></InOverlayBox>
            </Overlay>
          )}
        </AnimatePresence>
        <SwitchButton onClick={toggleBox}>Switch</SwitchButton>
      </Wrapper>
    </>
  );
}

export default App;
