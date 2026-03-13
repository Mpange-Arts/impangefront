import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import BlogsAPI from "../../api/blogs";

const shimmer = keyframes`
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
`;

const Wrapper = styled.section`
  background: #fff;
  padding: 14vh 6% 16vh;
  font-family: 'PP Neue Montreal', sans-serif;
`;

const Header = styled.div`
  display: flex; align-items: flex-end;
  justify-content: space-between; margin-bottom: 10vh;
  @media (max-width: 768px) { flex-direction: column; align-items: flex-start; gap: 3vh; }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(3rem, 8vw, 9rem);
  font-weight: 500; line-height: 0.92;
  letter-spacing: -0.04em; color: #111; margin: 0;
`;

const ViewAll = styled(motion.a)`
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.8rem; color: #000; text-decoration: none;
  letter-spacing: 0.05em; padding-bottom: 2px;
  border-bottom: 1px solid rgba(0,0,0,0.25);
  transition: border-color 0.3s ease;
  cursor: pointer; white-space: nowrap; margin-bottom: 8px;
  &:hover { border-color: #000; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4vw 3vw;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 6vh; }
`;

const Card = styled(motion.article)`
  display: flex; flex-direction: column; gap: 16px; cursor: pointer;
  &:hover .card-img img { transform: scale(1.04); }
`;

const CardImgWrap = styled.div`
  width: 100%; aspect-ratio: 3/2; overflow: hidden; background: #f0f0f0;
  .card-img {
    width: 100%; height: 100%;
    img {
      width: 100%; height: 100%; object-fit: cover; display: block;
      transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
    }
    img.img-loading { filter: blur(8px); }
    img.img-loaded  { filter: blur(0px); }
  }
`;

const CardMeta = styled.div`
  display: flex; align-items: center; gap: 10px;
`;

const CardTag = styled.span`
  font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(0,0,0,0.4); font-weight: 300;
`;

const CardDot = styled.span`
  width: 3px; height: 3px; border-radius: 50%; background: rgba(0,0,0,0.2);
`;

const CardDate = styled.span`
  font-size: 0.62rem; letter-spacing: 0.08em;
  color: rgba(0,0,0,0.3); font-weight: 300;
`;

const CardTitle = styled.h3`
  font-size: clamp(1.1rem, 2vw, 1.6rem);
  font-weight: 400; line-height: 1.25;
  letter-spacing: -0.02em; color: #111; margin: 0;
`;

const CardExcerpt = styled.p`
  font-size: 0.82rem; line-height: 1.7;
  color: rgba(0,0,0,0.45); margin: 0; font-weight: 300;
  display: -webkit-box; -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; overflow: hidden;
`;

const ReadMore = styled.span`
  font-size: 0.75rem; color: #000;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(0,0,0,0.25);
  padding-bottom: 2px; width: fit-content;
  transition: border-color 0.3s;
  ${Card}:hover & { border-color: #000; }
`;

// Skeleton
const SkeletonCard = styled.div`
  display: flex; flex-direction: column; gap: 16px;
`;

const SkeletonBox = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.6s ease-in-out infinite;
  border-radius: 2px;
  width: ${p => p.w || '100%'};
  height: ${p => p.h || '14px'};
  aspect-ratio: ${p => p.ratio || 'auto'};
`;

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const cardV = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  }),
};

const NewsBlogGrid = () => {
  const navigate   = useNavigate();
  const wrapperRef = useRef(null);
  const isInView   = useInView(wrapperRef, { once: true, amount: 0.1 });
  const [blogs, setBlogs]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BlogsAPI.getAll({ limit: 6 })
      .then((data) => setBlogs(data.blogs || []))
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
          Latest<br />Articles
        </SectionTitle>
        <ViewAll
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          href="/news"
        >
          View all articles →
        </ViewAll>
      </Header>

      <Grid>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i}>
                <SkeletonBox ratio="3/2" />
                <SkeletonBox h="12px" w="60%" />
                <SkeletonBox h="24px" w="90%" />
                <SkeletonBox h="24px" w="75%" />
                <SkeletonBox h="12px" w="40%" />
              </SkeletonCard>
            ))
          : blogs.map((blog, i) => (
              <Card
                key={blog.id}
                custom={i}
                variants={cardV}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                onClick={() => navigate(`/news/${blog.slug}`)}
              >
                <CardImgWrap>
                  <div className="card-img">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="img-loading"
                      onLoad={(e) => {
                        e.target.classList.remove('img-loading');
                        e.target.classList.add('img-loaded');
                      }}
                    />
                  </div>
                </CardImgWrap>
                <CardMeta>
                  {blog.tags?.[0] && <CardTag>{blog.tags[0]}</CardTag>}
                  <CardDot />
                  <CardDate>{formatDate(blog.createdAt)}</CardDate>
                </CardMeta>
                <CardTitle>{blog.title}</CardTitle>
                {blog.excerpt && <CardExcerpt>{blog.excerpt}</CardExcerpt>}
                <ReadMore>Read article</ReadMore>
              </Card>
            ))
        }
      </Grid>
    </Wrapper>
  );
};

export default NewsBlogGrid;