// Gom bài theo series từ frontmatter `series` + `seriesOrder`.

export interface SeriesPostLike {
  slug: string;
  title: string;
  date: string;
  series?: string;
  seriesOrder?: string;
}

export interface SeriesGroup<T extends SeriesPostLike> {
  name: string;
  posts: T[];
  latestDate: string;
}

const orderOf = (p: SeriesPostLike) => {
  const n = Number(p.seriesOrder);
  return Number.isFinite(n) && p.seriesOrder !== '' ? n : Number.POSITIVE_INFINITY;
};

/** Trả về các series, bài trong mỗi series theo thứ tự; series cập nhật gần nhất đứng trước. */
export function groupBySeries<T extends SeriesPostLike>(posts: T[]): SeriesGroup<T>[] {
  const map = new Map<string, T[]>();
  for (const p of posts) {
    const name = p.series?.trim();
    if (!name) continue;
    if (!map.has(name)) map.set(name, []);
    map.get(name)!.push(p);
  }
  return Array.from(map, ([name, list]) => {
    const sorted = [...list].sort((a, b) => orderOf(a) - orderOf(b) || a.date.localeCompare(b.date));
    const latestDate = sorted.reduce((m, p) => (p.date > m ? p.date : m), '');
    return { name, posts: sorted, latestDate };
  }).sort((a, b) => b.latestDate.localeCompare(a.latestDate));
}
