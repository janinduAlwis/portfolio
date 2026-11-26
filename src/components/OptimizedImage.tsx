import React from 'react';

export interface OptimizedAssetMeta {
  width: number;
  height: number;
  webpSrcSet?: string;
  avifSrcSet?: string;
  fallbackSrc: string;
}

const OPTIMIZED_ASSETS: Record<string, OptimizedAssetMeta> = {
  '/assets/hero.png': {
    width: 768,
    height: 908,
    webpSrcSet: '/assets/opt/hero-480.webp 480w, /assets/opt/hero-768.webp 768w',
    fallbackSrc: '/assets/hero.png',
  },
  '/assets/aistudio/redcode.png': {
    width: 802,
    height: 802,
    webpSrcSet: '/assets/opt/redcode-400.webp 400w, /assets/opt/redcode-802.webp 802w',
    fallbackSrc: '/assets/aistudio/redcode.png',
  },
  '/assets/aistudio/techstack.png': {
    width: 1536,
    height: 1024,
    avifSrcSet: '/assets/opt/techstack-480.avif 480w, /assets/opt/techstack-960.avif 960w',
    webpSrcSet: '/assets/opt/techstack-480.webp 480w, /assets/opt/techstack-960.webp 960w',
    fallbackSrc: '/assets/aistudio/techstack.png',
  },
  '/assets/aistudio/BoardLK_UX_Case_Study_f286eea3.png': {
    width: 1536,
    height: 1024,
    avifSrcSet:
      '/assets/opt/project-boardlk-480.avif 480w, /assets/opt/project-boardlk-960.avif 960w, /assets/opt/project-boardlk-1440.avif 1440w',
    webpSrcSet:
      '/assets/opt/project-boardlk-480.webp 480w, /assets/opt/project-boardlk-960.webp 960w, /assets/opt/project-boardlk-1440.webp 1440w',
    fallbackSrc: '/assets/aistudio/BoardLK_UX_Case_Study_f286eea3.png',
  },
  '/assets/aistudio/medlink.png': {
    width: 1410,
    height: 940,
    webpSrcSet:
      '/assets/opt/project-medlink-480.webp 480w, /assets/opt/project-medlink-960.webp 960w, /assets/opt/project-medlink-1410.webp 1410w',
    fallbackSrc: '/assets/aistudio/medlink.png',
  },
  '/assets/aistudio/livecrowds.png': {
    width: 1536,
    height: 1024,
    avifSrcSet:
      '/assets/opt/project-livecrowds-480.avif 480w, /assets/opt/project-livecrowds-960.avif 960w, /assets/opt/project-livecrowds-1440.avif 1440w',
    webpSrcSet:
      '/assets/opt/project-livecrowds-480.webp 480w, /assets/opt/project-livecrowds-960.webp 960w, /assets/opt/project-livecrowds-1440.webp 1440w',
    fallbackSrc: '/assets/aistudio/livecrowds.png',
  },
  '/assets/aistudio/helmet.png': {
    width: 1536,
    height: 1024,
    avifSrcSet:
      '/assets/opt/project-helmet-480.avif 480w, /assets/opt/project-helmet-960.avif 960w, /assets/opt/project-helmet-1440.avif 1440w',
    webpSrcSet:
      '/assets/opt/project-helmet-480.webp 480w, /assets/opt/project-helmet-960.webp 960w, /assets/opt/project-helmet-1440.webp 1440w',
    fallbackSrc: '/assets/aistudio/helmet.png',
  },
  '/assets/aistudio/image_f11c72f4.png': {
    width: 1536,
    height: 1024,
    avifSrcSet:
      '/assets/opt/lab-one-480.avif 480w, /assets/opt/lab-one-960.avif 960w, /assets/opt/lab-one-1440.avif 1440w',
    webpSrcSet:
      '/assets/opt/lab-one-480.webp 480w, /assets/opt/lab-one-960.webp 960w, /assets/opt/lab-one-1440.webp 1440w',
    fallbackSrc: '/assets/aistudio/image_f11c72f4.png',
  },
  '/assets/aistudio/image_db37e834.png': {
    width: 1672,
    height: 941,
    avifSrcSet:
      '/assets/opt/lab-two-480.avif 480w, /assets/opt/lab-two-960.avif 960w, /assets/opt/lab-two-1440.avif 1440w',
    webpSrcSet:
      '/assets/opt/lab-two-480.webp 480w, /assets/opt/lab-two-960.webp 960w, /assets/opt/lab-two-1440.webp 1440w',
    fallbackSrc: '/assets/aistudio/image_db37e834.png',
  },
  '/assets/aistudio/1.png': {
    width: 1536,
    height: 1024,
    avifSrcSet: '/assets/opt/skill-1-240.avif 240w, /assets/opt/skill-1-480.avif 480w',
    webpSrcSet: '/assets/opt/skill-1-240.webp 240w, /assets/opt/skill-1-480.webp 480w',
    fallbackSrc: '/assets/aistudio/1.png',
  },
  '/assets/aistudio/2.png': {
    width: 1536,
    height: 1024,
    avifSrcSet: '/assets/opt/skill-2-240.avif 240w, /assets/opt/skill-2-480.avif 480w',
    webpSrcSet: '/assets/opt/skill-2-240.webp 240w, /assets/opt/skill-2-480.webp 480w',
    fallbackSrc: '/assets/aistudio/2.png',
  },
  '/assets/aistudio/3.png': {
    width: 1536,
    height: 1024,
    avifSrcSet: '/assets/opt/skill-3-240.avif 240w, /assets/opt/skill-3-480.avif 480w',
    webpSrcSet: '/assets/opt/skill-3-240.webp 240w, /assets/opt/skill-3-480.webp 480w',
    fallbackSrc: '/assets/aistudio/3.png',
  },
  '/assets/aistudio/4.png': {
    width: 1536,
    height: 1024,
    avifSrcSet: '/assets/opt/skill-4-240.avif 240w, /assets/opt/skill-4-480.avif 480w',
    webpSrcSet: '/assets/opt/skill-4-240.webp 240w, /assets/opt/skill-4-480.webp 480w',
    fallbackSrc: '/assets/aistudio/4.png',
  },
  '/assets/aistudio/fsg_e9c92de9.jpg': {
    width: 630,
    height: 630,
    avifSrcSet: '/assets/opt/portrait-256.avif 256w, /assets/opt/portrait-480.avif 480w',
    webpSrcSet: '/assets/opt/portrait-256.webp 256w, /assets/opt/portrait-480.webp 480w',
    fallbackSrc: '/assets/aistudio/fsg_e9c92de9.jpg',
  },
  '/assets/sky-poster.jpg': {
    width: 1280,
    height: 720,
    avifSrcSet: '/assets/opt/sky-poster-640.avif 640w, /assets/opt/sky-poster-1280.avif 1280w',
    webpSrcSet: '/assets/opt/sky-poster-640.webp 640w, /assets/opt/sky-poster-1280.webp 1280w',
    fallbackSrc: '/assets/sky-poster.jpg',
  },
  '/assets/aistudio/unleash_7a61449e.jpg': {
    width: 800,
    height: 800,
    avifSrcSet: '/assets/opt/cert-ibm-480.avif 480w, /assets/opt/cert-ibm-800.avif 800w',
    webpSrcSet: '/assets/opt/cert-ibm-480.webp 480w, /assets/opt/cert-ibm-800.webp 800w',
    fallbackSrc: '/assets/aistudio/unleash_7a61449e.jpg',
  },
  '/assets/aistudio/1772535784146_696dd976.jpg': {
    width: 784,
    height: 608,
    avifSrcSet: '/assets/opt/cert-play-480.avif 480w, /assets/opt/cert-play-784.avif 784w',
    webpSrcSet: '/assets/opt/cert-play-480.webp 480w, /assets/opt/cert-play-784.webp 784w',
    fallbackSrc: '/assets/aistudio/1772535784146_696dd976.jpg',
  },
  '/assets/aistudio/1772554289027_f989df83.jpg': {
    width: 984,
    height: 761,
    avifSrcSet: '/assets/opt/cert-cisco-480.avif 480w, /assets/opt/cert-cisco-960.avif 960w',
    webpSrcSet: '/assets/opt/cert-cisco-480.webp 480w, /assets/opt/cert-cisco-960.webp 960w',
    fallbackSrc: '/assets/aistudio/1772554289027_f989df83.jpg',
  },
  '/assets/aistudio/1772607503067_ea3bcc77.jpg': {
    width: 1181,
    height: 914,
    avifSrcSet: '/assets/opt/cert-analytics-480.avif 480w, /assets/opt/cert-analytics-960.avif 960w',
    webpSrcSet: '/assets/opt/cert-analytics-480.webp 480w, /assets/opt/cert-analytics-960.webp 960w',
    fallbackSrc: '/assets/aistudio/1772607503067_ea3bcc77.jpg',
  },
  '/assets/aistudio/1772609271802_626f8e2f.jpg': {
    width: 1184,
    height: 914,
    avifSrcSet: '/assets/opt/cert-data-480.avif 480w, /assets/opt/cert-data-960.avif 960w',
    webpSrcSet: '/assets/opt/cert-data-480.webp 480w, /assets/opt/cert-data-960.webp 960w',
    fallbackSrc: '/assets/aistudio/1772609271802_626f8e2f.jpg',
  },
  '/assets/aistudio/1770986213556_cfd4c06a.jpg': {
    width: 1280,
    height: 989,
    avifSrcSet: '/assets/opt/cert-ads-480.avif 480w, /assets/opt/cert-ads-960.avif 960w',
    webpSrcSet: '/assets/opt/cert-ads-480.webp 480w, /assets/opt/cert-ads-960.webp 960w',
    fallbackSrc: '/assets/aistudio/1770986213556_cfd4c06a.jpg',
  },
  '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_34_54_AM-1_be18f3c9.png': {
    width: 280,
    height: 280,
    webpSrcSet: '/assets/opt/sym-1-280.webp 280w',
    fallbackSrc: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_34_54_AM-1_be18f3c9.png',
  },
  '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_01_AM-2_4f81eec5.png': {
    width: 280,
    height: 280,
    webpSrcSet: '/assets/opt/sym-2-280.webp 280w',
    fallbackSrc: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_01_AM-2_4f81eec5.png',
  },
  '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_05_AM-4_34ac1c20.png': {
    width: 280,
    height: 280,
    webpSrcSet: '/assets/opt/sym-4-280.webp 280w',
    fallbackSrc: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_05_AM-4_34ac1c20.png',
  },
  '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_08_AM-5_838f22ff.png': {
    width: 280,
    height: 280,
    webpSrcSet: '/assets/opt/sym-5-280.webp 280w',
    fallbackSrc: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_08_AM-5_838f22ff.png',
  },
  '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_11_AM-6_453fb98d.png': {
    width: 280,
    height: 280,
    webpSrcSet: '/assets/opt/sym-6-280.webp 280w',
    fallbackSrc: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_11_AM-6_453fb98d.png',
  },
  '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_14_AM-7_28e2bf50.png': {
    width: 280,
    height: 280,
    webpSrcSet: '/assets/opt/sym-7-280.webp 280w',
    fallbackSrc: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_14_AM-7_28e2bf50.png',
  },
  '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_16_AM-8_8cfe7366.png': {
    width: 280,
    height: 280,
    webpSrcSet: '/assets/opt/sym-8-280.webp 280w',
    fallbackSrc: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_16_AM-8_8cfe7366.png',
  },
  '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_21_AM-9_caeab0c1.png': {
    width: 280,
    height: 280,
    webpSrcSet: '/assets/opt/sym-9-280.webp 280w',
    fallbackSrc: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_21_AM-9_caeab0c1.png',
  },
  '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_22_AM-10_805e193f.png': {
    width: 280,
    height: 280,
    webpSrcSet: '/assets/opt/sym-10-280.webp 280w',
    fallbackSrc: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_22_AM-10_805e193f.png',
  },
};

export interface OptimizedImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  sizes?: string;
  pictureClassName?: string;
  ref?: React.Ref<HTMLImageElement>;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  sizes,
  pictureClassName = 'contents',
  loading = 'lazy',
  decoding = 'async',
  width,
  height,
  alt = '',
  ref,
  ...rest
}) => {
  const meta = OPTIMIZED_ASSETS[src];

  if (!meta) {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        {...rest}
      />
    );
  }

  return (
    <picture className={pictureClassName}>
      {meta.avifSrcSet && (
        <source type="image/avif" srcSet={meta.avifSrcSet} sizes={sizes} />
      )}
      {meta.webpSrcSet && (
        <source type="image/webp" srcSet={meta.webpSrcSet} sizes={sizes} />
      )}
      <img
        ref={ref}
        src={meta.fallbackSrc}
        alt={alt}
        width={width ?? meta.width}
        height={height ?? meta.height}
        loading={loading}
        decoding={decoding}
        {...rest}
      />
    </picture>
  );
};
