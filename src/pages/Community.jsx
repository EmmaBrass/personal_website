import communityPaper from "../assets/page-images/community/Community_IEEE_RAM_coloumn.pdf"

export default function Community() {
  return (
    <section className="contentPage">
      <div className="titleBlock">
        <h1>Community</h1>
        <p>
          Community is a reconfigurable, physically distributed system of interacting
          LLM-driven personas.
        </p>
      </div>

      <article className="imageSection">
        <div className="videoWrap">
          <iframe
            className="videoFrame"
            src="https://www.youtube.com/embed/mZ42f997iCs"
            title="Community Version 1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <p>
          The project started with heads and brains. The full system is shown in the video
          above.
        </p>

        <p>
          How it works: Each head contains a Raspberry Pi computer, which is connected to an
          RFID tag reader that sits near the top surface of the head. An RFID tag is stuck to
          the underside of each brain. A persona is associated with the ID number of each RFID
          tag; in this way, a unique persona is linked to each brain. When a particular brain
          is placed on a head, the persona for that brain is loaded into the head. This persona
          includes a particular voice, personal history, interests, and opinions about certain
          topics. The heads within a group then converse.
        </p>

        <p>
          Later on, I broadened the idea to just inanimate objects. The video below shows some
          inanimate objects talking to each other, powered by the Community system.
        </p>

        <div className="videoWrap">
          <iframe
            className="videoFrame"
            src="https://www.youtube.com/embed/XfSy-SiEaYs"
            title="Community Inanimate Objects"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </article>

      <section className="imageSection">
        <h2>Paper</h2>
        <p>
          More information about Community can be found in this paper:{" "}
          <a href={communityPaper} target="_blank" rel="noreferrer">
            Community IEEE RAM column (PDF)
          </a>
        </p>
      </section>
    </section>
  )
}
