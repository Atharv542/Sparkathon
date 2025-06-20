import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const promos = [
  {
    title: "Upgrade your home with stylish furniture",
    link: `/category/furniture`,
    image:"https://th.bing.com/th/id/OIP.TxVIFj6vFIJy2tGB7kFVhAHaE8?rs=1&pid=ImgDetMain",
    bg: "bg-blue-100",
  },
  
  {
    // Animated center promo (kept empty)
  },
  {
    title: "Fresh groceries delivered to your doorstep",
    link: `/category/groceries`,
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=800&q=80",
    bg: "bg-gray-100",
  },
  
  {
    title: "Latest electronic items at unbeatable prices",
    link: `/category/electronics`,
    image: "https://th.bing.com/th/id/OIP.mw6baeuYQrCJ2ASYsLY2NwHaDF?rs=1&pid=ImgDetMain",
    bg: "bg-rose-100",
  },
  {
    title: "Stylish footwears and watches for modern men",
    link: `/category/men`,
    image: "https://i.pinimg.com/originals/f6/70/e0/f670e036d26c7a32d33c76ce8a7895c7.jpg",
    bg: "bg-green-100",
  },
  {
    title: "Trendy styles collection for modern women",
    link: `/category/women`,
    image: "https://marketplace.canva.com/EAFVHstxnwk/1/0/800w/canva-beige-aesthetic-exclusive-fashion-wear-collection-clothing-banner-yv-HRWs1aMc.jpg",
    bg: "bg-amber-100",
  },
  {
    title: "Fragrances that leave a lasting impression",
    link: `/category/fragrances`,
    image: "https://png.pngtree.com/png-clipart/20220429/original/pngtree-realistic-perfume-banner-bottle-glass-png-image_7565082.png",
    bg: "bg-pink-100",
  },
];

const sliderImages = [
  "https://cdn.shopify.com/s/files/1/0153/8863/files/Headphone-Zone-Experience-Studio-Homepage-Final_1300x.progressive.jpg?v=1626436828", // Headphones
  "https://thumbs.dreamstime.com/b/abstract-sunglasses-colored-lenses-discount-banner-sale-modern-design-fashion-trendy-154986353.jpg", // Sunglasses
  "https://png.pngtree.com/png-clipart/20220419/original/pngtree-simple-atmosphere-fashion-sneaker-banner-poster-png-image_7541732.png", // Sneakers
];

const HomePromos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {promos.map((promo, index) => {
        // Center animated div
        if (index === 1) {
          return (
            <div
              key="slider"
              className="md:col-span-2  lg:col-span-2 rounded-lg bg-gray-100 p-6 flex items-center justify-center relative overflow-hidden h-[350px]"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={sliderImages[currentIndex]}
                  src={sliderImages[currentIndex]}
                  alt="slider"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full object-contain absolute"
                />
              </AnimatePresence>
              <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full shadow">
                <h2 className="font-bold text-xl text-gray-800">
                  Hot summer savings on trending items
                </h2>
              </div>
            </div>
          );
        }

        if (!promo.title) return null;

        return (
          <div
            key={index}
            className={`rounded-lg ${promo.bg} hover:shadow-lg transition`}
          >
            <img
              src={promo.image}
              alt={promo.title}
              className="w-full rounded-xl h-60 object-cover mb-4"
            />
            <h3 className="text-lg px-4 font-semibold">{promo.title}</h3>
            <a
              href={promo.link}
              className="text-blue-600 underline px-4 text-sm mb-2 inline-block"
            >
              Shop now
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default HomePromos;

