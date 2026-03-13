import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import BlogsAPI from "../api/blogs";

const shimmer = keyframes`
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
`;

const Wrapper = styled.main`
  background: #fff;
  font-family: 'PP Neue Montreal', sans-serif;
  min-height: 100vh;
`;

const Hero = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
  background: #111;
  overflow: hidden;

  img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: filter 0.9s ease;
  }
  img.img-loading { filter: blur(12px) brightness(0.7); }
  img.img-loaded  { filter: blur(0px)  brightness(0.75); }

  &::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%);
  }
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 2;
  padding: 0 8% 6vh;
`;

const TagRow = styled.div`
  display: flex; gap: 8px; margin-bottom: 20px;
`;

const Tag = styled.span`
  font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  border: 1px solid rgba(255,255,255,0.25);
  padding: 4px 12px; border-radius: 999px;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.2rem, 6vw, 7rem);
  font-weight: 500; line-height: 0.95;
  letter-spacing: -0.04em; color: #fff; margin: 0 0 20px;
  max-width: 900px;
`;

const HeroMeta = styled.div`
  display: flex; align-items: center; gap: 16px;
`;

const MetaText = styled.span`
  font-size: 0.72rem; letter-spacing: 0.08em;
  color: rgba(255,255,255,0.45); font-weight: 300;
`;

const MetaDot = styled.span`
  width: 3px; height: 3px; border-radius: 50%;
  background: rgba(255,255,255,0.2);
`;

const Body = styled.div`
  max-width: 740px;
  margin: 0 auto;
  padding: 10vh 6% 16vh;
`;

const Excerpt = styled.p`
  font-size: clamp(1.1rem, 2.2vw, 1.8rem);
  font-weight: 400; line-height: 1.5;
  letter-spacing: -0.015em; color: #1a1a1a;
  margin: 0 0 8vh; padding-bottom: 8vh;
  border-bottom: 1px solid rgba(0,0,0,0.08);
`;

const ArticleBody = styled.div`
  font-size: 1.05rem; line-height: 1.85;
  color: rgba(0,0,0,0.7); font-weight: 300;
  white-space: pre-wrap;

  p { margin: 0 0 2em; }
  h2 {
    font-size: clamp(1.4rem, 3vw, 2.4rem);
    font-weight: 500; letter-spacing: -0.025em;
    color: #111; margin: 1.5em 0 0.6em; line-height: 1.1;
  }
  h3 {
    font-size: clamp(1.1rem, 2vw, 1.6rem);
    font-weight: 500; letter-spacing: -0.02em;
    color: #111; margin: 1.2em 0 0.5em;
  }
  blockquote {
    border-left: 2px solid #000;
    padding-left: 24px; margin: 2em 0;
    font-size: 1.15rem; color: rgba(0,0,0,0.5);
    font-style: italic;
  }
`;

const BackBtn = styled.button`
  display: inline-flex; align-items: center; gap: 8px;
  background: none; border: none; cursor: pointer; padding: 0;
  font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase;
  color: rgba(0,0,0,0.4); font-family: 'PP Neue Montreal', sans-serif;
  margin-bottom: 8vh;
  transition: color 0.3s ease;
  &:hover { color: #000; }
  &::before { content: '←'; font-size: 0.9rem; }
`;

const Divider = styled.div`
  width: 100%; height: 1px;
  background: rgba(0,0,0,0.08);
  margin: 8vh 0;
`;

// ── Skeleton ──────────────────────────────────────────────────

const SkeletonHero = styled.div`
  width: 100%; height: 70vh;
  background: linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease-in-out infinite;
`;

const SkeletonBox = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.6s ease-in-out infinite;
  border-radius: 3px;
  width: ${p => p.w || '100%'};
  height: ${p => p.h || '16px'};
  margin-bottom: ${p => p.mb || '0'};
`;

const SkeletonBody = styled.div`
  max-width: 740px; margin: 0 auto; padding: 10vh 6% 16vh;
  display: flex; flex-direction: column; gap: 16px;
`;

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

// ── Component ─────────────────────────────────────────────────

const BlogPost = () => {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const [blog, setBlog]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    BlogsAPI.getOne(slug)
      .then(setBlog)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // ── Skeleton ───────────────────────────────────────────
  if (loading) {
    return (
      <Wrapper>
        <Navbar />
        <SkeletonHero />
        <SkeletonBody>
          <SkeletonBox h="12px" w="120px" mb="8px" />
          <SkeletonBox h="52px" w="90%"   mb="4px" />
          <SkeletonBox h="52px" w="70%"   mb="32px" />
          <SkeletonBox h="28px" w="100%"  mb="8px" />
          <SkeletonBox h="28px" w="95%"   mb="8px" />
          <SkeletonBox h="28px" w="88%"   mb="48px" />
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBox key={i} h="16px" w={i % 3 === 2 ? '75%' : '100%'} mb="4px" />
          ))}
        </SkeletonBody>
        <Footer />
      </Wrapper>
    );
  }

  // ── Not found ──────────────────────────────────────────
  if (notFound || !blog) {
    return (
      <Wrapper>
        <Navbar />
        <div style={{
          height: '70vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 20,
        }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)' }}>
            Article not found
          </span>
          <BackBtn onClick={() => navigate('/news')}>
            Back to News
          </BackBtn>
        </div>
        <Footer />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Navbar />

      {/* Hero image */}
      <Hero>
        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="img-loading"
            onLoad={(e) => {
              e.target.classList.remove('img-loading');
              e.target.classList.add('img-loaded');
            }}
          />
        )}
        <HeroContent>
          <TagRow>
            {blog.tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </TagRow>
          <HeroTitle>{blog.title}</HeroTitle>
          <HeroMeta>
            {blog.author?.name && <MetaText>{blog.author.name}</MetaText>}
            <MetaDot />
            <MetaText>{formatDate(blog.createdAt)}</MetaText>
          </HeroMeta>
        </HeroContent>
      </Hero>

      {/* Article body */}
      <Body>
        <BackBtn onClick={() => navigate('/news')}>
          Back to News
        </BackBtn>

        {blog.excerpt && <Excerpt>{blog.excerpt}</Excerpt>}

        <ArticleBody>
          {blog.body}
        </ArticleBody>

        <Divider />

        {/* Tags at bottom */}
        <TagRow>
          {blog.tags?.map((tag) => (
            <span key={tag} style={{
              fontSize: '0.62rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(0,0,0,0.12)',
              padding: '4px 12px', borderRadius: '999px',
            }}>
              {tag}
            </span>
          ))}
        </TagRow>
      </Body>

      <Footer />
    </Wrapper>
  );
};

export default BlogPost;