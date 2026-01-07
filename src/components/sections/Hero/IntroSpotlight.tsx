import { useEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion"

type SpotlightStep = {
  label: string
  x: number // percentage of viewport width
  y: number // percentage of viewport height
}

interface IntroSpotlightProps {
  backgroundImage: string
  steps?: SpotlightStep[]
  spotlightRadius?: number
  stepDuration?: number
  exitDuration?: number
  ease?: "easeInOut" | "linear" | "easeIn" | "easeOut" | "easeInOut"
  overlayColor?: string
  sessionKey?: string
  runOnce?: boolean
  respectReducedMotion?: boolean
  onFinished?: () => void
  enableCursorFollowAfter?: boolean
}

const DEFAULT_STEPS: SpotlightStep[] = [
  { label: "GET", x: 20, y: 35 },
  { label: "WHAT", x: 150, y: 130 },
  { label: "YOU", x: -60, y: 550 },
  { label: "NEED", x: 0, y: -20 },
]

const DEFAULT_SESSION_KEY = "intro-spotlight-played"

function IntroSpotlight({
  backgroundImage,
  steps: stepsProp,
  spotlightRadius = 130,
  stepDuration = 1,
  exitDuration = 0.8,
  ease = "easeInOut",
  // Can be a solid color or gradient
  overlayColor = "linear-gradient(180deg, #111111 0%, rgba(17,17,17,0) 100%)",
  sessionKey = DEFAULT_SESSION_KEY,
  runOnce = true,
  respectReducedMotion = true,
  onFinished,
  enableCursorFollowAfter = false,
}: IntroSpotlightProps) {
  const shouldReduceMotion = useReducedMotion()

  const steps = useMemo(
    () => (stepsProp && stepsProp.length > 0 ? stepsProp : DEFAULT_STEPS),
    [stepsProp],
  )

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [isMounted, setIsMounted] = useState(true)
  const [shouldRender, setShouldRender] = useState(false)

  // Motion values control the background image position (camera move)
  const x = useMotionValue(steps[0]?.x ?? 50)
  const y = useMotionValue(steps[0]?.y ?? 50)

  const falloffRadius = spotlightRadius + 80

  // Spotlight stays centered on the screen; we move the background underneath.
  const maskImage = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent 0, transparent ${spotlightRadius}px, black ${falloffRadius}px, black 100%)`

  // Background position follows the animated motion values (percentages)
  const backgroundPosition = useMotionTemplate`${x}% ${y}%`

  useEffect(() => {
    if (typeof window === "undefined") return

    if (respectReducedMotion && shouldReduceMotion) {
      setIsMounted(false)
      return
    }

    if (runOnce && window.sessionStorage.getItem(sessionKey)) {
      setIsMounted(false)
      return
    }

    if (!steps.length) {
      setIsMounted(false)
      return
    }

    let cancelled = false

    const runSequence = async () => {
      setShouldRender(true)

      for (let i = 0; i < steps.length; i += 1) {
        if (cancelled) return

        const step = steps[i]
        setCurrentStepIndex(i)

        const xAnim = animate(x, step.x, {
          duration: stepDuration,
          ease,
        })

        const yAnim = animate(y, step.y, {
          duration: stepDuration,
          ease,
        })

        await Promise.all([xAnim.finished, yAnim.finished])
      }

      if (cancelled) return

      setIsExiting(true)

      window.setTimeout(() => {
        if (cancelled) return

        if (runOnce) {
          window.sessionStorage.setItem(sessionKey, "1")
        }
        onFinished?.()

        if (!enableCursorFollowAfter) {
          setIsMounted(false)
        }
      }, exitDuration * 1000)
    }

    void runSequence()

    return () => {
      cancelled = true
    }
  }, [
    ease,
    enableCursorFollowAfter,
    exitDuration,
    onFinished,
    runOnce,
    respectReducedMotion,
    sessionKey,
    shouldReduceMotion,
    stepDuration,
    steps,
    x,
    y,
  ])

  useEffect(() => {
    if (!enableCursorFollowAfter || !isExiting) return
    if (typeof window === "undefined") return

    const handleMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      if (!innerWidth || !innerHeight) return

      const percentX = (event.clientX / innerWidth) * 100
      const percentY = (event.clientY / innerHeight) * 100

      animate(x, percentX, { duration: 0.4, ease: "easeOut" })
      animate(y, percentY, { duration: 0.4, ease: "easeOut" })
    }

    window.addEventListener("pointermove", handleMove)

    return () => {
      window.removeEventListener("pointermove", handleMove)
    }
  }, [enableCursorFollowAfter, isExiting, x, y])

  if (!isMounted || !shouldRender || !steps.length) {
    return null
  }

  const activeStep = steps[currentStepIndex] ?? steps[steps.length - 1]

  return (
    <motion.div
      className="pointer-events-auto fixed inset-0 z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting && !enableCursorFollowAfter ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        pointerEvents: isExiting && !enableCursorFollowAfter ? "none" : "auto",
      }}
    >
      {/* Base background image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition,
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Gradient overlay applied everywhere (including inside the circle) */}
      <div
        className="absolute inset-0"
        style={{
          background: overlayColor,
        }}
        aria-hidden="true"
      />

      {/* Blur overlay with a circular hole in the center (no blur inside circle) */}
      <motion.div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: maskImage as unknown as string,
          maskImage: maskImage as unknown as string,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          backdropFilter: "blur(6px)",
        }}
        aria-hidden="true"
      />

      {/* Centered “eye” circle with gradient border and inner vignette */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="relative flex items-center justify-center"
          style={{
            width: spotlightRadius * 2,
            height: spotlightRadius * 2,
            borderRadius: "9999px",
          }}
        >
          {/* Border + subtle radial darkening towards the edge */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "9999px",
              border: "1px solid transparent",
              background:
                "radial-gradient(circle, rgba(17,17,17,0) 60%, rgba(17,17,17,1) 100%)",
              boxShadow:
                "0 0 0 1px #FFFFFF, 0 0 0 2px #494949",
            }}
          />

          {/* Animated text inside the eye */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeStep.label}-${currentStepIndex}`}
              initial={{ opacity: 0, scale: 0.96, letterSpacing: "0.18em" }}
              animate={{ opacity: 1, scale: 1, letterSpacing: "0.24em" }}
              exit={{ opacity: 0, scale: 1.04, letterSpacing: "0.28em" }}
              transition={{
                duration: stepDuration * 0.6,
                ease: "easeInOut",
              }}
              className="relative select-none text-center font-semibold uppercase tracking-[0.24em] text-white"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                textShadow:
                  "0 0 16px rgba(0,0,0,0.8), 0 0 32px rgba(0,0,0,0.8)",
              }}
            >
              {activeStep.label}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0, transparent 50%, rgba(0,0,0,0.35) 100%)",
        }}
        aria-hidden="true"
      />
    </motion.div>
  )
}

export default IntroSpotlight