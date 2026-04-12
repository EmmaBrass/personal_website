import { useEffect, useMemo, useState } from "react"

const faceValueVideoModules = import.meta.glob(
  "../assets/page-images/face-value/*.{mp4,MP4,webm,WEBM,mov,MOV}",
  {
    eager: true,
    import: "default",
  }
)

const image960JpgModules = import.meta.glob("../assets/optimized/face-value/960_jpg/*.jpg", {
  eager: true,
  import: "default",
})

const image1800JpgModules = import.meta.glob("../assets/optimized/face-value/1800_jpg/*.jpg", {
  eager: true,
  import: "default",
})

const image960HeicModules = import.meta.glob("../assets/optimized/face-value/960_heic/*.heic", {
  eager: true,
  import: "default",
})

const image1800HeicModules = import.meta.glob("../assets/optimized/face-value/1800_heic/*.heic", {
  eager: true,
  import: "default",
})

function stemFromPath(path) {
  const filename = path.split("/").pop() || ""
  return filename.replace(/\.[^/.]+$/, "")
}

function toStemMap(modules) {
  return new Map(Object.entries(modules).map(([path, url]) => [stemFromPath(path), url]))
}

function sortedMedia(modules) {
  return Object.entries(modules)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([path, src]) => {
      const filename = path.split("/").pop() || "media"
      const label = filename.replace(/\.[^/.]+$/, "").trim()
      return { path, src, label }
    })
}

function buildFaceValueImages() {
  const jpg960 = toStemMap(image960JpgModules)
  const jpg1800 = toStemMap(image1800JpgModules)
  const heic960 = toStemMap(image960HeicModules)
  const heic1800 = toStemMap(image1800HeicModules)

  return [...jpg1800.keys()].sort().map((stem) => ({
    key: stem,
    label: stem,
    jpg960: jpg960.get(stem) || jpg1800.get(stem),
    jpg1800: jpg1800.get(stem),
    heic960: heic960.get(stem),
    heic1800: heic1800.get(stem),
  }))
}

export default function FaceValue() {
  const videos = useMemo(() => sortedMedia(faceValueVideoModules), [])
  const images = useMemo(() => buildFaceValueImages(), [])
  const [sizedImages, setSizedImages] = useState([])

  const mainVideo =
    videos.find((video) => video.path.toLowerCase().endsWith(".mov")) ||
    videos.find((video) => video.path.toLowerCase().endsWith(".mp4")) ||
    videos[0]

  useEffect(() => {
    let cancelled = false

    Promise.all(
      images.map(
        (image) =>
          new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
              resolve({
                ...image,
                width: img.naturalWidth || 1,
                height: img.naturalHeight || 1,
              })
            }
            img.onerror = () => {
              resolve({ ...image, width: 1, height: 1 })
            }
            img.src = image.jpg1800
          })
      )
    ).then((loaded) => {
      if (!cancelled) {
        setSizedImages(loaded)
      }
    })

    return () => {
      cancelled = true
    }
  }, [images])

  const landscapeImages = sizedImages.filter((image) => image.width >= image.height)
  const portraitImages = sizedImages.filter((image) => image.width < image.height)

  const portraitRows = []
  for (let i = 0; i < portraitImages.length; i += 2) {
    portraitRows.push(portraitImages.slice(i, i + 2))
  }

  return (
    <section className="contentPage faceValuePage">
      <div className="titleBlock">
        <h1>Face Value</h1>
        <p>
          &quot;Face Value&quot; is an immersive experience where audience members unexpectedly
          become part of a fantasy gameshow, as an AI-powered robotic artist selects and
          transforms their images in real time. The experience highlights themes of technology
          and control, prompting participants to wonder what ultimately happens to their digital
          selves.
        </p>
        <p>
          The installation combines novel technologies, including artificial intelligence and
          robotics, to create a constantly evolving spectacle. A CCTV-style network of cameras
          captures images of the crowd, from which pictures of current audience members are
          selected at random. This ensures that every cycle of the installation is entirely
          unique. These images are handed over to a robotic artist, which transforms them in
          real time, accompanied by AI-generated speech and visuals and a bespoke soundtrack.
          The shifting, re imagined portraits are projected across three towering screens,
          surrounding viewers with a kaleidoscope of movement and sound.
        </p>
        <p>
          The work invites reflection on how emerging technologies interact with our digital
          identities and shape our control over our own image. By presenting these tools as both
          enchanting and unsettling, Face Value provides a spectacle whilst also encouraging
          curiosity about their deeper, more complex implications.
        </p>
        <p>
          Face Value was created in collaboration with Venya Krutikov from{" "}
          <a href="https://www.studiotonto.com/" target="_blank" rel="noreferrer">
            Studio Tonto
          </a>
          .
        </p>
        <p>
          Commissioned by Culture Liverpool for their River of Light festival 2025.
          <br />
          With additional support from the University of Liverpool and AIChemy.
        </p>
      </div>

      <section className="imageSection">
        <h2>Film</h2>
        {mainVideo ? (
          <div className="faceValueVideoWrap">
            <video className="faceValueVideo" controls preload="metadata" playsInline>
              <source src={mainVideo.src} />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="emptyState">No video found in face-value folder.</div>
        )}
      </section>

      <section className="imageSection">
        <h2>Images</h2>
        {!images.length && <div className="emptyState">No images found in face-value folder.</div>}

        {images.length > 0 && sizedImages.length === 0 && (
          <div className="emptyState">Loading images...</div>
        )}

        {sizedImages.length > 0 && (
          <div className="faceValueImageLayout">
            {landscapeImages.map((image) => (
              <figure key={image.key} className="faceValueImageCard faceValueImageCardLandscape">
                <picture>
                  {image.heic960 && (
                    <source
                      type="image/heic"
                      srcSet={`${image.heic960} 960w${
                        image.heic1800 ? `, ${image.heic1800} 1800w` : ""
                      }`}
                      sizes="(max-width: 720px) 100vw, 92vw"
                    />
                  )}
                  <img
                    src={image.jpg960}
                    srcSet={`${image.jpg960} 960w, ${image.jpg1800} 1800w`}
                    sizes="(max-width: 720px) 100vw, 92vw"
                    alt={image.label || "Face Value image"}
                    loading="lazy"
                  />
                </picture>
              </figure>
            ))}

            {portraitRows.map((row, index) => (
              <div
                key={`portrait-row-${index}`}
                className="faceValuePortraitRow"
                style={{ gridTemplateColumns: row.length === 1 ? "1fr" : "repeat(2, minmax(0, 1fr))" }}
              >
                {row.map((image) => (
                  <figure key={image.key} className="faceValueImageCard">
                    <picture>
                      {image.heic960 && (
                        <source
                          type="image/heic"
                          srcSet={`${image.heic960} 960w${
                            image.heic1800 ? `, ${image.heic1800} 1800w` : ""
                          }`}
                          sizes={row.length === 1 ? "(max-width: 720px) 100vw, 92vw" : "(max-width: 720px) 100vw, 45vw"}
                        />
                      )}
                      <img
                        src={image.jpg960}
                        srcSet={`${image.jpg960} 960w, ${image.jpg1800} 1800w`}
                        sizes={row.length === 1 ? "(max-width: 720px) 100vw, 92vw" : "(max-width: 720px) 100vw, 45vw"}
                        alt={image.label || "Face Value image"}
                        loading="lazy"
                      />
                    </picture>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  )
}
