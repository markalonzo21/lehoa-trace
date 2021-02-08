import { AnimationController, Animation } from "@ionic/angular";

export const navAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
  const DURATION = 250;
  const animationCtrl = new AnimationController();

  console.log("opts", opts);

  document.addEventListener("backbutton", (ev) => console.log(ev));

  if (opts.direction === "forward") {
    //   prettier-ignore
    return animationCtrl
      .create()
      .addElement(opts.enteringEl)
      .duration(DURATION)
      .fill('both')
      .easing('cubic-bezier(.39,.575,.565,1.000)')
      .keyframes([
          { offset: 0, transform: 'translateX(50px)', opacity: 0 },
          { offset: 1, transform: 'translateZ(0)', opacity: 1 },
      ])
  } else {
    //   prettier-ignore
    const rootAnimation = animationCtrl
      .create()
      .addElement(opts.enteringEl)
      .duration(DURATION)
      .fill("both")
      .easing('cubic-bezier(.39,.575,.565,1.000)')
      .keyframes([
        { offset: 0, transform: 'translateX(50px)', opacity: 1 },
        { offset: 1, transform: 'translateZ(0)', opacity: 0 },
      ]);
    //   prettier-ignore
    const leavingAnimation = animationCtrl
      .create()
      .addElement(opts.leavingEl)
      .duration(DURATION)
      .easing('cubic-bezier(.25,.46,.45,.94)')
      .fill('both')
      .keyframes([
        { offset: 0, transform: 'translateZ(0)', opacity: 1 },
        { offset: 1, transform: 'translateX(50px)', opacity: 0 },
      ]);

    return animationCtrl
      .create()
      .addAnimation([rootAnimation, leavingAnimation]);
  }
};
