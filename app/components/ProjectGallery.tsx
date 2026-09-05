"use client";

import Image from "next/image";
import { useId, useRef } from "react";

export type GalleryImage = { src: string; alt: string; caption: string };

export function ProjectGallery({ title, images }: { title: string; images: GalleryImage[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  return <section className="gallery-section section-frame" aria-labelledby={id}>
    <div className="gallery-heading"><div><p className="eyebrow">A closer look</p><h2 id={id}>{title}</h2></div><span>Click to expand ↗</span></div>
    <div className={`gallery-images ${images.length === 1 ? 'gallery-single' : ''}`}>
      {images.map((img, i) => <figure key={img.src}>
        <button type="button" className="gallery-trigger" aria-label={`Expand image: ${img.alt}`} onClick={() => { dialog.current?.showModal(); document.getElementById(`${id}-${i}`)?.scrollIntoView({ block: "nearest" }); }}>
          <Image unoptimized src={img.src} alt={img.alt} fill sizes="(max-width: 760px) 90vw, 80vw" />
          <span>View full image <span aria-hidden="true">↗</span></span>
        </button><figcaption>{img.caption}</figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} className="image-dialog" aria-label={title} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <div className="dialog-bar"><span>{title}</span><button type="button" onClick={() => dialog.current?.close()} aria-label="Close image viewer">Close <span aria-hidden="true">×</span></button></div>
      <div className="dialog-images">{images.map((img,i) => <figure id={`${id}-${i}`} key={img.src}><Image unoptimized src={img.src} alt={img.alt} width={1600} height={1000} sizes="95vw"/><figcaption>{img.caption}</figcaption></figure>)}</div>
    </dialog>
  </section>;
}
