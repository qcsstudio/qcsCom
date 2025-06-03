"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
// --- Helper Functions ---
function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}
function getLocalPointerPos(e, rect) {
  let clientX = 0,
    clientY = 0;
  if ("touches" in e && e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ("clientX" in e) {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  if (!rect) return { x: clientX, y: clientY };
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}
function getMouseDistance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}
// --- ImageItem Class ---
class ImageItem {
  constructor(DOM_el) {
    this.DOM = { el: DOM_el, inner: null };
    if (this.DOM.el) {
      this.DOM.inner = this.DOM.el.querySelector(".content__img-inner");
    }
    this.defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
    this.rect = null;
    this.resizeHandler = () => {
      if (!this.DOM.el) return;
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };
    this.initEvents();
    this.getRect();
  }
  initEvents() {
    window.addEventListener("resize", this.resizeHandler);
  }
  destroy() {
    window.removeEventListener("resize", this.resizeHandler);
  }
  getRect() {
    if (this.DOM.el) {
      this.rect = this.DOM.el.getBoundingClientRect();
    }
  }
}
// --- ImageTrailVariant1 (with example cleanup) ---
class ImageTrailVariant1 {
  constructor(container) {
    this.container = container;
    const imgElements = Array.from(container.querySelectorAll(".content__img"));
    this.images = imgElements.map((img) => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };
    this.animationFrameId = null;
    // Store bound event handlers for easy removal
    this.boundHandlePointerMove = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    this.boundInitRender = (ev) => {
      if (!this.container) return;
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      if (this.animationFrameId === null) {
        this.animationFrameId = requestAnimationFrame(this.boundRenderLoop);
      }
      this.container.removeEventListener("mousemove", this.boundInitRender);
      this.container.removeEventListener("touchmove", this.boundInitRender);
    };
    this.boundRenderLoop = this.render.bind(this);
    if (this.imagesTotal === 0) {
      // Initialize bound functions even if no images, to prevent errors in destroy
      this.boundHandlePointerMove = () => {};
      this.boundInitRender = () => {};
      this.boundRenderLoop = () => {};
      return;
    }
    this.container.addEventListener("mousemove", this.boundHandlePointerMove);
    this.container.addEventListener("touchmove", this.boundHandlePointerMove);
    this.container.addEventListener("mousemove", this.boundInitRender);
    this.container.addEventListener("touchmove", this.boundInitRender);
  }
  render() {
    if (!this.container) {
      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      return;
    }
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    this.animationFrameId = requestAnimationFrame(this.boundRenderLoop);
  }
  showNextImage() {
    if (this.imagesTotal === 0) return;
    ++this.zIndexVal;
    this.imgPosition = (this.imgPosition + 1) % this.imagesTotal;
    const img = this.images[this.imgPosition];
    if (!img || !img.DOM.el || !img.rect) return;
    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.4,
          ease: "power1",
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        },
        0
      )
      .to(
        img.DOM.el,
        { duration: 0.4, ease: "power3", opacity: 0, scale: 0.2 },
        0.4
      );
  }
  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }
  destroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.container) {
      this.container.removeEventListener("mousemove", this.boundHandlePointerMove);
      this.container.removeEventListener("touchmove", this.boundHandlePointerMove);
      this.container.removeEventListener("mousemove", this.boundInitRender);
      this.container.removeEventListener("touchmove", this.boundInitRender);
    }
    this.images.forEach((img) => img.destroy());
  }
}
// --- Placeholder for other variants ---
class ImageTrailVariant2 extends ImageTrailVariant1 {}
class ImageTrailVariant3 extends ImageTrailVariant1 {}
class ImageTrailVariant4 extends ImageTrailVariant1 {}
class ImageTrailVariant5 extends ImageTrailVariant1 {}
class ImageTrailVariant6 extends ImageTrailVariant1 {}
class ImageTrailVariant7 extends ImageTrailVariant1 {}
class ImageTrailVariant8 extends ImageTrailVariant1 {}
const variantMap = {
  1: ImageTrailVariant1,
  2: ImageTrailVariant2,
  3: ImageTrailVariant3,
  4: ImageTrailVariant4,
  5: ImageTrailVariant5,
  6: ImageTrailVariant6,
  7: ImageTrailVariant7,
  8: ImageTrailVariant8,
};
export const ImageTrail = ({
  items = [],
  variant = 1,
  className = "",
  style = {},
  imageClassName = "w-[190px] aspect-[1.1] rounded-[15px]",
  imageInnerClassName = "bg-center bg-cover w-[calc(100%+20px)] h-[calc(100%+20px)] absolute top-[-10px] left-[-10px]",
  imageWidth,
  imageAspectRatio,
}) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;
    const Cls = variantMap[variant] || variantMap[1];
    if (!Cls) {
      console.error(`ImageTrail: Variant ${variant} class not found.`);
      return;
    }
    const instance = new Cls(containerRef.current);
    return () => {
      if (instance && typeof instance.destroy === "function") {
        instance.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, items]);
  let finalImageClasses = `content__img absolute top-0 left-0 opacity-0 overflow-hidden pointer-events-none select-none ${imageClassName}`;
  let imageStyles = { willChange: "transform, opacity, filter" };
  if (imageWidth) {
    finalImageClasses = finalImageClasses.replace(/w-\[.*?\]/g, '').replace(/w-\d+/g, '');
    imageStyles.width = imageWidth;
  }
  if (imageAspectRatio) {
    finalImageClasses = finalImageClasses.replace(/aspect-\[.*?\]/g, '');
    imageStyles.aspectRatio = imageAspectRatio;
  }
  if (items.length === 0) {
    return (
      <div className={`w-full h-full flex justify-center items-center ${className}`} style={style}>
        <p>No images for trail.</p>
      </div>
    );
  }
  return (
    <div
      className={`w-full h-full relative z-[100] bg-transparent ${className}`}
      ref={containerRef}
      style={style}
    >
      {items.map((url, i) => (
        <div
          className={finalImageClasses}
          style={imageStyles}
          key={`${variant}-${i}-${url}`}
        >
          <div
            className={`content__img-inner ${imageInnerClassName}`}
            style={{ backgroundImage: `url(${url})` }}
          />
        </div>
      ))}
    </div>
  );
};