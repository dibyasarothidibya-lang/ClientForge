"use client";

import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useEffect as useEyeEffect,
} from "react";
import { usePathname } from "next/navigation";
import styles from "./AnimatedLoginCharacters.module.css";

export type CharacterPlacards = {
  orange?: string;
  purple?: string;
  pink?: string;
  yellow?: string;
};

type Props = {
  passwordFocused: boolean;
  passwordVisible: boolean;
  emailFocused: boolean;
  mode?: "login" | "signup";
  placards?: CharacterPlacards;
};

const LOGIN_PLACARDS: Record<"orange" | "purple" | "pink" | "yellow", string> = {
  orange: "welcome back",
  purple: "HEY",
  pink: "let's go",
  yellow: "there you are",
};

const SIGNUP_PLACARDS: Record<"orange" | "purple" | "pink" | "yellow", string> = {
  orange: "let's get started",
  purple: "let the journey begin",
  pink: "here we go",
  yellow: "start today",
};

export default function AnimatedLoginCharacters({
  passwordFocused,
  passwordVisible,
  emailFocused,
  mode,
  placards,
}: Props) {
  const pathname = usePathname();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  const [entryPhase, setEntryPhase] = useState<"jumping" | "gathering" | "ready">("jumping");
  const [poked, setPoked] = useState<string | null>(null);

  const effectiveMode =
    mode || (pathname?.includes("signup") ? "signup" : "login");
  const defaultPlacards =
    effectiveMode === "signup" ? SIGNUP_PLACARDS : LOGIN_PLACARDS;

  const resolvedPlacards = {
    orange: placards?.orange ?? defaultPlacards.orange,
    purple: placards?.purple ?? defaultPlacards.purple,
    pink: placards?.pink ?? defaultPlacards.pink,
    yellow: placards?.yellow ?? defaultPlacards.yellow,
  };

  // Entrance choreography:
  // Phase 1 (0 - 700ms): Jump in from ground with bouncy overshoot
  // Phase 2 (700ms - 1700ms): Gather together toward center in a cute huddle
  // Phase 3 (1700ms+): Ready & unlocked to follow cursor wherever it moves
  useEffect(() => {
    const gatherTimer = setTimeout(() => {
      setEntryPhase("gathering");
    }, 700);

    const readyTimer = setTimeout(() => {
      setEntryPhase("ready");
    }, 1700);

    return () => {
      clearTimeout(gatherTimer);
      clearTimeout(readyTimer);
    };
  }, []);

  // Smooth pointer tracking across the screen
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
      if (!hasMouseMoved) setHasMouseMoved(true);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [hasMouseMoved]);

  // Click on a character to poke & trigger playful reaction
  const handlePoke = (char: string) => {
    setPoked(char);
    setTimeout(() => {
      setPoked(null);
    }, 600);
  };

  const privacyMode = passwordFocused || passwordVisible;
  const isReady = entryPhase === "ready";

  return (
    <div
      ref={sceneRef}
      className={`${styles.scene}
        ${styles[entryPhase]}
        ${emailFocused ? styles.emailFocus : ""}
        ${passwordFocused ? styles.passwordFocus : ""}
        ${passwordVisible ? styles.passwordVisible : ""}
      `}
    >
      <div className={styles.glow} />

      <div className={styles.characters}>
        <Character
          className={`${styles.orange} ${poked === "orange" ? styles.poked : ""}`}
          mouse={mouse}
          hasMouseMoved={hasMouseMoved}
          privacyMode={privacyMode}
          passwordVisible={passwordVisible}
          emailFocused={emailFocused}
          isReady={isReady}
          entryPhase={entryPhase}
          character="orange"
          placardText={resolvedPlacards.orange}
          onClick={() => handlePoke("orange")}
        />

        <Character
          className={`${styles.purple} ${poked === "purple" ? styles.poked : ""}`}
          mouse={mouse}
          hasMouseMoved={hasMouseMoved}
          privacyMode={privacyMode}
          passwordVisible={passwordVisible}
          emailFocused={emailFocused}
          isReady={isReady}
          entryPhase={entryPhase}
          character="purple"
          placardText={resolvedPlacards.purple}
          onClick={() => handlePoke("purple")}
        />

        <Character
          className={`${styles.pink} ${poked === "pink" ? styles.poked : ""}`}
          mouse={mouse}
          hasMouseMoved={hasMouseMoved}
          privacyMode={privacyMode}
          passwordVisible={passwordVisible}
          emailFocused={emailFocused}
          isReady={isReady}
          entryPhase={entryPhase}
          character="pink"
          placardText={resolvedPlacards.pink}
          onClick={() => handlePoke("pink")}
        />

        <Character
          className={`${styles.yellow} ${poked === "yellow" ? styles.poked : ""}`}
          mouse={mouse}
          hasMouseMoved={hasMouseMoved}
          privacyMode={privacyMode}
          passwordVisible={passwordVisible}
          emailFocused={emailFocused}
          isReady={isReady}
          entryPhase={entryPhase}
          character="yellow"
          placardText={resolvedPlacards.yellow}
          onClick={() => handlePoke("yellow")}
        />
      </div>

      {/* Playful hint at bottom */}
      <div className={styles.sceneBadge}>
        <span>Interactive Characters</span>
      </div>
    </div>
  );
}

