import {
  BookOpen,
  Clock,
  Sparkles,
  Zap,
  Heart,
  LibraryBig,
  Swords,
  Orbit,
  Drama,
  HatGlasses,
  Skull,
  Gamepad2, Trees, UserStar
} from "lucide-react";
import React from "react";
import {Button} from "~/components/Button";
import {ButtonWithIcon} from "~/components/ButtonWithIcon";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 bg-gradient-to-b from-black to-transparent">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-xl tracking-wider">Studio VN21</h1>
          <Button>Browse Stories</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen w-full">
        <div className="absolute inset-0">
          <img src={'./landing_banner.jpg'} alt={'Landing Banner'} className={'w-full h-full object-cover'}/>
          <div className="absolute inset-0 bg-black/60"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"/>
        </div>

        <div className="relative h-full flex items-center justify-center px-8">
          <div className="flex items-center flex-col text-center max-w-4xl">
            <p className="text-white text-4xl mb-6">
              Welcome to Studio VN21
            </p>
            <p className="text-white text-xl mb-4">
              The best place to read short stories online.
            </p>
            <p className="text-white text-lg mb-8">
              Free to read. No sign-up required.
            </p>
            <ButtonWithIcon>
              <BookOpen className="w-6 h-6"/>
              Start Reading
            </ButtonWithIcon>
          </div>
        </div>
      </div>

      <div className="py-20 px-8 bg-black border-t-8 border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-white text-center text-xl mb-16">
            Why read on Studio VN21?
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <LibraryBig className="w-8 h-8 text-white"/>
              </div>
              <h3 className="text-white mb-3">Endless Library</h3>
              <p className="text-gray-400">
                Hundreds of curated short stories across all genres, from fantasy to thriller.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white"/>
              </div>
              <h3 className="text-white mb-3">Quick Reads</h3>
              <p className="text-gray-400">
                Perfect for your coffee break. Most stories take 5-10 minutes to read.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserStar className="w-8 h-8 text-white"/>
              </div>
              <h3 className="text-white mb-3">Personalized</h3>
              <p className="text-gray-400">
                Get recommendations based on your reading preferences and history.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Genre Showcase */}
      <div className="py-20 px-8 bg-black border-t-8 border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-white text-center text-xl mb-4">
            Every Genre You Love
          </p>
          <p className="text-gray-400 text-center mb-12 text-lg">
            From spine-tingling horror to heartwarming romance
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              {name: "Fantasy", icon: Swords, color: "from-orange-600 to-yellow-600"},
              {name: "Mystery", icon: HatGlasses, color: "from-indigo-900 to-purple-800"},
              {name: "Romance", icon: Heart, color: "from-red-600 to-pink-600"},
              {name: "Sci-Fi", icon: Orbit, color: "from-blue-600 to-green-800"},
              {name: "Horror", icon: Skull, color: "from-black-700 to-gray-900"},
              {name: "Adventure", icon: Trees, color: "from-green-600 to-teal-600"},
              {name: "Thriller", icon: Zap, color: "from-red-700 to-gray-900"},
              {name: "Drama", icon: Drama, color: "from-yellow-900 to-rose-800"},
              {name: "Fanfiction", icon: Sparkles, color: "from-lime-500 to-orange-600"},
              {name: "Interactive stories", icon: Gamepad2, color: "from-indigo-700 to-amber-600"},
            ].map((genre) => (
              <div
                key={genre.name}
                className={`bg-gradient-to-br ${genre.color} p-8 rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform`}
              >
                <genre.icon className="w-8 h-8 text-white mb-2"/>
                <span className="text-white">{genre.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reading Experience Section */}
      <div className="py-20 px-8 bg-black border-t-8 border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-white text-xl mb-6">
                Read on any device
              </p>
              <p className="text-gray-300 text-lg mb-6">
                Seamless reading experience across all your devices. Start a story on your phone during your commute and
                finish it on your tablet at home.
              </p>
              <p className="text-gray-300 text-lg">
                Clean, distraction-free interface designed for immersive reading.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img src={'./tablet.jpg'} alt={'Landing Banner'} className={'w-full h-full object-cover'}/>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-8 bg-black border-t-8 border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white text-xl mb-6">
            Ready to start reading?
          </p>
          <p className="text-gray-300 text-lg mb-8">
            Join hundreds of readers discovering amazing stories every day.
          </p>
          <Button>
            Start Reading Now
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-8 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white mb-4">About</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-gray-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Terms of Use</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Cookie Preferences</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Studio VN21. All rights reserved.  by <a className="underline" href="https://www.recurssive.com">Recurssive</a>.
          </div>
        </div>
      </footer>
    </div>
  );
}