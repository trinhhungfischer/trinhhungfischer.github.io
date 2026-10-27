import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { resume } from '../data/resume';
import type { ResumeEntry } from '../data/resume';
import './About.css';

const TimelineEntry = ({ entry }: { entry: ResumeEntry }) => (
  <div className="resume-entry">
    <div className="resume-entry-head">
      <div>
        <h3>{entry.role}</h3>
        <p className="resume-org">{entry.org}</p>
      </div>
      <div className="resume-when">
        <span>{entry.period}</span>
        <span>{entry.location}</span>
      </div>
    </div>
    <ul className="resume-bullets">
      {entry.bullets.map((b, i) => <li key={i}>{b}</li>)}
    </ul>
  </div>
);

const About = () => {
  const { language } = useLanguage();
  const data = resume[language];
  const cvPath = language === 'vi' ? '/cv/Trinh_Quang_Hung_CV_VI.pdf' : '/cv/Trinh_Quang_Hung_CV_EN.pdf';

  return (
    <div className="container resume-page animate-fade-up">
      {/* Header */}
      <section className="resume-hero">
        <div>
          <h1>{data.name}</h1>
          <p className="resume-headline">{data.headline}</p>
          <div className="resume-contact">
            <a href="mailto:trinhhungfischer@gmail.com">trinhhungfischer@gmail.com</a>
            <a href="https://github.com/trinhhungfischer" target="_blank" rel="noopener noreferrer">github.com/trinhhungfischer</a>
          </div>
        </div>
        <a href={cvPath} target="_blank" rel="noopener noreferrer" className="btn-primary">{data.labels.downloadCv}</a>
      </section>

      {/* Summary + highlights */}
      <section className="resume-block">
        <h2>{data.labels.summary}</h2>
        <p className="resume-summary">{data.summary}</p>
        <div className="resume-highlights">
          {data.highlights.map(h => (
            <div key={h.label} className="resume-highlight">
              <span className="resume-highlight-value">{h.value}</span>
              <span className="resume-highlight-label">{h.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="resume-block">
        <h2>{data.labels.experience}</h2>
        {data.experience.map(e => <TimelineEntry key={e.role + e.org} entry={e} />)}
      </section>

      <section className="resume-block">
        <h2>{data.labels.projects}</h2>
        <div className="resume-projects">
          {data.projects.map(p => (
            <article key={p.title} className="resume-project">
              <div className="resume-entry-head">
                <h3>{p.title}</h3>
                <span className="resume-when">{p.period}</span>
              </div>
              <p className="resume-org">{p.org} · {p.meta}</p>
              <ul className="resume-bullets">
                {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              <div className="resume-project-foot">
                {p.stats && <span className="resume-stats">{p.stats}</span>}
                {p.slug && <Link to={`/projects/${p.slug}`} className="resume-link">{data.labels.viewProject} →</Link>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-block">
        <h2>{data.labels.skills}</h2>
        <div className="resume-skills">
          {data.skills.map(s => (
            <div key={s.group} className="resume-skill-row">
              <h3>{s.group}</h3>
              <div>
                <div className="resume-chips">
                  {s.items.map(item => <span key={item} className="resume-chip">{item}</span>)}
                </div>
                {s.note && <p className="resume-note">{s.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="resume-two-col">
        <section className="resume-block">
          <h2>{data.labels.education}</h2>
          {data.education.map(e => <TimelineEntry key={e.org} entry={e} />)}
        </section>

        <section className="resume-block">
          <h2>{data.labels.activities}</h2>
          {data.activities.map(a => (
            <div key={a.title} className="resume-entry">
              <h3>{a.title}</h3>
              <p className="resume-note">{a.detail}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default About;
