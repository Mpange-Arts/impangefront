import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import img from "../../assets/image/1.jpg";

const Wrapper = styled.section`
  background: #0a0a0a;
  padding: 10vh 0 0;
  overflow: hidden;
`;

const StudioImage = () => {
  const wrapperRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "center center"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["40%", "100%"]);
  const imgY  = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <Wrapper ref={wrapperRef}>
      <motion.div
        style={{
          width,
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        <motion.img
          src={img}
          alt="Mpange Creative Studio"
          style={{
            y: imgY,
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            objectPosition: "center 35%",
            display: "block",
          }}
        />
      </motion.div>
    </Wrapper>
  );
};

export default StudioImage;