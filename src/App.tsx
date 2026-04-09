/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hotel, 
  Home, 
  Car, 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Sparkles,
  X,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

type Category = 'stays' | 'homes' | 'drive' | null;

interface EnquiryData {
  location: string;
  dates: string;
  guests: string;
  preferences: string;
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<any | null>(null);
  const [selectedShortlet, setSelectedShortlet] = useState<any | null>(null);
  const [selectedCar, setSelectedCar] = useState<any | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<EnquiryData>({
    location: '',
    dates: '',
    guests: '',
    preferences: ''
  });

  const phHotels = [
    {
      id: 'echelon',
      name: 'Echelon Heights Hotel',
      location: '73 Ken Saro-Wiwa Rd, Port Harcourt, Rivers',
      price: '30,000',
      images: [
        'https://www.hotelscombined.com/rimg/himg/fa/fa/17/expedia_group-2284512-195964036-218492.jpg?width=968&height=607&crop=true',
        'https://echelonheights.com/media/1479380492714A3780.jpg'
      ],
      description: 'Experience unparalleled luxury and comfort in the heart of Port Harcourt.'
    },
    {
      id: 'landmark',
      name: 'Land Mark Hotel',
      location: '4 Worlu St, D-line, Port Harcourt, Rivers',
      price: '50,000',
      images: [
        'https://images.timbu.com/hotels-ng/supplier_4i4vg01nc4_3_900x550.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0c/7e/43/c2/landmark-hotels-port.jpg',
        'https://landmarkhotels.com.ng/wp-content/uploads/2020/04/DJI_0157.jpg'
      ],
      description: 'A landmark of hospitality offering world-class amenities and service.'
    },
    {
      id: 'dmatel',
      name: 'Dmatel Gold hotel',
      location: '91 Stadium Rd, Rumuomasi, Port Harcourt, Rivers',
      price: '40,000',
      images: [
        'https://hrelisting.com/wp-content/uploads/2022/02/Dmatel-Onyx-Hotel-Superior-Room.jpg',
        'https://www.dmatelhotels.com.ng/rooms/gra2-ph/superior-room2.jpg'
      ],
      description: 'Modern elegance meets traditional warmth in this premium stay.'
    },
    {
      id: 'heliconia',
      name: 'Heliconia Hotel',
      location: 'Eastern Bypass, Ogbunabali, Amadi, Rivers',
      price: '80,000',
      images: [
        'https://images.trvl-media.com/lodging/84000000/83080000/83078400/83078322/fc1cd831.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
        'https://www.heliconiaparkhotels.com/port-harcourt/assets/img/restaurant1.jpg',
        'https://q-xx.bstatic.com/xdata/images/hotel/max500/373718300.jpg?k=0fe93c496556445f6b1985ee117ba035240f6fbb917963331b21bdff437c1fb4&o='
      ],
      description: 'A serene and luxurious retreat offering exceptional hospitality and comfort.'
    },
    {
      id: 'leadwort',
      name: 'Leadwort hotel',
      location: 'Oriji St, 2 Chief Chukwuka Amadi St, Airport Road, Port Harcourt, Rivers',
      price: '45,000',
      images: [
        'https://images.trvl-media.com/lodging/112000000/111070000/111068500/111068494/909ce907.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
        'https://images.trvl-media.com/lodging/104000000/103780000/103778400/103778328/w1242h932x0y7-47168e1f.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill'
      ],
      description: 'Experience refined comfort and world-class service at Leadwort.'
    },
    {
      id: 'casoni',
      name: 'Casoni international hotels and suites Ltd',
      location: '6 Presbyterian Close, Off Stadium Road, opposite RCCG, Rumuomasi, Port Harcourt',
      price: '50,000',
      images: [
        'https://casoni.com.ng/wp-content/uploads/2021/11/13-788x504-7771.jpg',
        'https://casoni.com.ng/wp-content/uploads/2021/11/casoni_rooms_4a-788x504-1.jpg',
        'https://casoni.com.ng/wp-content/uploads/2021/11/25-788x504-1.jpg'
      ],
      description: 'A premium destination for business and leisure travelers in Port Harcourt.'
    }
  ];