type PlacardProps = {
  text: string;
  character: "purple" | "pink" | "yellow" | "orange";
  privacyMode: boolean;
};

function Placard({ text, character, privacyMode }: PlacardProps) {
  const pawGradients: Record<string, string> = {
    orange: "linear-gradient(180deg, #ffb36c, #ff7a28)",
    purple: "linear-gradient(145deg, #9b72f8, #6437e2)",
    pink: "linear-gradient(145deg, #f76fb0, #ce2b79)",
    yellow: "linear-gradient(145deg, #ffea85, #f9c922)",
  };

  const stickHeights: Record<string, number> = {
    orange: 26,
    purple: 40,
    pink: 32,
    yellow: 30,
  };

  return (
    <div
      className={`${styles.placard} ${styles[`placard_${character}`]} ${
        privacyMode ? styles.placardPrivacy : ""
      }`}
      style={{
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      {/* Real physical signboard card with crisp white background, border, and shadow */}
      <div
        className={styles.placardCard}
        style={{
          backgroundColor: "#ffffff",
          color: "#0f172a",
          border: "2px solid #0f172a",
          borderRadius: "8px",
          padding: "5px 11px 4px 11px",
          boxShadow:
            "0 6px 16px rgba(15, 23, 42, 0.18), 0 2px 4px rgba(15, 23, 42, 0.1)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "nowrap",
          position: "relative",
          zIndex: 6,
        }}
      >
        {/* Rivet pin at top center */}
        <div
          className={styles.placardPin}
          style={{
            position: "absolute",
            top: "3px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "4px",
            height: "4px",
            backgroundColor: "#94a3b8",
            borderRadius: "50%",
            boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.4)",
          }}
        />
        {/* Placard Text */}
        <span
          className={styles.placardText}
          style={{
            fontFamily: "var(--font-sans), 'Inter', -apple-system, sans-serif",
            fontSize: "11px",
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: character === "purple" ? "0.03em" : "-0.01em",
            color: "#0f172a",
            userSelect: "none",
          }}
        >
          {text}
        </span>
      </div>

      {/* Wooden Stick Dowel */}
      <div
        className={styles.placardStick}
        style={{
          width: "4px",
          height: `${stickHeights[character] || 28}px`,
          background: "linear-gradient(180deg, #dfb889 0%, #b8864e 100%)",
          border: "0.5px solid #8e5f2b",
          borderRadius: "2px",
          marginTop: "-1px",
          position: "relative",
          zIndex: 4,
          boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.22)",
        }}
      />

      {/* Paws Gripping the Pole */}
      <div
        className={styles.placardHands}
        style={{
          position: "absolute",
          bottom: "0px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          zIndex: 10,
        }}
      >
        <span
          className={`${styles.paw} ${styles[`paw_${character}`]}`}
          style={{
            display: "block",
            width: "9.5px",
            height: "9.5px",
            borderRadius: "50%",
            background: pawGradients[character],
            border: "1.5px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0 1.5px 3px rgba(0, 0, 0, 0.25)",
          }}
        />
        <span
          className={`${styles.paw} ${styles[`paw_${character}`]}`}
          style={{
            display: "block",
            width: "9.5px",
            height: "9.5px",
            borderRadius: "50%",
            background: pawGradients[character],
            border: "1.5px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0 1.5px 3px rgba(0, 0, 0, 0.25)",
          }}
        />
      </div>
    </div>
  );
}

