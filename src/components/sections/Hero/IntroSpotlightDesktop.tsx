import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Motion } from "@/motion/Motion";
import { useIntro } from "@/stores/IntroContext";

const INITIAL_WORD = "GET";
const SECOND_WORD = "WHAT YOU WANT";
const SCALE_DURATION = 0.8; // seconds to scale from 12 to 1
const TEXT_CHANGE_DELAY = 0.15; // delay after scale reaches 1
const SECOND_WORD_EXPAND_DURATION = 0.4; // duration for second word to expand
const FADE_DURATION = 0.4; // seconds to fade out

function IntroSpotlightDesktop() {
  const { setIntroFinished } = useIntro();
  const [visible, setVisible] = useState(true);
  const [showWord, setShowWord] = useState(false);
  const [showSecondWord, setShowSecondWord] = useState(false);

  useEffect(() => {
    // Show word after a brief moment
    const showTimer = setTimeout(() => setShowWord(true), 50);
    
    // After scale completes, show "WHAT YOU WANT" with width expansion (last animation)
    const textTimer = setTimeout(() => {
      setShowSecondWord(true);
    }, SCALE_DURATION * 1000 + TEXT_CHANGE_DELAY * 1000);

    // After second word appears, hide and finish intro
    const totalDuration = (SCALE_DURATION + TEXT_CHANGE_DELAY + SECOND_WORD_EXPAND_DURATION + FADE_DURATION) * 1000;
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setIntroFinished(true), FADE_DURATION * 1000);
    }, totalDuration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(textTimer);
      clearTimeout(hideTimer);
    };
  }, [setIntroFinished]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key="intro-desktop"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#EBEBEB]"
          exit={{ opacity: 0 }}
          transition={{ 
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
                className="font-normal uppercase tracking-wide select-none text-[96px] flex items-center whitespace-nowrap text-black"
                initial={{ 
                  scale: 12,
                  color: "#00000033",
                }}
                animate={{ 
                  scale: 1,
                  color: "#000000",
                }}
                transition={{
                  scale: {
                    duration: SCALE_DURATION,
                    ease: [0.42, 0, 0.58, 1],
                  },
                  color: {
                    duration: SCALE_DURATION,
                  },
                }}
              >
                <span>{INITIAL_WORD}</span>
                {showSecondWord && (
                  <motion.span
                    className="ml-2 inline-block overflow-hidden whitespace-nowrap"
                    initial={{ 
                      opacity: 0,
                      maxWidth: 0,
                    }}
                    animate={{ 
                      opacity: 1,
                      maxWidth: "80vw",
                    }}
                    transition={{
                      opacity: {
                        duration: 0.2,
                        delay: SECOND_WORD_EXPAND_DURATION * 0.3,
                      },
                      maxWidth: {
                        duration: SECOND_WORD_EXPAND_DURATION,
                        ease: [0, 0, 0.58, 1], // ease-out
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