  const phShortlets = [
    {
      id: 'studio-room',
      name: 'Studio room',
      location: 'GRA sani abacha',
      price: '90,000',
      images: [
        'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM5NDIyMDExODcwNjgxMDEwNA%3D%3D/original/5b86c7d8-050a-4693-9b41-02e03f96caeb.jpeg',
        'https://q-xx.bstatic.com/xdata/images/hotel/max500/752608682.jpg?k=5e45e14fb236eb69bdc498816c290a39258906f7994088c2945a0d1cf474fe1e&o=',
        'https://q-xx.bstatic.com/xdata/images/hotel/max500/752608737.jpg?k=f68bdaca4b9a2186e8a5a2cebd0c362accf5f8f747ccc315005bd22a096a83d4&o='
      ],
      description: 'A modern and cozy studio room located in the heart of GRA Sani Abacha, offering comfort and convenience for your stay.'
    },
    {
      id: 'diamond-blue',
      name: 'Diamond Blue',
      location: 'GRA Sani Abacha, Port Harcourt, Rivers',
      price: '180,000',
      images: [
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/752605403.jpg?k=5a2637b087a9b1fa7b36e49f8f3072d7faa26cc8e61fe4586e64c90600c20bc2&o=&hp=1',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/752602965.jpg?k=d72bfd988ae61698a2675e5603610a7ab1c6ae6734e4c4cd40e66ff8e3614142&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/752608817.jpg?k=41955275ef9abd252ecd295435196dada9ec0301888cb1df51b0cf6b8ec246fd&o='
      ],
      description: 'Experience unparalleled luxury at Diamond Blue. Tastefully finished 3 bedroom apartments with 24-hour power supply and premium amenities.'
    }
  ];

  const phCars = [
    {
      id: 'gx-460',
      name: 'GX 460',
      location: 'Port Harcourt, Rivers State',
      price: '',
      images: [
        'https://images.dealersync.com/2174/Photos/826466/20220510223658719_IMG_6371.jpg?_=743cb49fa9df567a3ddcfc880d45e73cbc146174',
        'https://images.carloaded.com/large/jjvPZz3LxLIlu8PyhWr43Ta5ifBJg0B7s0AOSGcrMoQfa2wNL9.jpeg',
        'https://img.nigeriacarmart.com/upload/25/8p/iz7d/2015-lexus-gx-gx-460-jd.webp'
      ],
      description: 'Commanding presence and peerless luxury. Perfect for navigating the city in absolute comfort.'
    },
    {
      id: 'range-rover-velar',
      name: 'Range Rover velar',
      location: 'Port Harcourt, Rivers State',
      price: '',
      images: [
        'https://www.autocollectionofmurfreesboro.com/imagetag/17619/main/l/Used-2018-Land-Rover-Range-Rover-Velar-P380-FIRST-EDITION-W94K-MSRP!!-1718852884.jpg',
        'https://images.cars.ng/images/cars-ng/product_ca603791s_foreign_used_2018_range_rover_velar_p250_s_for_sale_in_lagos_1771920743850_5gi5jj_5eeb1c_4_500x500.jpg',
        'https://images.cars.ng/images/cars-ng/product_ca603791s_foreign_used_2018_range_rover_velar_p250_s_for_sale_in_lagos_1771920743850_5gi5jj_0e5cf9_8_500x500.jpg'
      ],
      description: 'The ultimate blend of reliability and luxury. Ideal for both city drives and longer journeys.'
    },
    {
      id: 'luxury-bus',
      name: '43 seater luxury bus',
      location: 'Port Harcourt, Rivers State',
      price: '',
      images: [
        'https://s.alicdn.com/@sc04/kf/He3c64517b48a4684b9369555a8fa9a08g/Best-Selling-Used-Youtong-Second-Hand-Bus-49-Seats-Bus-Transports-Coach-Buss-for-Sale.jpg'
      ],
      description: 'Premium group travel experience with maximum comfort, climate control, and spacious seating for large delegations.'
    },
    {
      id: 'delivery-trucks',
      name: 'Delivery Trucks',
      location: 'Port Harcourt, Rivers State',
      price: '',
      images: [
        'https://www.truck1.com.ng/img/xxl/7117/Scania-P-270-6x2-manual-9-85-box-Netherlands_7117_312397052339.jpg',
        'https://www.daibau.ng/showfile.php?id=23861'
      ],
      description: 'Reliable logistics and haulage solutions for all your delivery needs. Professional service for safe and timely transport.'
    }
  ];

