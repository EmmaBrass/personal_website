const image960JpgModules = import.meta.glob("../assets/optimized/code-art/960_jpg/*.jpg", {
  eager: true,
  import: "default",
})

const image1600JpgModules = import.meta.glob("../assets/optimized/code-art/1600_jpg/*.jpg", {
  eager: true,
  import: "default",
})

const image960HeicModules = import.meta.glob("../assets/optimized/code-art/960_heic/*.heic", {
  eager: true,
  import: "default",
})

const image1600HeicModules = import.meta.glob("../assets/optimized/code-art/1600_heic/*.heic", {
  eager: true,
  import: "default",
})

const videoModules = import.meta.glob(
  "../assets/page-images/code-art/*.{mp4,MP4,webm,WEBM,mov,MOV}",
  {
    eager: true,
    import: "default",
  }
)

function stemFromPath(path) {
  const filename = path.split("/").pop() || ""
  return filename.replace(/\.[^/.]+$/, "")
}

function toStemMap(modules) {
  return new Map(Object.entries(modules).map(([path, url]) => [stemFromPath(path), url]))
}

function toMediaList(modules) {
  return Object.entries(modules)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([path, src]) => {
      const filename = path.split("/").pop() || "media"
      const label = filename.replace(/\.[^/.]+$/, "").trim()
      return { path, src, label }
    })
}

function buildCodeArtImages() {
  const jpg960 = toStemMap(image960JpgModules)
  const jpg1600 = toStemMap(image1600JpgModules)
  const heic960 = toStemMap(image960HeicModules)
  const heic1600 = toStemMap(image1600HeicModules)

  return [...jpg960.keys()].sort().map((stem) => ({
    key: stem,
    label: stem.trim(),
    jpg960: jpg960.get(stem),
    jpg1600: jpg1600.get(stem) || jpg960.get(stem),
    heic960: heic960.get(stem),
    heic1600: heic1600.get(stem),
  }))
}

function normalizeLabel(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "")
}

const orderedVideoNames = [
  "One to Many",
  "You Spin My Head Right Round",
  "Spaghetti and Metabols",
  "Hunt Stanton",
  "Wash Your Hands More Often",
  "How the Vaccine Works",
  "Sperm Race",
  "Fake Nails",
  "Money Sandwich",
  "How to Apply Lipstick",
  "Diamonds are forever",
  "The Sky is Falling",
  "River of Oil",
  "Grass Fingers",
  "The Knife Game",
  "The Dance Floor at Fever in Oxford",
  "Shells Made of Pixels that Rearrange Themselves",
  "I See You",
]

const videoOrderAliases = {
  spaghettiandmetabols: "spaghettiandmetaballs",
  huntstanton: "hunstanton",
  iseeyou: "eyeseeyou",
  thedanceflooratfeverinoxford: "thedanceflooratfeverinoxford",
}

const videoOrderIndex = new Map(
  orderedVideoNames.map((name, index) => {
    const normalized = normalizeLabel(name)
    const alias = videoOrderAliases[normalized] || normalized
    return [alias, index]
  })
)

function sortVideosByRequestedOrder(videos) {
  return [...videos].sort((a, b) => {
    const aKey = videoOrderAliases[normalizeLabel(a.label)] || normalizeLabel(a.label)
    const bKey = videoOrderAliases[normalizeLabel(b.label)] || normalizeLabel(b.label)
    const aIndex = videoOrderIndex.get(aKey) ?? Number.POSITIVE_INFINITY
    const bIndex = videoOrderIndex.get(bKey) ?? Number.POSITIVE_INFINITY
    if (aIndex !== bIndex) return aIndex - bIndex
    return a.label.localeCompare(b.label)
  })
}

export default function CodeArt() {
  const images = buildCodeArtImages()
  const videos = sortVideosByRequestedOrder(toMediaList(videoModules))

  return (
    <section className="codeArtPage contentPage">
      <div className="titleBlock">
        <h1>Code Art</h1>
        <p>
          Videos and images created with code (using{" "}
          <a href="https://processing.org/" target="_blank" rel="noreferrer">
            Processing
          </a>
          ).
        </p>
        <p>Most of these were made during the pandemic.</p>
      </div>

      <section className="imageSection">
        <h2>Images</h2>
        {images.length > 0 ? (
          <div className="codeArtImageGrid">
            {images.map((image) => (
              <figure key={image.key} className="codeArtTile">
                <picture>
                  {image.heic960 && (
                    <source
                      type="image/heic"
                      srcSet={`${image.heic960} 960w${
                        image.heic1600 ? `, ${image.heic1600} 1600w` : ""
                      }`}
                      sizes="(max-width: 720px) 50vw, 33vw"
                    />
                  )}
                  <img
                    src={image.jpg960}
                    srcSet={`${image.jpg960} 960w${
                      image.jpg1600 ? `, ${image.jpg1600} 1600w` : ""
                    }`}
                    sizes="(max-width: 720px) 50vw, 33vw"
                    alt={image.label || "Code art image"}
                    loading="lazy"
                  />
                </picture>
              </figure>
            ))}
          </div>
        ) : (
          <div className="emptyState">No images found in code-art folder.</div>
        )}
      </section>

      <section className="imageSection">
        <h2>Videos</h2>
        {videos.length > 0 ? (
          <div className="codeArtVideoGrid">
            {videos.map((video) => (
              <figure key={video.path} className="codeArtTile codeArtVideoTile">
                <div className="codeArtTileMedia">
                  <video controls preload="metadata" playsInline>
                    <source src={video.src} />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <figcaption className="codeArtCaption">{video.label}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="emptyState">No videos found in code-art folder.</div>
        )}
      </section>
    </section>
  )
}
