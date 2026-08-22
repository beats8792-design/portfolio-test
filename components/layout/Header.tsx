"use client";

import { useTheme } from "@/context/use-theme";
import "./../../styles/components/header.scss";

export default function Header() {
  const { scrolled, navState, setNavState } = useTheme();

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <div className="jb_header">
      <div
        className="menu_btn"
        onClick={() =>
          navState === "close" ? setNavState("open") : setNavState("close")
        }
        data-cursor-type="link"
      >
        <div className="bar"></div>
        <span className="text">Menu</span>
      </div>

      {/* <div className="name">jazbah</div> */}

      <div className="scroller">
        <span
          className={`scroll_to_top ${scrolled > 90 ? "visible" : ""}`}
          onClick={scrollTop}
          data-cursor-type="link"
        >
          Scroll to top
        </span>

        <div className="scroll_bar">
          <div className="scroll_track">
            <div
              className="scroll_thumb"
              style={{ right: `${scrolled}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