  const categories = [
    {
      id: 'stays' as const,
      title: 'Hotels',
      subtitle: 'Luxury Stays',
      icon: <Hotel className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
      description: 'Curated collection of the world\'s most prestigious hotels and resorts.'
    },
    {
      id: 'homes' as const,
      title: 'Shortlet',
      subtitle: 'Private Estates',
      icon: <Home className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      description: 'Exclusive access to architectural masterpieces and hidden villas.'
    },
    {
      id: 'drive' as const,
      title: 'Car Rentals',
      subtitle: 'Private Fleet',
      icon: <Car className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
      description: 'A fleet of exceptional vehicles for your most refined journeys.'
    }
  ];

  const handleCategorySelect = (id: Category) => {
    setSelectedCategory(id);
    setStep(1);
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const reset = () => {
    setSelectedCategory(null);
    setSelectedLocation(null);
    setSelectedHotel(null);
    setSelectedShortlet(null);
    setSelectedCar(null);
    setStep(1);
    setFormData({ location: '', dates: '', guests: '', preferences: '' });
  };

  const HotelImageSlider = ({ images, name }: { images: string[], name: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (images.length <= 1) return;
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(timer);
    }, [images.length]);

    return (
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${name} ${currentIndex + 1}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {images.map((_, i) => (
              <motion.div 
                key={i} 
                animate={{ 
                  scale: currentIndex === i ? 1.2 : 1,
                  backgroundColor: currentIndex === i ? "#C5A059" : "rgba(255, 255, 255, 0.5)"
                }}
                className="w-1.5 h-1.5 rounded-full" 
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-gold/30">
      {/* Navigation */}
      <nav className="p-8 flex justify-between items-center z-50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif tracking-[0.2em] uppercase font-light text-charcoal"
        >
          Elite Bookings
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex space-x-12 text-[11px] uppercase tracking-[0.3em] font-semibold text-charcoal/80"
        >
          <button onClick={reset} className="hover:text-gold transition-colors">Home</button>
        </motion.div>
      </nav>

      <main className="flex-grow flex flex-col items-center px-6 md:px-12">
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.section 
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-7xl mt-12 md:mt-24 mb-24"
            >
              <div className="text-center mb-20">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[12px] uppercase tracking-[0.5em] text-gold font-bold mb-4 block"
                >
                  Unrivaled Travel Experiences
                </motion.span>
                <h1 className="text-6xl md:text-8xl font-light tracking-tight leading-none mb-8 text-charcoal">
                  The Art of <br />
                  <span className="italic font-serif">Exceptional</span> Travel & Stay
                </h1>
                <p className="text-charcoal/80 max-w-xl mx-auto text-lg font-normal leading-relaxed">
                  Bespoke journeys designed for those who seek the extraordinary. 
                  Where would you like to begin?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((cat, idx) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    whileHover={{ y: -10 }}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-[4/5] bg-charcoal"
                  >
                    <img 
                      src={cat.image} 
                      alt={cat.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="mb-4 text-gold/80">{cat.icon}</div>
                      <h3 className="text-3xl text-cream font-serif mb-1">{cat.title}</h3>
                      <p className="text-gold text-[11px] uppercase tracking-[0.3em] font-bold mb-4">{cat.subtitle}</p>
                      <p className="text-cream/90 text-sm font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {cat.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ) : ((selectedCategory === 'stays' || selectedCategory === 'homes' || selectedCategory === 'drive') && !selectedLocation) ? (
            <motion.section 
              key="location-landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-5xl mt-12 mb-24 relative"
            >
              <button 
                onClick={() => setSelectedCategory(null)}
                className="absolute -top-16 left-0 flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-[11px] uppercase tracking-[0.3em] text-charcoal font-bold shadow-sm hover:bg-gold hover:text-cream transition-all group"
              >
                <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to selection
              </button>

              <div className="text-center mb-16">
                <span className="text-[12px] uppercase tracking-[0.5em] text-gold font-bold mb-4 block">Select Your Destination</span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
                  {selectedCategory === 'stays' ? 'Hotels' : selectedCategory === 'homes' ? 'Shortlets' : 'Car Rentals'} in <span className="italic font-serif">Nigeria</span>
                </h2>
                <p className="text-charcoal/60 max-w-lg mx-auto font-normal">
                  Explore our curated selection of ultra-luxury {selectedCategory === 'stays' ? 'stays' : selectedCategory === 'homes' ? 'private estates' : 'private fleet'} in the most exclusive regions.
                </p>
              </div>

              <div className="flex justify-center">
                <motion.div
                  whileHover={{ y: -10 }}
                  onClick={() => {
                    setSelectedLocation('Port Harcourt, Rivers State');
                  }}
                  className="group cursor-pointer relative overflow-hidden rounded-3xl aspect-[16/9] w-full max-w-3xl bg-charcoal shadow-2xl shadow-gold/10"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1200" 
                    alt="Port Harcourt"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 p-12 flex flex-col justify-end items-center text-center">
                    <h3 className="text-5xl text-cream font-serif mb-2">Port Harcourt</h3>
                    <p className="text-gold text-[12px] uppercase tracking-[0.4em] font-bold">Rivers State</p>
                    <div className="mt-8 flex items-center text-cream/40 text-[10px] uppercase tracking-[0.2em] group-hover:text-gold transition-colors">
                      Explore Properties <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30 pointer-events-none">
                {['Lagos', 'Abuja', 'Enugu'].map(city => (
                  <div key={city} className="border border-charcoal/10 rounded-2xl p-8 text-center grayscale">
                    <span className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold mb-2 block">Coming Soon</span>
                    <h4 className="text-xl font-serif text-charcoal/60">{city}</h4>
                  </div>
                ))}
              </div>
            </motion.section>
          ) : (selectedCategory === 'stays' && selectedLocation && !selectedHotel) ? (
            <motion.section 
              key="hotel-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-6xl mt-12 mb-24 relative"
            >
              <button 
                onClick={() => setSelectedLocation(null)}
                className="absolute -top-16 left-0 flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-[11px] uppercase tracking-[0.3em] text-charcoal font-bold shadow-sm hover:bg-gold hover:text-cream transition-all group"
              >
                <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to locations
              </button>

              <div className="grid grid-cols-1 gap-12">
                {phHotels.map((hotel, idx) => (
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-gold/5 flex flex-col lg:flex-row group hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="lg:w-1/2 relative overflow-hidden aspect-video lg:aspect-auto h-[350px] lg:h-auto">
                      <HotelImageSlider images={hotel.images} name={hotel.name} />
                    </div>
                    <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-3xl md:text-4xl font-serif text-charcoal mb-2">{hotel.name}</h3>
                          <div className="flex items-center text-charcoal/40 text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-gold" />
                            {hotel.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">Per Night</span>
                          <span className="text-2xl font-serif text-charcoal">₦{hotel.price}</span>
                        </div>
                      </div>
                      <p className="text-charcoal/60 font-normal leading-relaxed mb-10 max-w-md">
                        {hotel.description}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <a 
                          href={`https://wa.me/2347072253857?text=${encodeURIComponent(`Hello, I would like to book a stay at ${hotel.name}.\n\nLocation: ${hotel.location}\nPrice: ₦${hotel.price}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-charcoal text-cream px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-colors shadow-lg shadow-charcoal/10 inline-block"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ) : (selectedCategory === 'homes' && selectedLocation && !selectedShortlet) ? (
            <motion.section 
              key="shortlet-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-6xl mt-12 mb-24 relative"
            >
              <button 
                onClick={() => setSelectedLocation(null)}
                className="absolute -top-16 left-0 flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-[11px] uppercase tracking-[0.3em] text-charcoal font-bold shadow-sm hover:bg-gold hover:text-cream transition-all group"
              >
                <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to locations
              </button>

              <div className="grid grid-cols-1 gap-12">
                {phShortlets.map((shortlet, idx) => (
                  <motion.div
                    key={shortlet.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-gold/5 flex flex-col lg:flex-row group hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="lg:w-1/2 relative overflow-hidden aspect-video lg:aspect-auto h-[350px] lg:h-auto">
                      <HotelImageSlider images={shortlet.images} name={shortlet.name} />
                    </div>
                    <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-3xl md:text-4xl font-serif text-charcoal mb-2">{shortlet.name}</h3>
                          <div className="flex items-center text-charcoal/40 text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-gold" />
                            {shortlet.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">Per Night</span>
                          <span className="text-2xl font-serif text-charcoal">₦{shortlet.price}</span>
                        </div>
                      </div>
                      <p className="text-charcoal/60 font-normal leading-relaxed mb-10 max-w-md">
                        {shortlet.description}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <a 
                          href={`https://wa.me/2347072253857?text=${encodeURIComponent(`Hello, I would like to book a shortlet stay at ${shortlet.name}.\n\nLocation: ${shortlet.location}\nPrice: ₦${shortlet.price}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-charcoal text-cream px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-colors shadow-lg shadow-charcoal/10 inline-block"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ) : (selectedCategory === 'drive' && selectedLocation && !selectedCar) ? (
            <motion.section 
              key="car-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-6xl mt-12 mb-24 relative"
            >
              <button 
                onClick={() => setSelectedLocation(null)}
                className="absolute -top-16 left-0 flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-[11px] uppercase tracking-[0.3em] text-charcoal font-bold shadow-sm hover:bg-gold hover:text-cream transition-all group"
              >
                <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to locations
              </button>

              <div className="grid grid-cols-1 gap-12">
                {phCars.map((car, idx) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-gold/5 flex flex-col lg:flex-row group hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="lg:w-1/2 relative overflow-hidden aspect-video lg:aspect-auto h-[350px] lg:h-auto">
                      <HotelImageSlider images={car.images} name={car.name} />
                    </div>
                    <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-3xl md:text-4xl font-serif text-charcoal mb-2">{car.name}</h3>
                          <div className="flex items-center text-charcoal/40 text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-gold" />
                            {car.location}
                          </div>
                        </div>
                        <div className="text-right">
                          {car.price && (
                            <>
                              <span className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">Per Day</span>
                              <span className="text-2xl font-serif text-charcoal">₦{car.price}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <p className="text-charcoal/60 font-normal leading-relaxed mb-10 max-w-md">
                        {car.description}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <a 
                          href={`https://wa.me/2347072253857?text=${encodeURIComponent(`Hello, I would like to rent a ${car.name}.\n\nLocation: ${car.location}${car.price ? `\nPrice: ₦${car.price}` : ''}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-charcoal text-cream px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-colors shadow-lg shadow-charcoal/10 inline-block"
                        >
                          Rent Now
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ) : (
            <motion.section 
              key="enquiry"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full max-w-4xl mt-12 mb-24 relative"
            >
              <button 
                onClick={() => {
                  if (selectedCategory === 'stays' && selectedHotel) {
                    setSelectedHotel(null);
                  } else if (selectedCategory === 'homes' && selectedShortlet) {
                    setSelectedShortlet(null);
                  } else if (selectedCategory === 'drive' && selectedCar) {
                    setSelectedCar(null);
                  } else if ((selectedCategory === 'stays' || selectedCategory === 'homes' || selectedCategory === 'drive') && selectedLocation) {
                    setSelectedLocation(null);
                  } else {
                    setSelectedCategory(null);
                  }
                }}
                className="absolute -top-16 left-0 flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-[11px] uppercase tracking-[0.3em] text-charcoal font-bold shadow-sm hover:bg-gold hover:text-cream transition-all group"
              >
                <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to {selectedHotel || selectedShortlet || selectedCar ? (selectedCategory === 'stays' ? 'hotels' : selectedCategory === 'homes' ? 'shortlets' : 'cars') : selectedLocation ? 'locations' : 'selection'}
              </button>

              <div className="bg-white rounded-3xl shadow-2xl shadow-gold/5 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
                {/* Left Panel - Context */}
                <div className="md:w-1/3 bg-charcoal p-12 flex flex-col justify-between text-cream">
                  <div>
                    <div className="text-gold mb-8">
                      {categories.find(c => c.id === selectedCategory)?.icon}
                    </div>
                    <h2 className="text-4xl font-serif mb-4">
                      {categories.find(c => c.id === selectedCategory)?.title}
                    </h2>
                    <p className="text-cream/80 text-sm font-normal leading-relaxed">
                      Tell us about your vision. Our concierge team will craft a proposal tailored to your exact requirements.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Step indicators removed as requested */}
                  </div>
                </div>

                {/* Right Panel - Form */}
                <div className="flex-grow p-12 md:p-20 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`step-${step}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-12"
                    >
                      {step === 1 && (
                        <div className="space-y-8">
                          <label className="block">
                            <span className="text-[12px] uppercase tracking-[0.3em] text-gold font-bold mb-4 block">Destination</span>
                            <div className="relative">
                              <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                              <input 
                                autoFocus
                                type="text"
                                placeholder="Where are you dreaming of?"
                                className="w-full bg-transparent border-b border-charcoal/30 py-4 pl-8 focus:outline-none focus:border-gold transition-colors text-2xl font-serif placeholder:text-charcoal/30 text-charcoal"
                                value={formData.location}
                                onChange={e => setFormData({...formData, location: e.target.value})}
                              />
                            </div>
                          </label>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-8">
                        {step > 1 ? (
                          <button 
                            onClick={handleBack}
                            className="text-[11px] uppercase tracking-[0.3em] text-charcoal/60 hover:text-charcoal font-bold transition-colors flex items-center"
                          >
                            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                          </button>
                        ) : <div />}
                        
                        {/* Enquiry steps removed as requested. Waiting for new content. */}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-12 border-t border-charcoal/10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="text-[11px] uppercase tracking-[0.3em] text-charcoal/60 font-medium">
          &copy; 2026 Elite Bookings Luxury Travel. All rights reserved.
        </div>
        <div className="flex items-center space-x-12 text-[12px] uppercase tracking-[0.3em] text-charcoal/80 font-bold">
          <div className="flex items-center space-x-6">
            <span className="text-[11px] text-charcoal/60 font-bold uppercase tracking-widest">Connect:</span>
            <a href="https://wa.me/2347072253857" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors transform hover:scale-110" title="WhatsApp">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@elitebooking.ng" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors transform hover:scale-110" title="TikTok">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-3.48.01-6.96.01-10.44z"/></svg>
            </a>
            <a href="https://www.instagram.com/elitebooking.ng" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors transform hover:scale-110" title="Instagram">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
