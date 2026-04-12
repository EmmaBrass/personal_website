import { useMemo } from "react"

const pageImageModules = import.meta.glob(
  "../assets/page-images/*/*.{png,jpg,jpeg,webp,gif,avif}",
  {
    eager: true,
    import: "default",
  }
)

function toImageList(folder) {
  return Object.entries(pageImageModules)
    .filter(([path]) => path.includes(`/${folder}/`))
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([path, url]) => {
      const fileName = path.split("/").pop() || "image"
      const label = fileName
        .replace(/\.[^/.]+$/, "")
        .replace(/[_-]+/g, " ")
        .trim()

      return {
        key: path,
        url,
        alt: label || "portfolio image",
      }
    })
}

export default function PortfolioPage({ title, intro, folder }) {
  const images = useMemo(() => toImageList(folder), [folder])

  return (
    <section className="contentPage">
      <div className="titleBlock">
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>

      <section className="imageSection" aria-label={`${title} images`}>
        <div className="imageSectionHeader">
          <h2>Images</h2>
          <p>
            Drop files into <code>{`src/assets/page-images/${folder}/`}</code>
          </p>
        </div>

        {images.length > 0 ? (
          <div className="imageGrid">
            {images.map((image) => (
              <figure key={image.key} className="imageCard">
                <img src={image.url} alt={image.alt} loading="lazy" />
                <figcaption>{image.alt}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="emptyState">
            No images yet for this page. Add files to the folder above.
          </div>
        )}
      </section>
    </section>
  )
}
