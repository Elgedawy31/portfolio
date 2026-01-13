import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Motion } from "@/motion/Motion";
import { useIntro } from "@/stores/IntroContext";

const INITIAL_WORD = "GET";
const SECOND_WORD = "WHAT YOU WANT";
const SCALE_DURATION = 1.5; // seconds to scale from 12 to 1
const TEXT_CHANGE_DELAY = 0.3; // delay after scale reaches 1
const COLOR_CHANGE_DELAY = 0.4; // delay after scale reaches 1 (400ms)
const BG_CHANGE_DURATION = 0.6; // seconds to change background and color
const FADE_DURATION = 0.6; // seconds to fade out

function IntroSpotlightDesktop() {
  const { setIntroFinished } = useIntro();
  const [visible, setVisible] = useState(true);
  const [showWord, setShowWord] = useState(false);
  const [showSecondWord, setShowSecondWord] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#EBEBEB");
  const [textColor, setTextColor] = useState("#000000");

  useEffect(() => {
    // Show word after a brief moment
    const showTimer = setTimeout(() => setShowWord(true), 50);
    
    // After scale completes, show "WHAT YOU WANT"
    const textTimer = setTimeout(() => {
      setShowSecondWord(true);
    }, SCALE_DURATION * 1000 + TEXT_CHANGE_DELAY * 1000);

    // After text appears, change background and text color (400ms after scale completes)
    const colorTimer = setTimeout(() => {
      setBackgroundColor("#111111");
      setTextColor("#FFFFFF");
    }, SCALE_DURATION * 1000 + COLOR_CHANGE_DELAY * 1000);

    // After background change, hide and finish intro
    const totalDuration = (SCALE_DURATION + COLOR_CHANGE_DELAY + BG_CHANGE_DURATION + FADE_DURATION) * 1000;
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setIntroFinished(true), FADE_DURATION * 1000);
    }, totalDuration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(textTimer);
      clearTimeout(colorTimer);
      clearTimeout(hideTimer);
    };
  }, [setIntroFinished]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key="intro-desktop"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ backgroundColor: "#EBEBEB" }}
          animate={{ backgroundColor }}
          exit={{ opacity: 0 }}
          transition={{ 
            backgroundColor: { duration: BG_CHANGE_DURATION },
            opacity: { duration: FADE_DURATION }
          }}
        >
          {showWord && (
            <Motion
              variant="fadeIn"
              show={true}
              animateOnMount={true}
              duration="normal"
            >
              <motion.h1
                className="font-extrabold uppercase tracking-wide select-none text-[8rem] flex items-center whitespace-nowrap"
                initial={{ 
                  scale: 12,
                  color: "#000000",
                }}
                animate={{ 
                  scale: 1,
                  color: textColor,
                }}
                transition={{
                  scale: {
                    duration: SCALE_DURATION,
                    ease: [0.42, 0, 0.58, 1],
                  },
                  color: {
                    duration: BG_CHANGE_DURATION,
                    delay: COLOR_CHANGE_DELAY,
                  },
                }}
              >
                <span>{INITIAL_WORD}</span>
                {showSecondWord && (
                  <motion.span
                    className="ml-4"
                    initial={{ 
                      opacity: 0,
                    }}
                    animate={{ 
                      opacity: 1,
                    }}
                    transition={{
                      opacity: {
                        duration: 0.3,
                      },
                    }}
                  >
                    {SECOND_WORD}
                  </motion.span>
                )}
              </motion.h1>
            </Motion>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default IntroSpotlightDesktop;

