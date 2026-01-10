import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Motion } from "@/motion/Motion";
import { useIntro } from "@/stores/IntroContext";

/* ASSETS */
import coverSvg from "@/assets/cover.svg";
import bg1 from "@/assets/intro-bg-1.svg";
import bg2 from "@/assets/intro-bg-2.svg";
import bg3 from "@/assets/intro-bg-3.svg";
import bg4 from "@/assets/intro-bg-4.svg";
import bg5 from "@/assets/intro-bg-5.svg";

/* CONFIG */
const BACKGROUNDS = [bg1, bg2, bg3, bg4, bg5];
const WORDS = ["GET", "WHAT", "YOU", "NEED"];

const STEP_MS = 1000;   // background switch interval
const WORD_DELAY = 480;
const EXIT_MS = 900;
const CAMERA_X = 14;    // subtle camera drift (px)

function IntroSpotlight() {
  const { setIntroFinished } = useIntro();

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const [shownWords, setShownWords] = useState<string[]>([]);
  const [animatedWords, setAnimatedWords] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BACKGROUNDS.forEach((_, i) => {
      const timer = setTimeout(() => {
        setIndex(i);

        /* WORD APPEAR (skip first background) */
        if (i > 0 && i <= WORDS.length) {
          const word = WORDS[i - 1];

          setShownWords((prev) =>
            prev.includes(word) ? prev : [...prev, word]
          );

          const wordTimer = setTimeout(() => {
            setAnimatedWords((prev) => {
              const next = new Set(prev);
              next.add(word);
              return next;
            });
          }, WORD_DELAY);

          timers.push(wordTimer);
        }

        /* EXIT AFTER LAST IMAGE */
        if (i === BACKGROUNDS.length - 1) {
          const exitTimer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => setIntroFinished(true), EXIT_MS);
          }, STEP_MS);

          timers.push(exitTimer);
        }
      }, i * STEP_MS);

      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [setIntroFinished]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key="intro"
          className="fixed inset-0 z-50 overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000 }}
        >
          {/* BACKGROUND (NO SKIPPING) */}
          <AnimatePresence mode="sync">
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, x: CAMERA_X }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -CAMERA_X }}
              transition={{
                duration: STEP_MS / 1000,
                ease: [0.42, 0, 0.58, 1],
              }}
              style={{
                backgroundImage: `url(${BACKGROUNDS[index]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </AnimatePresence>

          {/* SPOTLIGHT BLUR */}
          <div
            className="absolute inset-0 z-10 backdrop-blur-xs"
            style={{
              maskImage:
                "radial-gradient(circle 103px at 50% 50%, transparent 0%, transparent 99.9%, black 100%)",
              WebkitMaskImage:
                "radial-gradient(circle 103px at 50% 50%, transparent 0%, transparent 99.9%, black 100%)",
            }}
          />

          {/* COVER OVERLAY */}
          <img
            src={coverSvg}
            alt="cover overlay"
            className="absolute inset-0 z-20 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />

          {/* TEXT */}
          <div className="absolute top-32 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <h1 className="flex text-white text-[20px] font-extrabold uppercase tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {shownWords.map((word, i) => (
                <Motion
                  key={word}
                  variant="fadeIn"
                  show={animatedWords.has(word)}
                  duration="normal"
                  className="whitespace-nowrap"
                >
                  {word}
                  {i < shownWords.length - 1 && "\u00A0"}
                </Motion>
              ))}
            </h1>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default IntroSpotlight;
