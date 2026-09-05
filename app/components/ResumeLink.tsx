import { profile } from "../data";

export function DownloadIcon() {
  return <svg className="icon-download" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></svg>;
}

export function ResumeLink({ className = "text-link", label = "Download résumé" }: { className?: string; label?: string }) {
  return <a className={className} href={profile.resume} download="Almond_Owolabi_Resume.pdf">{label}<DownloadIcon /></a>;
}
