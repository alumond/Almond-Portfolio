import Link from "next/link";
import { profile } from "../data";
import { ArrowIcon } from "./ArrowIcon";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-topline">
        <span>Available for thoughtful work</span>
        <span className="footer-line" aria-hidden="true" />
        <span>Lagos / Abuja · WAT</span>
      </div>
      <div className="footer-grid">
        <div>
          <p className="eyebrow">Almond Owolabi</p>
          <p className="footer-note">Data scientist, AI engineer, and builder of evidence-led systems.</p>
        </div>
        <div className="footer-links">
          <Link href={profile.github}>GitHub <ArrowIcon /></Link>
          <Link href={profile.linkedin}>LinkedIn <ArrowIcon /></Link>
          <Link href={`mailto:${profile.email}`}>Email <ArrowIcon /></Link>
          <Link href={profile.resume}>Resume <ArrowIcon /></Link>
        </div>
        <p className="footer-copyright">© {new Date().getFullYear()} Almond Owolabi</p>
      </div>
    </footer>
  );
}
