import { useEffect, useMemo, useRef, useState } from "react"

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function randomVelocity() {
  const speed = randomBetween(24, 38)
  const angle = randomBetween(0, Math.PI * 2)
  return {
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
  }
}

function stemFromPath(path) {
  const filename = path.split("/").pop() || ""
  return filename.replace(/\.[^/.]+$/, "")
}

function toStemMap(modules) {
  return new Map(Object.entries(modules).map(([path, url]) => [stemFromPath(path), url]))
}

function makeSprites(images, width, height) {
  if (!width || !height) return []

  const stagePadding = 10
  const longSideBase = clamp(Math.min(width, height) * 0.53, 300, 520)

  return images.map((image, index) => {
    const aspect = image.width > 0 && image.height > 0 ? image.width / image.height : 1
    const scale = randomBetween(0.92, 1.08)
    const longSide = longSideBase * scale

    let w = aspect >= 1 ? longSide : longSide * aspect
    let h = aspect >= 1 ? longSide / aspect : longSide

    const minSide = 150
    if (Math.min(w, h) < minSide) {
      const factor = minSide / Math.min(w, h)
      w *= factor
      h *= factor
    }

    const maxW = Math.max(minSide, width - stagePadding * 2)
    const maxH = Math.max(minSide, height - stagePadding * 2)

    if (w > maxW) {
      const factor = maxW / w
      w *= factor
      h *= factor
    }

    if (h > maxH) {
      const factor = maxH / h
      w *= factor
      h *= factor
    }

    w = Math.round(w)
    h = Math.round(h)

    const maxX = Math.max(stagePadding, width - w - stagePadding)
    const maxY = Math.max(stagePadding, height - h - stagePadding)

    const x = randomBetween(stagePadding, maxX)
    const y = randomBetween(stagePadding, maxY)
    const { vx, vy } = randomVelocity()

    return {
      id: `${image.key}-${index}`,
      thumbSrc: image.thumbJpg,
      thumbHeic: image.thumbHeic,
      fullSrc: image.fullJpg,
      fullHeic: image.fullHeic,
      alt: image.alt,
      x,
      y,
      w,
      h,
      vx,
      vy,
    }
  })
}

const thumbJpgModules = import.meta.glob("../assets/optimized/paintings/thumb_jpg/*.jpg", {
  eager: true,
  import: "default",
})

const thumbHeicModules = import.meta.glob("../assets/optimized/paintings/thumb_heic/*.heic", {
  eager: true,
  import: "default",
})

const fullJpgModules = import.meta.glob("../assets/optimized/paintings/full_jpg/*.jpg", {
  eager: true,
  import: "default",
})

const fullHeicModules = import.meta.glob("../assets/optimized/paintings/full_heic/*.heic", {
  eager: true,
  import: "default",
})

export default function Paintings() {
  const images = useMemo(() => {
    const thumbJpg = toStemMap(thumbJpgModules)
    const thumbHeic = toStemMap(thumbHeicModules)
    const fullJpg = toStemMap(fullJpgModules)
    const fullHeic = toStemMap(fullHeicModules)

    return [...fullJpg.keys()].sort().map((stem) => ({
      key: stem,
      thumbJpg: thumbJpg.get(stem) || fullJpg.get(stem),
      thumbHeic: thumbHeic.get(stem),
      fullJpg: fullJpg.get(stem),
      fullHeic: fullHeic.get(stem),
      alt: stem.replace(/[_-]+/g, " ").trim(),
    }))
  }, [])

  const [sizedImages, setSizedImages] = useState([])
  const stageRef = useRef(null)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(0)
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 })
  const [sprites, setSprites] = useState([])
  const [selected, setSelected] = useState(null)

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
            img.src = image.fullJpg
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

  useEffect(() => {
    const node = stageRef.current
    if (!node) return

    const updateSize = () => {
      setStageSize({
        width: node.clientWidth,
        height: node.clientHeight,
      })
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!sizedImages.length || !stageSize.width || !stageSize.height) {
        setSprites([])
        return
      }

      setSprites(makeSprites(sizedImages, stageSize.width, stageSize.height))
    })

    return () => cancelAnimationFrame(frame)
  }, [sizedImages, stageSize.height, stageSize.width])

  useEffect(() => {
    if (!sprites.length || selected) return undefined

    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time
      const dt = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time

      setSprites((prev) =>
        prev.map((sprite) => {
          const minX = 0
          const minY = 0
          const maxX = Math.max(0, stageSize.width - sprite.w)
          const maxY = Math.max(0, stageSize.height - sprite.h)

          let x = sprite.x + sprite.vx * dt
          let y = sprite.y + sprite.vy * dt
          let vx = sprite.vx
          let vy = sprite.vy

          if (x <= minX) {
            x = minX
            vx = Math.abs(vx)
          } else if (x >= maxX) {
            x = maxX
            vx = -Math.abs(vx)
          }

          if (y <= minY) {
            y = minY
            vy = Math.abs(vy)
          } else if (y >= maxY) {
            y = maxY
            vy = -Math.abs(vy)
          }

          return { ...sprite, x, y, vx, vy }
        })
      )

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTimeRef.current = 0
      rafRef.current = null
    }
  }, [selected, sprites.length, stageSize.height, stageSize.width])

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") setSelected(null)
    }
    window.addEventListener("keydown", onEscape)
    return () => window.removeEventListener("keydown", onEscape)
  }, [])

  return (
    <section className="paintingsPage">
      <div className="paintingsHeader">
        <h1>Paintings</h1>
        <p>Click a thumbnail to open a larger view.</p>
      </div>

      <div className="paintingsStage" ref={stageRef}>
        {sprites.map((sprite) => (
          <button
            key={sprite.id}
            type="button"
            className="paintingThumb"
            onClick={() => setSelected(sprite)}
            aria-label={`Open ${sprite.alt || "painting"}`}
            style={{
              width: `${sprite.w}px`,
              height: `${sprite.h}px`,
              transform: `translate3d(${Math.round(sprite.x)}px, ${Math.round(
                sprite.y
              )}px, 0)`,
            }}
          >
            <picture>
              {sprite.thumbHeic && <source srcSet={sprite.thumbHeic} type="image/heic" />}
              <img
                src={sprite.thumbSrc}
                srcSet={`${sprite.thumbSrc} 760w, ${sprite.fullSrc} 1800w`}
                sizes={`${Math.max(Math.round(sprite.w), 1)}px`}
                alt={sprite.alt || "painting"}
                draggable="false"
                loading="lazy"
              />
            </picture>
          </button>
        ))}

        {!sizedImages.length && (
          <div className="emptyState paintingEmpty">
            No images found in <code>src/assets/optimized/paintings/</code>
          </div>
        )}
      </div>

      {selected && (
        <div className="viewerOverlay" role="dialog" aria-modal="true">
          <button
            type="button"
            className="viewerBackdrop"
            onClick={() => setSelected(null)}
            aria-label="Close painting viewer"
          />
          <div className="viewerPanel">
            <button
              type="button"
              className="viewerClose"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="viewerFrame">
              <picture>
                {selected.fullHeic && <source srcSet={selected.fullHeic} type="image/heic" />}
                <img
                  src={selected.fullSrc}
                  srcSet={`${selected.thumbSrc} 760w, ${selected.fullSrc} 1800w`}
                  sizes="(max-width: 900px) 92vw, 1100px"
                  alt={selected.alt || "painting"}
                  draggable="false"
                />
              </picture>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
