export default function Robots() {
  return (
    <section className="robotsPage contentPage">
      <div className="titleBlock">
        <h1>Robots</h1>
        <p>Interactive painting robots and clips of them at work.</p>
      </div>

      <article className="imageSection robotEntry">
        <h2>Penelope</h2>
        <div className="videoWrap">
          <iframe
            className="videoFrame"
            src="https://www.youtube.com/embed/uU8QoOK5FiY"
            title="Penelope"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <p>
          Penelope (RIP) was a converted 3D printer. She could be used in a turn-taking
          manner. The human user made a mark, then the canvas was photographed by a camera
          affixed to the top bar of the robot. Algorithms analysed the mark, decided on a
          response, and created the commands to allow the robot to execute the response. The
          process continued back and forth until the user was satisfied with the painting.
        </p>
      </article>

      <article className="imageSection robotEntry">
        <h2>LARA (Large Automated Robot Artist)</h2>
        <div className="videoWrap">
          <iframe
            className="videoFrame"
            src="https://www.youtube.com/embed/6lu-I4Mymzo"
            title="LARA (Large Automated Robot Artist)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <p>
          LARA (Large Automated Robot Artist) (RIP) was a custom-built larger version of
          Penelope. LARA could paint on canvas up to 80x80cm. The system ran on a BTT SKR 3
          control board, with customised Marlin firmware. This video shows a few clips
          of her at work (most of them sped up).
        </p>
      </article>

      <article className="imageSection robotEntry">
        <h2>IRA (Interactive Robot Arm)</h2>
        <div className="videoWrap">
          <iframe
            className="videoFrame"
            src="https://www.youtube.com/embed/hH3MwsmGNwg"
            title="IRA (Interactive Robot Arm)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <p>
          IRA (Interactive Robot Arm) ran the same collaborative painting program as
          Penelope. She had animatronic eyes. IRA was also integrated with the ChatGPT API,
          enabling her to speak to the user.
        </p>
        <p>
          IRA could also paint faces. A camera sat just under the animatronic eyes, and took
          a picture of whoever sat in front of the robot. Python code converted the picture
          into an outline image using Google’s MediaPipe AI models for image segmentation and
          face landmark detection. The robot then painted this outline onto paper.
        </p>
        <div className="videoWrap">
          <iframe
            className="videoFrame"
            src="https://www.youtube.com/embed/HPIydBfoQh4"
            title="IRA Face Painting"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </article>

      <section className="imageSection">
        <h2>Technical Paper</h2>
        <p>
          Technical information on IRA can be found in this paper:{" "}
          <a href="https://ieeexplore.ieee.org/document/11217914" target="_blank" rel="noreferrer">
            https://ieeexplore.ieee.org/document/11217914
          </a>
        </p>
      </section>
    </section>
  )
}
