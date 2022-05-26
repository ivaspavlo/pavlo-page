import React, { useState, useEffect } from "react";
import "@components/footer/Footer.module.scss";

function Footer() {
  const [state, setState] = useState(false);

  useEffect(() => {
    return () => {}
  }, []);

  return <section>
    footer
  </section>;
}

export default Footer;
