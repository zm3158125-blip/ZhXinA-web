import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, Image as ImageIcon, Loader2 } from 'lucide-react';
import { fetchAlbumImagesPage, type AlbumImage } from '../services/albumService';
import './ArchivesView.css';

const PAGE_SIZE = 5;
const CACHE_KEY = 'zhxin_album_cache';
const CACHE_TTL = 30 * 60 * 1000;

interface CacheData {
  images: AlbumImage[];
  total: number;
  timestamp: number;
}

function loadCache(): CacheData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CacheData;
    if (Date.now() - cached.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cached;
  } catch {
    return null;
  }
}

function saveCache(images: AlbumImage[], total: number) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ images, total, timestamp: Date.now() }));
  } catch {
    // ignore
  }
}

const LAUNCH_DATE = new Date('2026-01-11T00:00:00').getTime();

const ArchivesView: React.FC = () => {
  const [timeRunning, setTimeRunning] = useState({ days: 0, hours: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = Date.now() - LAUNCH_DATE;
      setTimeRunning({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  // ─── Album ───
  const [images, setImages] = useState<AlbumImage[]>(() => {
    const cached = loadCache();
    return cached?.images ?? [];
  });
  const [total, setTotal] = useState(() => loadCache()?.total ?? 0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const currentPage = useRef(Math.ceil(images.length / PAGE_SIZE) || 1);
  const allLoaded = useRef(false);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const cached = loadCache();
    if (cached) {
      setImages(cached.images);
      setTotal(cached.total);
      currentPage.current = Math.ceil(cached.images.length / PAGE_SIZE) || 1;
      allLoaded.current = cached.images.length >= cached.total;
      setLoading(false);
      // Background refresh
      if (cached.images.length > 0) {
        refreshInBackground();
        return;
      }
    }

    loadFirstPage();
  }, []);

  async function loadFirstPage() {
    setLoading(true);
    try {
      const { images: data, total: count } = await fetchAlbumImagesPage(1, PAGE_SIZE);
      setImages(data);
      setTotal(count);
      currentPage.current = 1;
      allLoaded.current = data.length >= count;
      if (data.length >= count) saveCache(data, count);
    } catch (e) {
      console.error('Failed to load album:', e);
    } finally {
      setLoading(false);
    }
  }

  async function refreshInBackground() {
    try {
      const { images: data, total: count } = await fetchAlbumImagesPage(1, PAGE_SIZE);
      setImages(data);
      setTotal(count);
      currentPage.current = 1;
      allLoaded.current = data.length >= count;
      if (data.length >= count) saveCache(data, count);
    } catch {
      // stale cache is fine
    }
  }

  async function loadMore() {
    if (loadingMore || allLoaded.current) return;
    setLoadingMore(true);
    try {
      const nextPage = currentPage.current + 1;
      const { images: data } = await fetchAlbumImagesPage(nextPage, PAGE_SIZE);
      if (data.length === 0) {
        allLoaded.current = true;
      } else {
        setImages((prev) => {
          const merged = [...prev, ...data];
          if (merged.length >= total) saveCache(merged, total);
          return merged;
        });
        currentPage.current = nextPage;
      }
    } catch (e) {
      console.error('Failed to load more album images:', e);
    } finally {
      setLoadingMore(false);
    }
  }

  const hasMore = !allLoaded.current && images.length < total;

  function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
    (e.target as HTMLImageElement).style.display = 'none';
  }

  return (
    <div className="archives-view page-shell card">
      <header className="page-header">
        <h1 className="page-title">
          <Calendar size={24} className="title-icon-inline" />
          归档
        </h1>
        <p className="page-desc">站点运行记录 · 相册</p>
      </header>

      {/* Runtime Stats */}
      <div className="runtime-card">
        <div className="runtime-icon">
          <Clock size={28} />
        </div>
        <div className="runtime-content">
          <h3>网站运行统计</h3>
          <p>
            本网站于 1 月 11 日上线，已运行
            <span className="highlight">{timeRunning.days}</span> 天
            <span className="highlight">{timeRunning.hours}</span> 小时
            <span className="highlight">{timeRunning.seconds}</span> 秒
          </p>
        </div>
      </div>

      {/* Album Gallery */}
      <section className="album-section">
        <h2 className="album-heading">
          <ImageIcon size={22} className="title-icon-inline" />
          相册
          {total > 0 && <span className="album-count">{total} 张</span>}
        </h2>

        {loading ? (
          <div className="album-grid">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="album-skeleton" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <p className="album-empty">暂无相册内容</p>
        ) : (
          <>
            <div className="album-grid">
              {images.map((img) => (
                <div key={img.id} className="album-item">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="album-img"
                    loading="lazy"
                    onError={handleImgError}
                  />
                  {img.title && <span className="album-img-title">{img.title}</span>}
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="load-more-wrap">
                <button
                  type="button"
                  className="load-more-btn"
                  onClick={loadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <Loader2 size={16} className="spin" />
                      加载中…
                    </>
                  ) : (
                    '加载更多'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default ArchivesView;
