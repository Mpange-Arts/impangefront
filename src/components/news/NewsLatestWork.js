import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProductsAPI from "../../api/products";

const shimmer = keyframes`
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
`;

const Wrapper = styled.section`
  background: #0a0a0a;
  padding: 14vh 6% 16vh;
  font-family: 'PP Neue Montreal', sans-serif;
`;

const Header = styled.div`
  display: flex; align-items: flex-end;
  justify-content: space-between; margin-bottom: 8vh;
  @media (max-width: 768px) { flex-direction: column; align-items: flex-start; gap: 3vh; }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(3rem, 8vw, 9rem);
  font-weight: 500; line-height: 0.92;
  letter-spacing: -0.04em; color: #f0ede8; margin: 0;
`;

const ViewAll = styled(motion.a)`
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.8rem; color: rgba(255,255,255,0.6);
  text-decoration: none; letter-spacing: 0.05em;
  padding-bottom: 2px; border-bottom: 1px solid rgba(255,255,255,0.2);
  transition: color 0.3s, border-color 0.3s; cursor: pointer;
  white-space: nowrap; margin-bottom: 8px;
  &:hover { color: #fff; border-color: rgba(255,255,255,0.6); }
`;

const Strip = styled.div`
  display: flex; flex-direction: column; gap: 0;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: 80px 1fr 200px 200px;
  align-items: center; gap: 4vw;
  padding: 3.5vh 0;
  border-top: 1px solid rgba(255,255,255,0.06);
  cursor: pointer;
  transition: background 0.3s ease;
  border-radius: 4px;

  &:hover { background: rgba(255,255,255,0.03); }
  &:hover .row-img img { transform: scale(1.06); }
  &:last-child { border-bottom: 1px solid rgba(255,255,255,0.06); }

  @media (max-width: 900px) { grid-template-columns: 60px 1fr 120px; }
  @media (max-width: 600px) { grid-template-columns: 50px 1fr; gap: 16px; }
`;

const RowNum = styled.span`
  font-size: 0.62rem; letter-spacing: 0.2em;
  color: rgba(255,255,255,0.2); font-weight: 300;
`;


const RowTitle = styled.h3`
  font-size: clamp(1.1rem, 2.5vw, 2rem);
  font-weight: 400; line-height: 1.1; letter-spacing: -0.025em;
  color: #f0ede8; margin: 0; text-transform: none;
`;

const RowCategory = styled.span`
  font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(255,255,255,0.3); font-weight: 300;
  @media (max-width: 900px) { display: none; }
`;

const RowThumb = styled.div`
  width: 100px; aspect-ratio: 3/2; overflow: hidden; margin-left: auto;
  .row-img {
    width: 100%; height: 100%;
    img {
      width: 100%; height: 100%; object-fit: cover; display: block;
      transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
    }
    img.img-loading { filter: blur(6px); }
    img.img-loaded  { filter: blur(0px); }
  }
  @media (max-width: 600px) { display: none; }
`;

// Skeleton
const SkeletonRow = styled.div`
  display: grid; grid-template-columns: 80px 1fr 200px 200px;
  align-items: center; gap: 4vw; padding: 3.5vh 0;
  border-top: 1px solid rgba(255,255,255,0.06);
  @media (max-width: 900px) { grid-template-columns: 60px 1fr 120px; }
  @media (max-width: 600px) { grid-template-columns: 50px 1fr; gap: 16px; }
`;

const SkeletonBox = styled.div`
  background: linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease-in-out infinite;
  border-radius: 2px;
  width: ${p => p.w || '100%'};
  height: ${p => p.h || '14px'};
`;

const rowV = {
  hidden:  { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const NewsLatestWork = () => {
  const navigate   = useNavigate();
  const wrapperRef = useRef(null);
  const isInView   = useInView(wrapperRef, { once: true, amount: 0.1 });
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    ProductsAPI.getAll({ limit: 6, page: 1 })
      .then((data) => setProducts(data.products || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <Header>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Latest<br />Work
        </SectionTitle>
        <ViewAll
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          href="/work"
        >
          Browse all work →
        </ViewAll>
      </Header>

      <Strip>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <SkeletonRow key={i}>
                <SkeletonBox h="12px" w="40px" />
                <SkeletonBox h="28px" w="70%" />
                <SkeletonBox h="12px" w="80px" />
                <SkeletonBox h="66px" w="100px" style={{ marginLeft: 'auto' }} />
              </SkeletonRow>
            ))
          : products.map((product, i) => (
              <Row
                key={product.id}
                custom={i}
                variants={rowV}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                onClick={() => navigate('/work')}
              >
                <RowNum>{String(i + 1).padStart(2, '0')}</RowNum>
                <RowTitle>{product.title}</RowTitle>
                <RowCategory>{product.category}</RowCategory>
                <RowThumb>
                  <div className="row-img">
                    <img
                      src={product.images?.[0]?.url}
                      alt={product.title}
                      className="img-loading"
                      onLoad={(e) => {
                        e.target.classList.remove('img-loading');
                        e.target.classList.add('img-loaded');
                      }}
                    />
                  </div>
                </RowThumb>
              </Row>
            ))
        }
      </Strip>
    </Wrapper>
  );
};

export default NewsLatestWork;