type CharacterProps = {
  className: string;
  mouse: {
    x: number;
    y: number;
  };
  hasMouseMoved: boolean;
  privacyMode: boolean;
  passwordVisible: boolean;
  emailFocused: boolean;
  isReady: boolean;
  entryPhase: "jumping" | "gathering" | "ready";
  character: "purple" | "pink" | "yellow" | "orange";
  placardText?: string;
  onClick: () => void;
};

function Character({
  className,
  mouse,
  hasMouseMoved,
  privacyMode,
  passwordVisible,
  emailFocused,
  isReady,
  entryPhase,
  character,
  placardText,
  onClick,
}: CharacterProps) {
  const leftEye = useRef<HTMLSpanElement>(null);
  const rightEye = useRef<HTMLSpanElement>(null);
  const charRef = useRef<HTMLDivElement>(null);

  const dotEyes = character === "yellow" || character === "orange";

  // Subtle 3D lean towards mouse when ready and not looking away
  useEffect(() => {
    if (!isReady || privacyMode || !charRef.current || !hasMouseMoved) return;

    const rect = charRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const dx = (mouse.x - centerX) / (window.innerWidth / 2 || 1);
    const clampedDx = Math.max(-1, Math.min(1, dx));

    const leanDeg = clampedDx * 3.5;
    charRef.current.style.setProperty("--lean", `${leanDeg}deg`);
  }, [mouse, isReady, privacyMode, hasMouseMoved]);

  return (
    <div
      ref={charRef}
      className={`${styles.character} ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      title="Click to interact!"
    >
      {/* For purple, render the clip-path polygon body layer */}
      {character === "purple" && <div className={styles.purpleBody} />}

      {/* Placard held proudly in paws */}
      {placardText && (
        <Placard
          text={placardText}
          character={character}
          privacyMode={privacyMode}
        />
      )}

      <div className={styles.face}>
        <div className={styles.eyes}>
          <Eye
            ref={leftEye}
            mouse={mouse}
            hasMouseMoved={hasMouseMoved}
            privacyMode={privacyMode}
            passwordVisible={passwordVisible}
            emailFocused={emailFocused}
            isReady={isReady}
            entryPhase={entryPhase}
            dotEye={dotEyes}
            character={character}
          />

          <Eye
            ref={rightEye}
            mouse={mouse}
            hasMouseMoved={hasMouseMoved}
            privacyMode={privacyMode}
            passwordVisible={passwordVisible}
            emailFocused={emailFocused}
            isReady={isReady}
            entryPhase={entryPhase}
            dotEye={dotEyes}
            character={character}
          />
        </div>

        {character === "pink" && <div className={styles.pinkBlush} />}
        <span className={styles.mouth} />
      </div>
    </div>
  );
}

type EyeProps = {
  mouse: {
    x: number;
    y: number;
  };
  hasMouseMoved: boolean;
  privacyMode: boolean;
  passwordVisible: boolean;
  emailFocused: boolean;
  isReady: boolean;
  entryPhase: "jumping" | "gathering" | "ready";
  dotEye: boolean;
  character: "purple" | "pink" | "yellow" | "orange";
};

const Eye = forwardRef<HTMLSpanElement, EyeProps>(
  (
    {
      mouse,
      hasMouseMoved,
      privacyMode,
      passwordVisible,
      emailFocused,
      isReady,
      entryPhase,
      dotEye,
      character,
    },
    ref
  ) => {
    const internalRef = useRef<HTMLSpanElement>(null);

    const eyeRef =
      typeof ref === "object" && ref ? ref : internalRef;

    const pupilRef = useRef<HTMLSpanElement>(null);

    useEyeEffect(() => {
      const eye = eyeRef.current;
      if (!eye) return;

      /*
       * 1. PASSWORD SHOWN / VISIBLE MODE
       *
       * Exaggerated dramatic look away:
       * Form is on the right, so characters strictly look FAR to the left.
       * Pupils snap to the far left corner.
       */
      if (passwordVisible) {
        if (dotEye) {
          if (character === "yellow") {
            // Yellow looks straight up at the ceiling whistling
            eye.style.transform = "translate(-2px, -6px)";
          } else {
            // Orange looks far away to the bottom-left
            eye.style.transform = "translate(-6px, 1px)";
          }
        } else if (pupilRef.current) {
          if (character === "purple") {
            // Purple darts pupils all the way to the far left
            pupilRef.current.style.transform =
              "translate(calc(-50% - 6px), calc(-50% - 1px))";
          } else {
            // Pink squints shut or darts left
            pupilRef.current.style.transform =
              "translate(calc(-50% - 5px), calc(-50% - 1px))";
          }
        }
        return;
      }

      /*
       * 2. PASSWORD FOCUSED PRIVACY MODE
       *
       * Characters politely look away to the left.
       */
      if (privacyMode) {
        if (dotEye) {
          eye.style.transform = "translate(-4px, -1px)";
        } else if (pupilRef.current) {
          pupilRef.current.style.transform =
            "translate(calc(-50% - 4px), calc(-50% - 1px))";
        }
        return;
      }

      /*
       * 3. EMAIL FOCUSED MODE
       *
       * Characters look intently to the right towards the email input!
       */
      if (emailFocused) {
        if (dotEye) {
          eye.style.transform = "translate(3.5px, -1px)";
        } else if (pupilRef.current) {
          pupilRef.current.style.transform =
            "translate(calc(-50% + 3.5px), calc(-50% - 1px))";
        }
        return;
      }

      /*
       * 4. ENTRANCE GATHERING PHASE
       *
       * Characters look at each other / inward during the huddle.
       */
      if (entryPhase === "gathering") {
        const huddleX = character === "yellow" ? -3 : character === "orange" ? 3 : 0;
        if (dotEye) {
          eye.style.transform = `translate(${huddleX}px, 1px)`;
        } else if (pupilRef.current) {
          pupilRef.current.style.transform =
            `translate(calc(-50% + ${huddleX}px), calc(-50% + 1px))`;
        }
        return;
      }

      /*
       * 5. ACTIVE CURSOR FOLLOWING MODE
       *
       * When unlocked and ready, track the mouse across the page.
       */
      if (!isReady || !hasMouseMoved) {
        // Default resting forward gaze
        if (dotEye) {
          eye.style.transform = "translate(0px, 0px)";
        } else if (pupilRef.current) {
          pupilRef.current.style.transform = "translate(-50%, -50%)";
        }
        return;
      }

      const rect = eye.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = mouse.x - centerX;
      const dy = mouse.y - centerY;

      const distance = Math.hypot(dx, dy) || 1;
      const maxMovement = dotEye ? 3.5 : 4.5;

      const amount = Math.min(maxMovement, distance / 26);

      const x = (dx / distance) * amount;
      const y = (dy / distance) * amount;

      if (dotEye) {
        eye.style.transform = `translate(${x}px, ${y}px)`;
      } else if (pupilRef.current) {
        pupilRef.current.style.transform =
          `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      }
    }, [
      mouse,
      hasMouseMoved,
      privacyMode,
      passwordVisible,
      emailFocused,
      isReady,
      entryPhase,
      dotEye,
      character,
      eyeRef,
    ]);

    return (
      <span
        ref={eyeRef}
        className={`${styles.eye} ${dotEye ? styles.dotEye : ""} ${
          styles[`eye_${character}`] || ""
        }`}
      >
        {!dotEye && (
          <span ref={pupilRef} className={styles.pupil} />
        )}
      </span>
    );
  }
);

Eye.displayName = "Eye";
