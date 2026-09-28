/* ============================================================================
   SITE CONTENT — EDIT THIS FILE ONLY
   ----------------------------------------------------------------------------
   Everything students need to update lives here. No HTML knowledge required.
   Rules: keep the quotes, keep the commas, keep the square/curly brackets.
   Anything written as "TODO:" is a placeholder we don't know yet — replace it.
   ========================================================================== */

window.SITE = {

  /* --- Club identity -------------------------------------------------- */
  club: {
    name: "Aerospace Club",
    school: "Emerald High School",
    location: "Dublin, California",
    // One line. Keep it short and confident.
    tagline: "We design, build, and fly. No experience required.",
    // Shown under the hero headline.
    intro:
      "A student-run engineering program at Emerald High School building model rockets, " +
      "CubeSat concepts, and autonomous aircraft — from first sketch to launch day.",
    advisor: "TODO: Advisor name",
    email: "TODO: club email address",
    meeting: {
      day: "TODO: e.g. Every Thursday",
      time: "TODO: e.g. 3:30 – 4:45 PM",
      room: "TODO: e.g. Room 214, STEM Wing",
    },
  },

  /* --- Hero telemetry strip (decorative readouts) ---------------------- */
  // Purely cosmetic HUD numbers. Change or delete freely.
  telemetry: [
    { label: "Members",        value: 0,  suffix: "+", note: "TODO: update" },
    { label: "Launches",       value: 0,  suffix: "",  note: "TODO: update" },
    { label: "Active builds",  value: 0,  suffix: "",  note: "TODO: update" },
    { label: "Max altitude",   value: 0,  suffix: " ft", note: "TODO: update" },
  ],

  /* --- Mission / About ------------------------------------------------- */
  mission: {
    body: [
      "Aerospace Club is where students who are curious about flight actually get to " +
      "build something that leaves the ground. We run on real engineering cycles: " +
      "design reviews, build sessions, test flights, and honest post-flight analysis.",
      "You do not need to already know CAD, code, or rocketry. Most members start " +
      "knowing none of it. We pair new members with returning ones and teach the rest " +
      "on the workbench.",
    ],
    pillars: [
      {
        title: "Build",
        text: "Hands on hardware every week — airframes, avionics bays, recovery systems, airframe repair.",
      },
      {
        title: "Simulate",
        text: "OpenRocket, Fusion 360, and flight-sim work so we know the answer before we light the motor.",
      },
      {
        title: "Compete",
        text: "We prepare teams for regional and national aerospace competitions each spring.",
      },
      {
        title: "Launch",
        text: "Scheduled launch days at an approved field, with a full safety brief and range officer.",
      },
    ],
  },

  /* --- Projects --------------------------------------------------------- */
  // status: "Active" | "In design" | "Flown" | "Archived"
  projects: [
    {
      code: "PR-01",
      title: "Level 1 Model Rocket",
      status: "Active",
      text: "A single-stage high-power airframe with dual-deploy recovery. Our standard " +
            "platform for teaching build technique, stability margin, and recovery sizing.",
      tags: ["Airframe", "Recovery", "OpenRocket"],
    },
    {
      code: "PR-02",
      title: "CubeSat Concept Study",
      status: "In design",
      text: "A 1U CubeSat design exercise: power budget, thermal envelope, comms link " +
            "margin, and a structural model — carried through a full preliminary design review.",
      tags: ["Systems", "CAD", "Power budget"],
    },
    {
      code: "PR-03",
      title: "Autonomous Drone Platform",
      status: "Active",
      text: "A quadcopter running open-source flight control, used for waypoint " +
            "navigation experiments and onboard sensor logging.",
      tags: ["Flight control", "Telemetry", "Python"],
    },
    {
      code: "PR-04",
      title: "Avionics & Telemetry Bay",
      status: "In design",
      text: "A student-built altimeter and radio downlink so every flight returns data, " +
            "not just a recovered airframe.",
      tags: ["Electronics", "Firmware", "Data"],
    },
    {
      code: "PR-05",
      title: "Wind Tunnel Test Rig",
      status: "TODO: status",
      text: "TODO: describe this project, or delete this entry.",
      tags: ["Aerodynamics", "Testing"],
    },
    {
      code: "PR-06",
      title: "TODO: Your next project",
      status: "In design",
      text: "TODO: Copy this block to add more projects. Delete it if you don't need it.",
      tags: ["TODO"],
    },
  ],

  /* --- Events ----------------------------------------------------------- */
  // date: ISO format "YYYY-MM-DDTHH:MM" in local time. The soonest FUTURE event
  // automatically becomes the countdown target — you don't set that separately.
  events: [
    {
      date: "2026-10-15T15:30",
      title: "TODO: Weekly Build Session",
      kind: "Meeting",
      place: "TODO: Room",
      text: "TODO: what happens at this meeting.",
    },
    {
      date: "2026-11-07T09:00",
      title: "TODO: Fall Launch Day",
      kind: "Launch",
      place: "TODO: launch field",
      text: "TODO: details, what to bring, permission slip info.",
    },
    {
      date: "2026-12-05T08:00",
      title: "TODO: Design Review",
      kind: "Review",
      place: "TODO: Room",
      text: "TODO: details.",
    },
    {
      date: "2027-03-14T08:00",
      title: "TODO: Regional Competition",
      kind: "Competition",
      place: "TODO: venue",
      text: "TODO: details.",
    },
  ],

  /* --- Officers --------------------------------------------------------- */
  // photo: put a file in assets/img/ and write "assets/img/name.jpg".
  // Leave photo as "" to show initials instead — that looks fine, no rush.
  officers: [
    { name: "TODO: Name", role: "President",      photo: "", grade: "TODO: Class of ----" },
    { name: "TODO: Name", role: "Vice President", photo: "", grade: "TODO: Class of ----" },
    { name: "TODO: Name", role: "Chief Engineer", photo: "", grade: "TODO: Class of ----" },
    { name: "TODO: Name", role: "Safety Officer", photo: "", grade: "TODO: Class of ----" },
    { name: "TODO: Name", role: "Treasurer",      photo: "", grade: "TODO: Class of ----" },
    { name: "TODO: Name", role: "Outreach Lead",  photo: "", grade: "TODO: Class of ----" },
  ],

  /* --- Gallery ---------------------------------------------------------- */
  // Drop photos in assets/img/ and point src at them. alt text is required —
  // it's what screen readers announce. Describe the photo in a few words.
  gallery: [
    { src: "", alt: "TODO: describe this photo", caption: "TODO: caption" },
    { src: "", alt: "TODO: describe this photo", caption: "TODO: caption" },
    { src: "", alt: "TODO: describe this photo", caption: "TODO: caption" },
    { src: "", alt: "TODO: describe this photo", caption: "TODO: caption" },
    { src: "", alt: "TODO: describe this photo", caption: "TODO: caption" },
    { src: "", alt: "TODO: describe this photo", caption: "TODO: caption" },
    { src: "", alt: "TODO: describe this photo", caption: "TODO: caption" },
    { src: "", alt: "TODO: describe this photo", caption: "TODO: caption" },
  ],

  /* --- Join / links ------------------------------------------------------ */
  join: {
    // A Google Form works well here. Leave "" to hide the button.
    signupUrl: "",
    signupNote: "TODO: replace with your sign-up form link (a Google Form is fine).",
    steps: [
      "Show up to any meeting — you can join mid-year.",
      "TODO: any form, fee, or permission slip required.",
      "Pick a project team and start building.",
    ],
  },

  // Leave a url as "" and that link disappears from the site automatically.
  socials: [
    { name: "Instagram", url: "", handle: "TODO: @handle" },
    { name: "Discord",   url: "", handle: "TODO: invite link" },
    { name: "Email",     url: "", handle: "TODO: club email" },
  ],
};
