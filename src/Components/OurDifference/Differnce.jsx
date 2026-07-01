import "./Differnce.scss";

const experts = [
  "Former PSU Leadership",
  "Central Banking Professionals",
  "Infrastructure Specialists",
  "Energy Veterans",
  "Defense Professionals",
  "Policy Advisors",
  "Sector Technologists",
];

const positions = [
  "Senior Research Advisors",
  "Strategic Fellows",
  "Domain Experts",
  "Industry Specialists",
];

function Difference() {
  return (
    <section className="difference">

      <div className="container">

        <p className="sectionTag">
          OUR DIFFERENCE
        </p>

        <h2>
          Built on Experience,
          <br />
          Not Market Noise
        </h2>

        <div className="intro">

          <p>
            Noreste integrates insights from senior domain specialists,
            policymakers, sector veterans, engineers, economists and
            institutional practitioners who have spent decades operating
            inside critical industries.
          </p>

          <p>
            Our research is strengthened by practical understanding—not
            theoretical commentary alone. Every perspective is grounded in
            operational experience, long-term thinking and institutional
            knowledge.
          </p>

        </div>

        <div className="grid">

          <div className="left">

            <h3>Areas of Expertise</h3>

            {experts.map((item, index) => (
              <div className="row" key={index}>
                <span>{item}</span>
              </div>
            ))}

          </div>

          <div className="right">

            <h3>Research Network</h3>

            {positions.map((item, index) => (
              <div className="pill" key={index}>
                {item}
              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default Difference;