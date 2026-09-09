import React from "react";
import { Quoats } from "../others/Quoats";


const messages: string[] = [
  "FIRST, MAKE IT WORK. \nTHEN MAKE IT FAST. \nTHEN PRETEND IT WAS EASY.",

  "GOOD CODE IS CLEAN CODE. \nGREAT CODE IS CODE YOU DON'T HAVE TO TOUCH.",

  "WRITE CODE. \nBREAK CODE. \nFIX CODE. \nREPEAT.",

  "KEEP CALM \nAND CLEAR THE CACHE.",

  "THE CODE IS CLEAN. \nTHE GIT HISTORY IS NOT.",

  "SOME PEOPLE MEDITATE. \nI RUN NPM INSTALL.",

  "BUILD FAILED? \nGOOD. NOW WE KNOW WHERE TO START.",

  "YOUR IDEA IS GREAT. \nNOW LET'S MAKE IT A PRODUCTION.",

  "NO SLEEP. \nNO EXCUSES. \nJUST ONE MORE COMMIT.",

  "✓ CODE COMPILED.\n✓ BUGS SURVIVED.\n🚀 SHIP ANYWAY.",
];


export default function Motive() {
  return (
    <div className="jb_motive">
      <div className="container mx-auto px-4">
        <Quoats messages={messages} />
      </div>
    </div>
  );
}
