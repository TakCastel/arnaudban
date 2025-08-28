"use client";

import { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/data/projects";
import Masonry from "masonry-layout";

export default function MosaicGrid({ projects }: { projects: Project[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<Masonry | null>(null);

  const getColumns = (width: number) => {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  const updateLayout = () => {
    const el = gridRef.current;
    if (!el) return;

    const width = el.offsetWidth;
    const columns = getColumns(width);
    const gutter = 24;
    const columnWidth = (width - gutter * (columns - 1)) / columns;

    const sizer = el.querySelector(".grid-sizer") as HTMLElement;
    if (sizer) {
      sizer.style.width = `${columnWidth}px`;
    }

    const items = el.querySelectorAll(".grid-item");
    items.forEach((item: any) => {
      item.style.width = `${columnWidth}px`;
    });

    masonryRef.current?.layout();
  };

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const masonry = new Masonry(el, {
      itemSelector: ".grid-item",
      columnWidth: ".grid-sizer",
      gutter: 24,
      transitionDuration: "0.3s",
      percentPosition: false,
    });

    masonryRef.current = masonry;

    const imgs = el.querySelectorAll("img");
    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded === imgs.length) {
        masonry.layout();
      }
    };
    imgs.forEach((img) => {
      if (img.complete) onLoad();
      else img.addEventListener("load", onLoad, { once: true });
    });

    const ro = new ResizeObserver(() => updateLayout());
    ro.observe(el);

    window.addEventListener("resize", updateLayout);
    updateLayout();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateLayout);
      masonry.destroy();
    };
  }, []);

  const heights = [
    "h-48",
    "h-56",
    "h-64",
    "h-72",
    "h-80",
    "h-96",
    "h-52",
    "h-60",
    "h-68",
    "h-76",
    "h-84",
    "h-88",
    "h-44",
    "h-50",
    "h-58",
    "h-66",
    "h-74",
    "h-82",
    "h-90",
  ];

  const getRandomHeight = (index: number) =>
    heights[(index * 7 + 13) % heights.length];

  return (
    <div
      ref={gridRef}
      className="w-full transition-opacity duration-300"
      role="grid"
      aria-label="Grille des projets d'Arnaud Ban"
      aria-describedby="work-title"
    >
      <div className="grid-sizer" />

      {projects.map((project, index) => {
        const heightClass = getRandomHeight(index);
        return (
          <div key={project.slug} className="grid-item" role="gridcell">
            <ProjectCard project={project} imageHeight={heightClass} />
          </div>
        );
      })}
    </div>
  );
}
