import React, { useState, useEffect } from 'react';
import { Heart, Music, XCircle, ChevronRight, ChevronLeft, Calendar, Clock, MapPin, Play } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Timeline = ({ date, title, description }) => (
  <div className="relative flex items-center group">
    <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-all duration-300">
      <Calendar className="w-6 h-6 text-pink-600" />
    </div>
    <div className="ml-4">
      <p className="text-sm text-gray-500">{date}</p>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(c => c + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <div className="font-handwriting text-lg text-gray-700">
      {displayText}
      {currentIndex < text.length && <span className="animate-blink">|</span>}
    </div>
  );
};

const LocationMarker = ({ name, description, top, left }) => (
  <div className={`absolute group cursor-pointer`} style={{ top, left }}>
    <div className="relative">
      <MapPin className="w-6 h-6 text-pink-600" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Card className="w-48 p-2">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </Card>
      </div>
    </div>
  </div>
);

const ElegantAnniversaryPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState({ days: 0, hours: 0, minutes: 0 });
  const [nextDate, setNextDate] = useState({ days: 0, hours: 0, minutes: 0 });
  const [currentSong, setCurrentSong] = useState(0);

  const memories = [
    { image: "/api/placeholder/600/400", title: "Nuestro Primer Encuentro", date: "27 Dic 2023" },
    { image: "/api/placeholder/600/400", title: "Primera Cita", date: "30 Dic 2023" },
    { image: "/api/placeholder/600/400", title: "Primer Viaje Juntos", date: "15 Ene 2024" },
    { image: "/api/placeholder/600/400", title: "Momentos Especiales", date: "27 Dic 2024" }
  ];

  const playlist = [
    { title: "Perfect", artist: "Ed Sheeran", duration: "4:23" },
    { title: "All of Me", artist: "John Legend", duration: "4:29" },
    { title: "Just the Way You Are", artist: "Bruno Mars", duration: "3:40" },
    { title: "A Thousand Years", artist: "Christina Perri", duration: "4:45" }
  ];

  const locations = [
    { name: "Primer Encuentro", description: "Donde todo comenzó", top: "20%", left: "30%" },
    { name: "Primera Cita", description: "Nuestra cena especial", top: "40%", left: "60%" },
    { name: "Primer Viaje", description: "Aventura inolvidable", top: "60%", left: "40%" }
  ];

  const loveLetter = `Mi amor,

Un año ha pasado desde que el destino nos unió, y cada día a tu lado ha sido un regalo. Tus sonrisas iluminan mis mañanas, tus abrazos calientan mi corazón, y tu amor llena mi vida de una felicidad que nunca imaginé posible...`;

  useEffect(() => {
    setTimeElapsed({ days: 365, hours: 8760, minutes: 525600 });
    setNextDate({ days: 30, hours: 720, minutes: 43200 });
  }, []);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % memories.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + memories.length) % memories.length);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section (mantiene el código anterior) */}
      <div className="h-screen relative flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        {/* ... (mantiene el código del hero section) ... */}
      </div>

      {/* Nueva Sección: Carta de Amor */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Mi Carta Para Ti
          </h2>
          <Card className="p-8 bg-rose-50">
            <CardContent>
              <TypewriterEffect text={loveLetter} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Nueva Sección: Mapa Interactivo */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Nuestros Lugares Especiales
          </h2>
          <div className="relative w-full h-96 bg-white rounded-xl shadow-lg">
            <img
              src="/api/placeholder/800/400"
              alt="Mapa"
              className="w-full h-full object-cover rounded-xl"
            />
            {locations.map((location, index) => (
              <LocationMarker key={index} {...location} />
            ))}
          </div>
        </div>
      </section>

      {/* Nueva Sección: Playlist */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Nuestra Playlist
          </h2>
          <Card>
            <CardContent className="p-6">
              {playlist.map((song, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 ${
                    currentSong === index ? 'bg-pink-50' : ''
                  } hover:bg-gray-50 rounded-lg transition-colors duration-300 cursor-pointer`}
                  onClick={() => setCurrentSong(index)}
                >
                  <div className="flex items-center gap-4">
                    <Play className={`w-5 h-5 ${currentSong === index ? 'text-pink-600' : 'text-gray-400'}`} />
                    <div>
                      <h3 className="font-semibold">{song.title}</h3>
                      <p className="text-sm text-gray-600">{song.artist}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{song.duration}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Nueva Sección: Contador para Próxima Celebración */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">
            Próxima Celebración
          </h2>
          <div className="flex justify-center gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-4xl font-bold text-pink-600">{nextDate.days}</p>
              <p className="text-gray-600">Días</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-4xl font-bold text-pink-600">{nextDate.hours}</p>
              <p className="text-gray-600">Horas</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-4xl font-bold text-pink-600">{nextDate.minutes}</p>
              <p className="text-gray-600">Minutos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mantiene las secciones anteriores y el botón de música */}
      
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-8 right-8 rounded-full w-12 h-12 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? (
          <XCircle className="h-6 w-6 text-pink-600" />
        ) : (
          <Music className="h-6 w-6 text-pink-600" />
        )}
      </Button>
    </div>
  );
};

export default ElegantAnniversaryPage;