import {
  AnimationController,
  Animation,
  AnimationKeyFrames,
} from "@ionic/angular";

const DURATION = 500;
const animationCtrl = new AnimationController();

const slideIn = (baseEl: HTMLElement, opts?: any): Animation => {
  return animationCtrl
    .create()
    .addElement(baseEl)
    .duration(DURATION)
    .easing("cubic-bezier(0.250, 0.460, 0.450, 0.940)")
    .fill("both")
    .keyframes([
      { offset: 0, transform: "translateX(0)" },
      { offset: 1, transform: "translateX(-31%)" },
    ])
    .afterStyles({ "z-index": 10 });
};

const slideOut = (baseEl: HTMLElement, opts?: any): Animation => {
  return animationCtrl
    .create()
    .addElement(baseEl)
    .duration(DURATION)
    .easing("cubic-bezier(0.250, 0.460, 0.450, 0.940)")
    .fill("both")
    .keyframes([
      { offset: 0, transform: "translateX(-31%)" },
      { offset: 1, transform: "translateX(0)" },
    ])
    .afterStyles({ "z-index": 0 });
};

const fadeOut = (baseEl: HTMLElement, opts?: any): Animation => {
  return animationCtrl
    .create()
    .addElement(baseEl)
    .duration(DURATION)
    .easing("cubic-bezier(0.250, 0.460, 0.450, 0.940)")
    .fill("both")
    .direction("normal")
    .keyframes([
      { offset: 0, transform: "translateX(0)", opacity: 1 },
      { offset: 1, transform: "translateX(50px)", opacity: 0 },
    ])
    .afterStyles({ display: "none" });
};

const fadeIn = (baseEl: HTMLElement, opts?: any): Animation => {
  return animationCtrl
    .create()
    .addElement(baseEl)
    .duration(DURATION)
    .easing("cubic-bezier(0.250, 0.460, 0.450, 0.940)")
    .fill("both")
    .direction("normal")
    .keyframes([
      { offset: 0, transform: "translateX(50px)", opacity: 0 },
      { offset: 1, transform: "translateX(0)", opacity: 1 },
    ])
    .beforeStyles({ display: "grid" });
};

const mslideIn = (baseEl: HTMLElement, opts?: any): Animation => {
  return animationCtrl
    .create()
    .addElement(baseEl)
    .duration(DURATION)
    .easing("cubic-bezier(0.250, 0.460, 0.450, 0.940)")
    .fill("both")
    .keyframes([
      { offset: 0, transform: "translateX(0)" },
      { offset: 1, transform: "translateX(-100%)" },
    ]);
};

const mslideOut = (baseEl: HTMLElement, opts?: any): Animation => {
  return animationCtrl
    .create()
    .addElement(baseEl)
    .duration(DURATION)
    .easing("cubic-bezier(0.250, 0.460, 0.450, 0.940)")
    .fill("both")
    .keyframes([
      { offset: 0, transform: "translateX(-100%)" },
      { offset: 1, transform: "translateX(0)" },
    ]);
};

export const webAnimation = {
  fadeOut,
  fadeIn,
  slideOut,
  slideIn,
};

export const mobileAnimation = {
  fadeOut,
  fadeIn,
  slideOut: mslideOut,
  slideIn: mslideIn,
};
