import {
  AnimationController,
  Animation,
  AnimationKeyFrames,
} from "@ionic/angular";

const DURATION = 250;
const animationCtrl = new AnimationController();

export const enterAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
  const backdropAnimation = animationCtrl
    .create()
    .addElement(baseEl.querySelector("ion-backdrop")!)
    .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

  const wrapperAnimation = animationCtrl
    .create()
    .addElement(baseEl.querySelector(".loading-wrapper")!)
    .keyframes([
      { offset: 0, opacity: "0", transform: "translateY(150%)" },
      { offset: 1, opacity: "0.99", transform: "translateY(0)" },
    ]);

  return animationCtrl
    .create()
    .addElement(baseEl)
    .easing("ease-in")
    .duration(DURATION)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};

export const leaveAnimation = (baseEl: HTMLElement, opts: any): Animation => {
  const backdropAnimation = animationCtrl
    .create()
    .addElement(baseEl.querySelector("ion-backdrop")!)
    .fromTo("opacity", "var(--backdrop-opacity)", "0.01");

  const wrapperAnimation = animationCtrl
    .create()
    .addElement(baseEl.querySelector(".loading-wrapper")!)
    .keyframes([
      { offset: 0, opacity: "0.99", transform: "translateY(0)" },
      { offset: 1, opacity: "0", transform: "translateY(150%)" },
    ]);

  return animationCtrl
    .create()
    .addElement(baseEl)
    .easing("ease-out")
    .duration(DURATION)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};
